import startExampleApp from '../ExampleApp'
import * as TodoApp from './components/TodoApp'

document.head.appendChild(stylesheet('https://cdn.rawgit.com/tastejs/todomvc-common/master/base.css'))
document.head.appendChild(stylesheet('https://cdn.rawgit.com/tastejs/todomvc-app-css/master/index.css'))

startExampleApp(
  TodoApp,
  `This page shows an implementation of the <a href="http://todomvc.com/">TodoMVC</a> app. The source code for this example is <a href="https://github.com/wildlyinaccurate/plait-todomvc">on GitHub</a>.`
)

function stylesheet (href) {
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href = href

  return link
}
