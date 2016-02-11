export default function merge (...objs) {
  return Object.assign.apply(this, [{}].concat(objs))
}
