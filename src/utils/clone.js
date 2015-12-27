export default function clone (obj) {
  const newObj = {}

  for (let i in obj) {
    if (typeof obj[i] === 'object') {
      newObj[i] = clone(obj[i])
    } else {
      newObj[i] = obj[i]
    }
  }

  return newObj
}
