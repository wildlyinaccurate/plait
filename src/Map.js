import assocPath from 'ramda/src/assocPath'
import clone from './utils/clone'
import path from 'ramda/src/path'

class Map {
  constructor (obj) {
    if (typeof obj !== 'object') {
      throw new TypeError(obj, 'is not an object')
    }

    this.obj = obj
    this['@@Plait/Map'] = 1
  }

  clone () {
    return new Map(this.toObject())
  }

  toObject () {
    return clone(this.obj)
  }

  set (prop, val) {
    const obj = this.toObject()

    obj[prop] = val

    return new Map(obj)
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

    return new Map(obj)
  }

  getIn(propPath) {
    return path(propPath, this.obj)
  }
}

export default Map
