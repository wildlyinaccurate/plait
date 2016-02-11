module.exports = function () {
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

  this.Then(/^there should be (\d+) total requests for "([^"]+)" gifs$/, function (n, topic, done) {
    const gifs = this.browser.resources.filter(res => res.request.url.includes(`&tag=${topic}`))

    if (gifs.length !== Number(n)) {
      throw new Error(`Expected to see ${n} requests for ${topic} gifs but there were ${gifs.length}`)
    }

    done()
  })
}
