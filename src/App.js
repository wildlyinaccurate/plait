import curry from 'ramda/src/curry'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

import State from './State'
import * as delegator from './dom/delegator'


delegator.listen()

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)


export function start (component) {
  const { init, update, view } = component
  const [initialState, initialAction] = handleInit(init)

  // Initial call to update() will be @@redux/INIT so bogus dispatch() is okay
  let dispatch = x => x

  const store = createStoreWithMiddleware((state = initialState, action) => {
    const newState = update(state, action, dispatch)

    return (typeof newState === 'undefined') ? state : newState
  })

  dispatch = makeDispatcher(store)

  if (initialAction) {
    store.dispatch(initialAction)
  }

  let tree = view(initialState, dispatch)
  const rootNode = createElement(tree)

  store.subscribe(() => {
    tree = patchTree(
      rootNode,
      tree,
      view(store.getState(), dispatch)
    )
  })

  return rootNode
}


// Create a dispatcher function for the given store. Dispatchers act as a curried
// interface to store.dispatch, allowing views to express the _intent to dispatch_
// without immediately triggering a dispatch.
function makeDispatcher (store) {
  return action => event => {
    if (event) {
      action.$event = event

      if (action.$fwdAction) {
        action.$fwdAction.$event = event
      }
    }

    store.dispatch(action)
  }
}


function patchTree (rootNode, oldTree, newTree) {
  patch(rootNode, diff(oldTree, newTree))

  return newTree
}


export function initializeComponent ({ init }, dispatch) {
  const [initialState, initialAction] = handleInit(init)

  if (dispatch && initialAction) {
    dispatch(initialState)(initialAction)()
  }

  return initialState
}


function handleInit (init) {
  const _res = init()
  const res = Array.isArray(_res) ? _res : [_res]

  return [new State(res[0]), res[1]]
}


// Wrap a dispatcher, forwarding any actions onto the specified action by attaching
// them to the $fwdAction property.
//
// Usually used by parent components to capture actions from child components.
export const forwardDispatch = curry((action, dispatch, state) => {
  return forwardAction => {
    if (typeof forwardAction === 'function') {
      // In order to forward thunks, an intermediate thunk needs to be returned
      // to gain access to the raw `action => <dispatch>` dispatcher rather than
      // the application's wrapped `action => event => <dispatch>` dispatcher.
      return dispatch(rawDispatch => {
        const getState = () => state
        const fwd = forwardDispatch(action, rawDispatch, state)

        forwardAction(fwd, getState)
      })
    }

    // Annotate and dispatch a simple action object
    return dispatch(Object.assign({}, action, { $fwdAction: forwardAction }))
  }
})
