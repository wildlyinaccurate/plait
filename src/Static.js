import raf from 'raf'

import { start } from './App'

const componentWithState = (component, state) => {
  return Object.assign({}, component, {
    init: () => state
  })
}

const componentToString = component => {
  const node = start(component, raf)

  if (node.outerHTML) {
    return node.outerHTML
  } else {
    return node.toString()
  }
}

export function render (component, update) {
  if (typeof update === 'function') {
    return new Promise(resolve => {
      const initialState = component.init()

      update(initialState, newState => {
        const newComponent = componentWithState(component, newState)

        resolve(componentToString(newComponent))
      })
    })
  } else {
    return componentToString(component)
  }
}
