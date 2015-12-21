import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

exports.start = function (config) {
  let state = config.init()
  let tree = config.view(state)

  const rootNode = createElement(tree)

  document.body.appendChild(rootNode)

  setInterval(() => {
    state = config.update(state)

    const newTree = config.view(state)
    const patches = diff(tree, newTree)

    patch(rootNode, patches)

    tree = newTree
  }, 1000)
}
