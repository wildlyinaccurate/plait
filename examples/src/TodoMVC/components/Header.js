import h from 'virtual-dom/h'


export function init () {
  return {
    inputValue: ''
  }
}


export function update (state, action) {
  switch (action.type) {
    case 'VALUE_CHANGED':
      return Object.assign({}, state, {
        inputValue: action.$event.target.value
      })
  }
}


export function view (state, dispatch) {
  const dispatchChangeAction = dispatch({ type: 'VALUE_CHANGED' })

  return (
    <header className="header">
      <h1>{'todos'}</h1>

      <input
        autofocus
        className="new-todo"
        ev-change={dispatchChangeAction}
        ev-keyup={dispatchChangeAction}
        placeholder="What needs to be done?"
        value={state.inputValue}
      />
    </header>
  )
}
