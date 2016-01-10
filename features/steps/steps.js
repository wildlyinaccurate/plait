import Zombie from 'zombie'

const $qsa = (browser, selector) => {
  return Array.from(browser.document.querySelectorAll(selector))
}

const nthElement = (browser, nth, className) => {
  return $qsa(browser, `.${className}`)[nth - 1]
}

const firstTextInput = (browser) => {
  return $qsa(browser, 'input').filter(i => i.type === 'text')[0]
}

const elementsWithContent = (browser, selector, text) => {
  return $qsa(browser, selector).filter(el => el.textContent === text)
}

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

  this.Then(/^the counter value should be "([^"]+)"$/, function (value) {
    return this.browser.assert.text('.counter__value', value)
  })

  this.Then(/^the (\d+)(?:st|nd|rd|th) counter value should be "([^"]+)"$/, function (nth, value) {
    return this.browser.assert.text(
      nthElement(this.browser, nth, 'counter__value'),
      value
    )
  })

  this.Then(/^I should see (\d+) counters?$/, function (count) {
    return this.browser.assert.elements('.counter', count)
  })

  this.Then(/^there should be a new cat gif?$/, function (done) {
    setTimeout(() => {
      const imgSrc = this.browser.document.querySelector('img').src

      if (imgSrc === this.currentImageSrc || !imgSrc.includes('giphy')) {
        throw new Error(`${imgSrc} is not a new cat gif`)
      }

      this.currentImageSrc = imgSrc

      done()
    }, 1200)
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

  this.Then(/^there should be (\d+) total requests for "([^"]+)" gifs$/, function (n, topic, done) {
    const gifs = this.browser.resources.filter(res => res.request.url.includes(`&tag=${topic}`))

    if (gifs.length !== Number(n)) {
      throw new Error(`Expected to see ${n} requests for ${topic} gifs but there were ${gifs.length}`)
    }

    done()
  })

  this.Then(/^I should see a "([^"]+)" todo$/, function (name, done) {
    const todos = elementsWithContent(this.browser, '.view label', name)

    if (todos.length !== 1) {
      throw new Error(`Expected to see 1 "${name}" todo but there were ${todos.length}.`)
    }

    done()
  })
}
