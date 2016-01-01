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
      return state.update('counters', cs => cs.concat(newCounter()))

    case 'MODIFY':
      return state.update('counters', cs => cs.map(updateCounter(action)))
  }
}

function newCounter () {
  return new Map(Counter.init())
}

function updateCounter (action) {
  return (counterState, idx) => {
    if (idx === action.counterIdx) {
      return Counter.update(counterState, action.counterAction)
    } else {
      return counterState
    }
  }
}


export function view (state, dispatch) {
  return (
    <div>
      <button ev-click={dispatch({ type: 'ADD_COUNTER' })}>
        Add Counter
      </button>

      {counterView(state, dispatch)}
    </div>
  )
}

function counterView (state, dispatch) {
  const forwardDispatch = action => {
    return counterAction => {
      return dispatch({ type: action.type, counterIdx: action.counterIdx, counterAction })
    }
  }

  return state.get('counters').map((cstate, counterIdx) => {
    return Counter.view(cstate, forwardDispatch({ type: 'MODIFY', counterIdx }))
  })
}
