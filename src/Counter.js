import h from 'virtual-dom/h'

export function init () {
  return {
    count: 0
  }
}

export function view (state) {
  return h('div', [`${state.count} seconds`]);
}

export function update (state) {
  return {
    count: state.count + 1
  }
}
