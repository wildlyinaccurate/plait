export default function clone (obj) {
  const newObj = Array.isArray(obj) ? [] : {}

  Object.keys(obj).map(k => {
    const val = obj[k]

    if (typeof val === 'object') {
      if (val.hasOwnProperty('@@Plait/State')) {
        newObj[k] = val.clone()
      } else {
        newObj[k] = clone(val)
      }
    } else {
      newObj[k] = val
    }
  })

  return newObj
}
