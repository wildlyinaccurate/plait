import { start } from '../../StartApp'
import { init, update, view } from './Counter'

const appNode = start({ init, update, view })

document.getElementById('app').appendChild(appNode)
