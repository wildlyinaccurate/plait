import Zombie from 'zombie'

import { elementsWithContent, firstTextInput, nthElement, pressEnter } from '../support/utils'

module.exports = function () {
  this.Given(/^I am on the "([^"]+)" page$/, function (page) {
    this.browser = new Zombie()

    return this.browser.visit(`http://localhost:8888/${page}.html`)
  })

  this.When(/^I click the "([^"]+)" link$/, function (text) {
    const link = elementsWithContent(this.browser, 'a', text)[0]

    return this.browser.click(link)
  })

  this.When(/^I press the "([^"]+)" button$/, function (button) {
    return this.browser.pressButton(button)
  })

  this.When(/^I press the "([^"]+)" button (\d+) times?$/, function (button, times) {
    const n = Number(times)
    const ps = Array(n).fill(button).map(b => this.browser.pressButton(b))

    return Promise.all(ps)
  })

  this.When(/^I press the (\d+)(?:st|nd|rd|th) "([^"]+)" button$/, function (nth, className) {
    return this.browser.pressButton(nthElement(this.browser, nth, className))
  })

  this.When(/^I press the (\d+)(?:st|nd|rd|th) "([^"]+)" button (\d+) times?$/, function (nth, className, times) {
    const button = nthElement(this.browser, nth, className)
    const n = Number(times)
    const ps = Array(n).fill(button).map(b => this.browser.pressButton(b))

    return Promise.all(ps)
  })

  this.When(/^I write "([^"]+)" into the input$/, function (val) {
    return this.browser.fill(firstTextInput(this.browser), val)
  })

  this.When(/^I hit enter$/, function (done) {
    const input = firstTextInput(this.browser)

    pressEnter(this.browser, input)

    done()
  })
}
