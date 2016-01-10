import h from 'virtual-dom/h'


export function init () {
  return {
    todos: []
  }
}


export function update (state, action) {
  switch (action.type) {

  }
}


export function view (state, dispatch) {
  const todos = remaining(state.get('todos')).length
  const items = todos === 1 ? 'item' : 'items'

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todos}</strong> {items} left
      </span>

      <ul className="filters">
        <li>
          <a className="selected" href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>

      {clearCompleted(todos, state, dispatch)}
    </footer>
  )
}

function clearCompleted (todos, state, dispatch) {
  if (todos) {
    return (
      <button className="clear-completed" ev-click={dispatch({ type: 'CLEAR_COMPLETED' })}>
        Clear completed
      </button>
    )
  }
}


function remaining(todos) {
  return todos.filter(x => !x.get('completed'))
}
