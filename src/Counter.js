import h from 'virtual-dom/h'

export function init () {
  return {
    value: 0
  }
}

export function update (state, action) {
  switch (action.type) {
    case 'DECREMENT':
      return { value: state.value - 1 }

    case 'INCREMENT':
      return { value: state.value + 1 }
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

      `${state.value}`,

      h(
        'button',
        { 'ev-click': dispatch({ type: 'INCREMENT' }) },
        ['+']
      )
    ]
  );
}
