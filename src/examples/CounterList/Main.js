import { start } from 'StartApp'
import * as CounterList from 'examples/CounterList/CounterList'

const appNode = start(CounterList)

document.getElementById('app').appendChild(appNode)
