import curry from 'ramda/src/curry'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import Delegator from 'dom-delegator'

import Map from './Map'


const delegator = Delegator()
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)


// Component = {
//   init : _ -> Object
//   update : Map -> Action -> Map
//   view : Map -> (Action -> Action) -> VirtualNode
// }


// start :: Component -> Element
export function start (component) {
  const { init, update, view } = component
  const [initialState, initialAction] = handleInit(init)

  // Initial call to update() will be @@redux/INIT so bogus dispatch() is okay
  let dispatch = x => x

  const store = createStoreWithMiddleware((state = initialState, action) => {
    const newState = update(state, action, dispatch)

    return (typeof newState === 'undefined') ? state : newState
  })

  dispatch = action => {
    return event => {
      if (event) {
        action.event = event
      }

      store.dispatch(action)
    }
  }

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


// patchTree :: Element -> VirtualNode -> VirtualNode -> VirtualNode
function patchTree (rootNode, oldTree, newTree) {
  patch(rootNode, diff(oldTree, newTree))

  return newTree
}


// initializeComponent :: Component -> Map
export function initializeComponent ({ init }, dispatch) {
  const [initialState, initialAction] = handleInit(init)

  if (dispatch && initialAction) {
    dispatch(initialState)(initialAction)()
  }

  return initialState
}


// handleInit :: (_ -> Object) -> [Map, Maybe Action]
function handleInit (init) {
  const _res = init()
  const res = Array.isArray(_res) ? _res : [_res]

  return [new Map(res[0]), res[1]]
}

export const forwardDispatch = curry((action, modifier, dispatch, state) => {
  const getState = () => state

  return forwardAction => {
    const modify = modifier.bind(this, action, forwardAction)

    if (typeof forwardAction === 'function') {
      return dispatch(() => {
        forwardAction(forwardDispatch(action, modifier, dispatch, state), getState)
          .then(dispatch => dispatch(modify()))
      })
    } else {
      return dispatch(modify())
    }
  }
})
