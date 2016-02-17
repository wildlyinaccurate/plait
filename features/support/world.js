import Zombie from 'zombie'

module.exports = function () {
  this.World = function World () {
    this.browser = new Zombie()
  }
}
