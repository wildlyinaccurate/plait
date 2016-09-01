import VNode from 'virtual-dom/vnode/vnode'
import VText from 'virtual-dom/vnode/vtext'

export default function domToVdom (node) {
  return new VNode(node.name, attributes(node), children(node))
}

function attributes (node) {
  return {
    node
  }
}

function children (node) {
  let children = []

  if (node.hasChildNodes()) {

  }

  return children
}
