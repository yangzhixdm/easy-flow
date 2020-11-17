let easyflowEvents = []

class Event {
  constructor (name) {
    this.name = name
    this.hooks = new Map()
    easyflowEvents.push(this)
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
        handler[i].apply(this, args)
      }
    }
  }

  dispatch (name, type) {
    for (let i = 0; i < easyflowEvents.length; i++) {
      if (easyflowEvents[i].name === name) {
        easyflowEvents[i].emit(type)
      }
    }
  }
}

export default Event
