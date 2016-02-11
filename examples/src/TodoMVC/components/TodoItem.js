import h from 'virtual-dom/h'


export function init (title) {
  return function () {
    return {
      title,
      completed: false
    }
  }
}


export function update (state, action) {
  switch (action.type) {
    case 'SET_COMPLETED':
      return state.set('completed', action.completed)
  }
}


export function view (state, dispatch) {
  const itemClass = state.get('completed') ? 'completed' : ''

  return (
    <li className={itemClass}>
      <div className="view">
        {checkboxView(state, dispatch)}
        <label>{state.get('title')}</label>
        <button className="destroy" ev-click={dispatch({ type: 'DELETE' })}></button>
      </div>

      <input className="edit" value="Create a TodoMVC template" />
    </li>
  )
}

function checkboxView (state, dispatch) {
  if (state.get('completed')) {
    return <input checked className="toggle" ev-change={dispatch(setCompleted(false))} type="checkbox" />
  } else {
    return <input className="toggle" ev-change={dispatch(setCompleted(true))} type="checkbox" />
  }
}

function setCompleted(completed) {
  return { type: 'SET_COMPLETED', completed }
}
