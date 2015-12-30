import { start } from '../../StartApp'
import * as CounterList from './CounterList'

const appNode = start(CounterList)

document.getElementById('app').appendChild(appNode)
