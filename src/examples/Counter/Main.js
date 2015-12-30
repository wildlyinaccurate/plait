import { start } from '../../StartApp'
import * as Counter from './Counter'

const appNode = start(Counter)

document.getElementById('app').appendChild(appNode)
