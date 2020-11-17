import queueWatcher from './scheduler'

let uuid = 0
/**
 * class Watcher
 */
class Watcher {

  constructor (element) {
    this.el = element
    this.watcherId = +uuid
    this.elementId = element.elementId
  }

  update () {
    queueWatcher(this)
  }

  run () {
    // invoke render
    this.el.render()
  }
}

export default Watcher
