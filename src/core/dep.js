/**
 * class Dep
 */
class Dep {
  constructor () {
    this.subs = []
  }

  update () {
    this.subs.forEach((sub) => {
      sub.update()
    })
  }

  addSub (watcher) {
    // TODO: 需要进行去重
    this.subs.push(watcher)
  }
}

export default Dep
