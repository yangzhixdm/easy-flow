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
    // this.run()
    // TODO: 批量操作
    queueWatcher(this)
  }

  run () {
    // 调用render TODO: 进行批量调度
    this.el.render()
  }
}

export default Watcher
