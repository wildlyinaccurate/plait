import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import Delegator from 'dom-delegator'

import Map from './Map'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export function start ({ init, update, view }) {
  const delegator = Delegator()

  const [initialState, initialAction] = handleInit(init)

  const store = createStoreWithMiddleware((state = initialState, action) => {
    const newState = update(state, action)

    return (typeof newState === 'undefined') ? state : newState
  })

  const dispatch = (action) => {
    return () => {
      store.dispatch(action)
    }
  }

  if (initialAction) {
    store.dispatch(initialAction)
  }

  let tree = view(initialState, dispatch)
  const rootNode = createElement(tree)

  store.subscribe(() => {
    const newTree = view(store.getState(), dispatch)
    const patches = diff(tree, newTree)

    patch(rootNode, patches)

    tree = newTree
  })

  return rootNode
}

export function initializeComponent ({ init }) {
  return handleInit(init)[0]
}

function handleInit (init) {
  const res = init()

  if (Array.isArray(res)) {
    // [data, action]
    return [new Map(res[0]), res[1]]
  } else {
    // data
    return [new Map(res)]
  }
}
