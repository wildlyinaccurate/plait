import h from 'virtual-dom/h'

export function init () {
  return {
    value: 0
  }
}

export function update (state, action) {
  switch (action.type) {
    case 'DECREMENT':
      return state.set('value', state.get('value') - 1)

    case 'INCREMENT':
      return state.set('value', state.get('value') + 1)
  }
}

export function view (state, dispatch) {
  return h(
    'div',
    [
      h(
        'button',
        { 'ev-click': dispatch({ type: 'DECREMENT' }) },
        ['-']
      ),

      h(
        'span',
        { id: 'counter' },
        state.get('value')
      ),

      h(
        'button',
        { 'ev-click': dispatch({ type: 'INCREMENT' }) },
        ['+']
      )
    ]
  );
}
