import h from 'virtual-dom/h'
import Map from 'Map'

import * as Counter from '../Counter/Counter'


export function init () {
  return {
    counters: []
  }
}


export function update (state, action) {
  switch (action.type) {
    case 'ADD_COUNTER':
      const newCounter = new Map(Counter.init())

      return state.update('counters', xs => xs.concat(newCounter))

    case 'MODIFY':
      return state.update('counters', (counters) => {
        return counters.map((cstate, idx) => {
          if (idx === action.counterIdx) {
            return Counter.update(cstate, action.counterAction)
          } else {
            return cstate
          }
        })
      })
  }

  return state
}


export function view (state, dispatch) {
  return h(
    'div',
    [
      addCounterButton(state, dispatch),
      counterView(state, dispatch)
    ]
  )
}

function counterView (state, dispatch) {
  const forwardDispatch = (action) => {
    return (counterAction) => {
      return dispatch({ type: action.type, counterIdx: action.counterIdx, counterAction })
    }
  }

  return state.get('counters').map((cstate, counterIdx) => {
    return Counter.view(cstate, forwardDispatch({ type: 'MODIFY', counterIdx }))
  })
}

function addCounterButton (state, dispatch) {
  return h(
    'button',
    { 'ev-click': dispatch({ type: 'ADD_COUNTER' }) },
    'Add Counter'
  )
}
