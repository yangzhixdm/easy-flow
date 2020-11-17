class Event {
  constructor () {
    this.hooks = new Map()
  }

  on (type, handler) {
    if (this.hooks[type]) {
      this.hooks[type].push(handler)
    } else {
      this.hooks[type] = [handler]
    }
  }

  emit (type, ...args) {
    if (this.hooks[type]) {
      let handler = this.hooks[type]
      for (let i = 0; i < handler.length; i++) {
        handler[i].call(this, args)
      }
    }
  }
}

export default Event
