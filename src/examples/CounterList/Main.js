import { start } from '../../StartApp'
import { init, update, view } from './CounterList'

const appNode = start({ init, update, view })

document.getElementById('app').appendChild(appNode)
