import h from 'virtual-dom/h'
import { start, forwardDispatch, initializeComponent } from 'App'

const [fwd, initComponent] = [forwardDispatch, initializeComponent]

import * as Header from './Header'
import * as TodoItem from './TodoItem'
import * as Footer from './Footer'


const ENTER_KEY = 13


export function init () {
  const initState = {
    todos: []
  }

  return merge(initState, Header.init())
}


export function update (state, action) {
  switch (action.type) {
    case 'HEADER_ACTION':
      return updateHeader(state, action)

    case 'TODO_ITEM_ACTION':
      return updateTodoItems(state, action)

    case 'CLEAR_COMPLETED':
      return state.update('todos', function(todos) {
        return todos.filter(todo => !todo.get('completed'))
      })

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
    return Header.update(state, merge(action.$fwdAction, { $event: action.$event }))
  }
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
          <p>Created by <a href="https://wildlyinaccurate.com/">Joseph Wynn</a></p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  )
}

function headerView (state, dispatch) {
  const modifiedDispatch = fwd(
    { type: 'HEADER_ACTION' },
    dispatch,
    state
  )

  return Header.view(state, modifiedDispatch)
}

function footerView (state, dispatch) {
  if (state.get('todos').length) {
    return Footer.view(state, dispatch)
  }
}

function todosView (state, dispatch) {
  if (state.get('todos').length) {
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" ev-change={dispatch({ type: 'TOGGLE_ALL' })} />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {todoItemsView(state, dispatch)}
        </ul>
      </section>
    )
  }
}

function todoItemsView (state, dispatch) {
  return state.get('todos').map((todoState, todoIdx) => {
    const modifiedDispatch = fwd(
      { type: 'TODO_ITEM_ACTION', todoIdx },
      dispatch,
      state
    )

    return TodoItem.view(todoState, modifiedDispatch)
  })
}


function merge (obj1, obj2) {
  return Object.assign({}, obj1, obj2)
}
