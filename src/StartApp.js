import { createStore } from 'redux'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import Delegator from 'dom-delegator'

import Map from './Map'

exports.start = function ({ init, update, view }) {
  const delegator = Delegator()

  const initialState = new Map(init())
  const store = createStore((state = initialState, action) => {
    return update(state, action)
  })

  const dispatch = (action) => {
    return () => {
      store.dispatch(action)
    }
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
