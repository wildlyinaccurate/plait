import assocPath from 'ramda/src/assocPath'
import path from 'ramda/src/path'

import clone from './utils/clone'

class State {
  constructor (obj) {
    if (typeof obj !== 'object') {
      throw new TypeError(obj, 'is not an object')
    }

    this.obj = clone(obj)
    this['@@Plait/State'] = 1
  }

  clone () {
    return new State(this.toObject())
  }

  toObject () {
    return clone(this.obj)
  }

  set (prop, val) {
    const obj = this.toObject()

    obj[prop] = val

    return new State(obj)
  }

  get (prop) {
    const obj = this.toObject()

    return obj[prop]
  }

  update (prop, updater) {
    return this.set(prop, updater(this.get(prop)))
  }

  setIn(propPath, val) {
    const obj = assocPath(propPath, val, this.obj)

    return new State(obj)
  }

  getIn(propPath) {
    return path(propPath, this.obj)
  }
}

export default State
