import watcherQueue from './scheduler'

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
    watcherQueue(this)
  }

  run () {
    // 调用render TODO: 进行批量调度
    this.element.render()
  }
}

export default Watcher
