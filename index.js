import { start } from './src/StartApp'
import { init, update, view } from './src/CounterList'

const appNode = start({ init, update, view })

document.getElementById('app').appendChild(appNode)
