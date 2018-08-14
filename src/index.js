import _h from 'virtual-dom/h'
import { start, render, initializeComponent, forwardDispatch } from './App'
import State from './State'

function h (tag, attrs, ...children) {
  return _h(tag, attrs, children)
}

export default {
  h,
  forwardDispatch,
  initializeComponent,
  render,
  start,
  State
}

export {
  h,
  forwardDispatch,
  initializeComponent,
  render,
  start,
  State
}
