import h from 'virtual-dom/h'

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
      return Object.assign({}, state, {
        completed: action.completed
      })

    case 'START_EDIT':
      setTimeout(
        () => action.$event.currentTarget.querySelector('.edit').focus(),
        20
      )

      return Object.assign({}, state, {
        editing: true
      })

    case 'STOP_EDIT':
      if (!wasKeyEvent(action.$event) || wasEnterKey(action.$event)) {
        return Object.assign({}, state, {
          editing: false
        })
      } else {
        return Object.assign({}, state, {
          title: action.$event.target.value
        })
      }
  }
}


export function view (state, dispatch) {
  const itemClasses = [
    state.completed ? 'completed' : '',
    state.editing ? 'editing' : ''
  ].join(' ')

  return (
    <li className={itemClasses} ev-dblclick={dispatch({ type: 'START_EDIT' })}>
      <div className="view">
        {checkboxView(state, dispatch)}
        <label>{state.title}</label>
        <button className="destroy" ev-click={dispatch({ type: 'DELETE' })}></button>
      </div>

      <input
        className="edit"
        ev-blur={dispatch({ type: 'STOP_EDIT' })}
        ev-keyup={dispatch({ type: 'STOP_EDIT' })}
        value={state.title}
      />
    </li>
  )
}

function checkboxView (state, dispatch) {
  if (state.completed) {
    return <input checked className="toggle" ev-change={dispatch(setCompleted(false))} type="checkbox" />
  } else {
    return <input className="toggle" ev-change={dispatch(setCompleted(true))} type="checkbox" />
  }
}

function setCompleted (completed) {
  return { type: 'SET_COMPLETED', completed }
}
