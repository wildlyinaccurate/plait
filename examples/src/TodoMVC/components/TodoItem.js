import { h } from 'plait'

import { wasEnterKey, wasKeyEvent } from '../utils/input'


export function init (title) {
  return function () {
    return {
      title,
      completed: false,
      editing: false
    }
  }
}


export function update (state, action) {
  switch (action.type) {
    case 'SET_COMPLETED':
      return state.set('completed', action.completed)

    case 'START_EDIT':
      setTimeout(
        () => action.$event.currentTarget.querySelector('.edit').focus(),
        20
      )

      return state.set('editing', true)

    case 'STOP_EDIT':
      if (!wasKeyEvent(action.$event) || wasEnterKey(action.$event)) {
        return state.set('editing', false)
      }

      return state.set('title', action.$event.target.value)
  }
}


export function view (state, dispatch) {
  const itemClasses = [
    state.get('completed') ? 'completed' : '',
    state.get('editing') ? 'editing' : ''
  ].join(' ')

  return (
    <li className={itemClasses} ev-dblclick={dispatch({ type: 'START_EDIT' })}>
      <div className="view">
        {checkboxView(state, dispatch)}
        <label>{state.get('title')}</label>
        <button className="destroy" ev-click={dispatch({ type: 'DELETE' })}></button>
      </div>

      <input
        className="edit"
        ev-blur={dispatch({ type: 'STOP_EDIT' })}
        ev-keyup={dispatch({ type: 'STOP_EDIT' })}
        value={state.get('title')}
      />
    </li>
  )
}

function checkboxView (state, dispatch) {
  if (state.get('completed')) {
    return <input checked className="toggle" ev-change={dispatch(setCompleted(false))} type="checkbox" />
  }

  return <input className="toggle" ev-change={dispatch(setCompleted(true))} type="checkbox" />
}

function setCompleted (completed) {
  return { type: 'SET_COMPLETED', completed }
}
