import { start } from './App'
import State from './State'

const componentWithState = (component, state) => {
  return Object.assign({}, component, {
    init: () => state.toObject()
  })
}

const componentToString = component => {
  const node = start(component)

  if (node.outerHTML) {
    return node.outerHTML
  } else {
    return node.toString()
  }
}

export function render (component, update) {
  if (typeof update === 'function') {
    return new Promise(resolve => {
      const initialState = new State(component.init())

      update(initialState, newState => {
        const newComponent = componentWithState(component, newState)

        resolve(componentToString(newComponent))
      })
    })
  } else {
    return componentToString(component)
  }
}
