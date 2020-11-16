let callbacks = []
let pending = false
let timerFunc

const p = Promise.resolve()
timerFunc = () => {
  p.then(flushCallbacks)
}

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
/**
 * nextTick func
 */
function nextTick (cb, ctx) {
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        console.error(e)
      }
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}

export default nextTick
