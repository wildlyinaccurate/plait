import h from 'virtual-dom/h'
import * as App from 'App'

import * as Header from './Header'
import * as TodoItem from './TodoItem'
import * as Footer from './Footer'

import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from '../utils/filters'
import merge from '../utils/merge'


const ENTER_KEY = 13

const [fwd, initComponent] = [App.forwardDispatch, App.initializeComponent]

export function init () {
  return merge({ todos: [] }, Header.init(), Footer.init())
}


export function update (state, action) {
  switch (action.type) {
    case 'HEADER_ACTION':
      return updateHeader(state, action)

    case 'FOOTER_ACTION':
      return updateFooter(state, action)

    case 'TODO_ITEM_ACTION':
      return updateTodoItems(state, action)

    case 'TOGGLE_ALL':
      const todoAction = {
        type: 'SET_COMPLETED',
        completed: action.$event.target.checked
      }

      return state.update('todos', function (todos) {
        return todos.map(todo => TodoItem.update(todo, todoAction))
      })
  }
}

function updateHeader (state, action) {
  const value = action.$event.target.value.trim()

  if (action.$event.keyCode === ENTER_KEY && value.length) {
    const newTodo = initComponent({ init: TodoItem.init(value) })

    return state.update('todos', todos => todos.concat(newTodo)).set('inputValue', '')
  } else {
    return Header.update(state, action.$fwdAction)
  }
}

function updateFooter (state, action) {
  if (action.$fwdAction.type === 'CLEAR_COMPLETED') {
    return state.update('todos', function(todos) {
      return todos.filter(todo => !todo.get('completed'))
    })
  }

  return Footer.update(state, action.$fwdAction)
}

const updateTodoItem = action => (state, idx) => {
  if (idx === action.todoIdx) {
    return TodoItem.update(state, action.$fwdAction)
  } else {
    return state
  }
}

function updateTodoItems (state, action) {
  if (action.$fwdAction.type === 'DELETE') {
    const idx = action.todoIdx

    return state.update('todos', todos => todos.slice(0, idx).concat(todos.slice(idx + 1)))
  } else {
    return state.update('todos', todos => todos.map(updateTodoItem(action)))
  }
}


export function view (state, dispatch) {
  return (
    <div>
      <section className="todoapp">
        {headerView(state, dispatch)}
        {todosView(state, dispatch)}
        {footerView(state, dispatch)}
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>

        <p>
          Created by <a href="https://wildlyinaccurate.com/">Joseph Wynn</a>
        </p>

        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  )
}

function headerView (state, dispatch) {
  return Header.view(state, fwd({ type: 'HEADER_ACTION' }, dispatch, state))
}

function footerView (state, dispatch) {
  if (state.get('todos').length) {
    return Footer.view(state, fwd({ type: 'FOOTER_ACTION' }, dispatch, state))
  }
}

function todosView (state, dispatch) {
  if (state.get('todos').length) {
    return (
      <section className="main">
        <input className="toggle-all" ev-change={dispatch({ type: 'TOGGLE_ALL' })} type="checkbox" />

        <label htmlFor="toggle-all">
          Mark all as complete
        </label>

        <ul className="todo-list">
          {todoItemsView(state, dispatch)}
        </ul>
      </section>
    )
  }
}

function todoItemsView (state, dispatch) {
  const filteredTodos = filterTodos(state.get('todos'), state.get('filter'))

  return filteredTodos.map((todoState, todoIdx) => {
    const modifiedDispatch = fwd(
      { type: 'TODO_ITEM_ACTION', todoIdx },
      dispatch,
      state
    )

    return TodoItem.view(todoState, modifiedDispatch)
  })
}

function filterTodos (todos, filter) {
  return todos.filter(todo => satisfiesFilter(filter, todo))
}

function satisfiesFilter (filter, todo) {
  switch (filter) {
    case FILTER_ALL:
      return true

    case FILTER_COMPLETED:
      return todo.get('completed')

    case FILTER_ACTIVE:
      return !todo.get('completed')
  }
}
