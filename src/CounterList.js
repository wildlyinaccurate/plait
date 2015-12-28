import h from 'virtual-dom/h'
import Map from './Map'
import * as Counter from './Counter'

export function init () {
  return {
    counters: [
      new Map(Counter.init()),
      new Map(Counter.init()),
      new Map(Counter.init())
    ]
  }
}

export function update (state, action) {
  state.get('counters').forEach(cstate => Counter.update(cstate, action))

  return state
}

export function view (state, dispatch) {
  return h(
    'div',
    state.get('counters').map(cstate => Counter.view(cstate, dispatch))
  )
}
