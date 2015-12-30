import { start } from 'StartApp'
import * as Counter from 'examples/Counter/Counter'

const appNode = start(Counter)

document.getElementById('app').appendChild(appNode)
