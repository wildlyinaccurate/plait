import { start } from 'App'
import * as TodoApp from './TodoApp'


document.getElementById('app').appendChild(start(TodoApp))

document.head.appendChild(stylesheet('https://cdn.rawgit.com/tastejs/todomvc-common/master/base.css'))
document.head.appendChild(stylesheet('https://github.com/tastejs/todomvc-app-css/blob/master/index.css'))

function stylesheet (href) {
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href = href

  return link
}
