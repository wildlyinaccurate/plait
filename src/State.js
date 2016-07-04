import assocPath from 'ramda/src/assocPath'
import is from 'ramda/src/is'
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
    return new State(this.obj)
  }

  toObject () {
    return clone(this.obj)
  }

  set (prop, val) {
    const newObj = {}

    newObj[prop] = val

    return new State(Object.assign({}, this.obj, newObj))
  }

  get (prop) {
    const val = this.obj[prop]

    if (is(Object, val) && !val.hasOwnProperty('@@Plait/State')) {
      return clone(val)
    }

    return val
  }

  update (prop, updater) {
    return this.set(prop, updater(this.get(prop)))
  }

  setIn (propPath, val) {
    const obj = assocPath(propPath, val, this.obj)

    return new State(obj)
  }

  getIn (propPath) {
    return path(propPath, this.obj)
  }
}

export default State
