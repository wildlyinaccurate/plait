import is from 'ramda/src/is'

export default function clone (obj) {
  const newObj = Array.isArray(obj) ? [] : {}

  for (const k in obj) {
    const val = obj[k]

    if (is(Object, val)) {
      if (val.hasOwnProperty('@@Plait/State')) {
        newObj[k] = val.clone()
      } else {
        newObj[k] = clone(val)
      }
    } else {
      newObj[k] = val
    }
  }

  return newObj
}
