import h from 'virtual-dom/h'

export function init () {
  return {
    count: 0
  }
}

export function view (state) {
  return h('div', {
    style: {
      textAlign: 'center',
      lineHeight: (100 + state.count) + 'px',
      border: '1px solid red',
      width: (100 + state.count) + 'px',
      height: (100 + state.count) + 'px'
    }
  }, [String(state.count)]);
}

export function update (state) {
  return {
    count: state.count + 1
  }
}
