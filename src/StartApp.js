import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

exports.start = function ({ init, update, view }) {
  let state = init()
  let tree = view(state)

  const rootNode = createElement(tree)

  document.body.appendChild(rootNode)

  setInterval(() => {
    state = update(state)

    const newTree = view(state)
    const patches = diff(tree, newTree)

    patch(rootNode, patches)

    tree = newTree
  }, 1000)
}
