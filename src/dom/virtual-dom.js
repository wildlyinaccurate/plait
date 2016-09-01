import create from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'

import domToVdom from './dom-to-vdom'

export const createRoot = tree => create(tree)

export function patchDomNode (oldNode, newNode) {
  const oldVNode = domToVdom(oldNode)
  const newVNode = domToVdom(newNode)
  const patches = diff(oldVNode, newVNode)

  return patch(oldVNode, patches)
}

export function createRenderCycle (rootNode, tree, render, raf) {
  let renderScheduled = false
  let latestState = null

  return newState => {
    if (latestState === null && renderScheduled === false) {
      renderScheduled = true

      raf(() => {
        renderScheduled = false

        if (latestState === null) return

        const newTree = render(latestState)
        const patches = diff(tree, newTree)

        patch(rootNode, patches)

        tree = newTree
        latestState = null
      })
    }

    latestState = newState
  }
}
