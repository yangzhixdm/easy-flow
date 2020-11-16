const callbacks = []
let pending = false

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let timerFunc

const p = Promise.resolve()
timerFunc = () => {
  p.then(flushCallbacks)
}

export default function nextTick (cb, ctx) {
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
      }
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}
