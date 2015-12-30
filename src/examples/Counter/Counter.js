import h from 'virtual-dom/h'

export function init () {
  return {
    count: 0
  }
}

export function update (state, action) {
  switch (action.type) {
    case 'DECREMENT':
      return state.update('count', x => x - 1)

    case 'INCREMENT':
      return state.update('count', x => x + 1)
  }
}

export function view (state, dispatch) {
  return h(
    'div',
    { className: 'counter' },
    [
      h(
        'button',
        {
          className: 'decrement',
          'ev-click': dispatch({ type: 'DECREMENT' })
        },
        ['-']
      ),

      h(
        'span',
        { className: 'counter__value' },
        state.get('count')
      ),

      h(
        'button',
        {
          className: 'increment',
          'ev-click': dispatch({ type: 'INCREMENT' })
        },
        ['+']
      )
    ]
  )
}
