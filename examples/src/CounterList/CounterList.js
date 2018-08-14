import { h, initializeComponent, forwardDispatch } from 'plait'

import * as Counter from '../Counter/Counter'


export function init () {
  return {
    counters: []
  }
}


const updateCounter = action => (counterState, idx) => {
  if (idx === action.counterIdx) {
    return Counter.update(counterState, action.$fwdAction)
  }

  return counterState
}

export function update (state, action) {
  switch (action.type) {
    case 'ADD_COUNTER':
      return state.update('counters', cs => cs.concat(initializeComponent(Counter)))

    case 'MODIFY':
      return state.update('counters', cs => cs.map(updateCounter(action)))
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
  return state.get('counters').map((cstate, counterIdx) => {
    const modifiedDispatch = forwardDispatch(
      { type: 'MODIFY', counterIdx },
      dispatch,
      cstate
    )

    return Counter.view(cstate, modifiedDispatch)
  })
}
