import clone from './utils/clone'

class Map {
  constructor (obj) {
    if (typeof obj !== 'object') {
      throw new TypeError(obj, 'is not an object')
    }

    this.obj = obj
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
    return this.obj[prop]
  }

  update (prop, updater) {
    return this.set(prop, updater(this.get(prop)))
  }

  setIn(path, val) {
    const obj = this.toObject()
    const [ref, idx] = resolvePath(path, obj)

    ref[path[idx]] = val

    return new Map(obj)
  }

  getIn(path, val) {
    const [ref, idx] = resolvePath(path, this.obj)

    return ref[path[idx]]
  }
}

function resolvePath (path, ref) {
  let idx = 0

  while (idx < path.length - 1) {
    if (ref == null) {
      return
    }

    ref = ref[path[idx]]
    idx += 1
  }

  return [ref, idx]
}

export default Map
