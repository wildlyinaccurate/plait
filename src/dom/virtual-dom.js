import create from 'virtual-dom/create-element'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'

export default function VirtualDom (state, render, raf) {
  let renderScheduled = false
  let latestState = null
  let tree = render(state)
  const rootNode = create(tree)

  const update = newState => {
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

  return { rootNode, update }
}
