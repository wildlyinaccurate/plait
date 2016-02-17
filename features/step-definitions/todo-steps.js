import { elementsWithContent, firstTextInput, nthElement, pressEnter } from '../support/utils'

module.exports = function () {
  this.When(/^I create some todos$/, function (done) {
    const input = firstTextInput(this.browser)

    this.browser.fill(input, 'First Todo')
    pressEnter(this.browser, input)

    this.browser.fill(input, 'Second Todo')
    pressEnter(this.browser, input)

    done()
  })

  this.Then(/^I should( not)? see a "([^"]+)" todo$/, function (not, name, done) {
    const todos = elementsWithContent(this.browser, '.view label', name)
    const expectedElements = not ? 0 : 1

    if (todos.length !== expectedElements) {
      throw new Error(`Expected to see 1 "${name}" todo but there were ${todos.length}.`)
    }

    done()
  })

  this.When(/^I mark the (\d+)(?:st|nd|rd|th) todo as complete$/, function (nth) {
    return this.browser.pressButton(nthElement(this.browser, nth, 'toggle'))
  })

  this.Then(/^the todo count should say "([^"]+)"$/, function (value) {
    return this.browser.assert.text('.todo-count', value)
  })
}
