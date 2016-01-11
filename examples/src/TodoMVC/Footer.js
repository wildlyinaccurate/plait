import h from 'virtual-dom/h'

import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from './filters'


export function init () {
  return {
    todos: [],
    filter: FILTER_ALL
  }
}


export function update (state, action) {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return state.set('filter', action.filter)
  }
}


export function view (state, dispatch) {
  const todos = state.get('todos')
  const remaining = todos.filter(todo => !todo.get('completed'))
  const items = remaining.length === 1 ? 'item' : 'items'

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{remaining.length}</strong> {items} left
      </span>

      <ul className="filters">
        <li>
          {filterLink(state, dispatch, FILTER_ALL)}
        </li>
        <li>
          {filterLink(state, dispatch, FILTER_ACTIVE)}
        </li>
        <li>
          {filterLink(state, dispatch, FILTER_COMPLETED)}
        </li>
      </ul>

      {clearCompleted(state, dispatch, todos)}
    </footer>
  )
}

function filterLink (state, dispatch, filter) {
  const href = `#/${filter.toLowerCase()}`
  const className = state.get('filter') === filter ? 'selected' : ''

  return (
    <a className={className} href={href} ev-click={dispatch({ type: 'CHANGE_FILTER', filter })}>
      {filter}
    </a>
  )
}

function clearCompleted (state, dispatch, todos) {
  if (todos.length) {
    return (
      <button className="clear-completed" ev-click={dispatch({ type: 'CLEAR_COMPLETED' })}>
        Clear completed
      </button>
    )
  }
}
