import Zombie from 'zombie'

import { nthElement, firstTextInput } from './utils'


module.exports = function () {
  this.Given(/^I am on the "([^"]+)" page$/, function (page) {
    this.browser = new Zombie()

    return this.browser.visit(`http://localhost:8888/${page}.html`)
  })

  this.When(/^I press the "([^"]+)" button$/, function (button) {
    return this.browser.pressButton(button)
  })

  this.When(/^I press the "([^"]+)" button (\d+) times?$/, function (button, times) {
    const n = Number(times)
    const ps = Array(n).fill(0).map(x => this.browser.pressButton(button))

    return Promise.all(ps)
  })

  this.When(/^I press the (\d+)(?:st|nd|rd|th) "([^"]+)" button$/, function (nth, className) {
    return this.browser.pressButton(nthElement(this.browser, nth, className))
  })

  this.When(/^I press the (\d+)(?:st|nd|rd|th) "([^"]+)" button (\d+) times?$/, function (nth, className, times) {
    const n = Number(times)
    const ps = Array(n).fill(0).map(x => this.browser.pressButton(nthElement(this.browser, nth, className)))

    return Promise.all(ps)
  })

  this.When(/^I write "([^"]+)" into the input$/, function (val) {
    return this.browser.fill(firstTextInput(this.browser), val)
  })

  this.When(/^I hit enter$/, function (done) {
    const input = firstTextInput(this.browser)
    const ev = this.browser.window.document.createEvent('KeyboardEvent')

    ev.initEvent('keyup', true, true)
    ev.which = 13
    ev.keyCode = 13
    ev.key = 'Enter'

    input.dispatchEvent(ev)

    done()
  })
}
