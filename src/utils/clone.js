export default function clone (obj) {
  const newObj = []

  for (let i in obj) {
    const val = obj[i]

    if (typeof val === 'object') {
      if (val.hasOwnProperty('@@Plait/State')) {
        newObj[i] = val.clone()
      } else {
        newObj[i] = clone(val)
      }
    } else {
      newObj[i] = val
    }
  }

  return newObj
}
