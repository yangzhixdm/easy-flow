import nextTick from './next-tick'

let flushing = false
let waiting = false
let queue = []

/**
 * watcher入队
 */
function queueWatcher (watcher) {
  // 非flush状态，则先添加到队列中
  if (!flushing) {
    queue.push(watcher)
  }

  // 是否执行过nextTick，用来判定是否第一次执行nextTick
  // optimize 这里首次进来，会执行一次nexTick方法，并出去flushSchedulerQueue,下一个时序在执行flushSchedulerQueue，在这期间不用执行nextTick
  if (!waiting) {
    waiting = true
    nextTick(flushSchedulerQueue)
  }
}

function flushSchedulerQueue () {
  flushing = true
  for (let i = 0; i < queue.length; i++) {
    let watcher = queue[i]
    watcher.run()
  }

  resetSchedulerState()
}

function resetSchedulerState () {
  queue.length = 0
  flushing = waiting = false
}

export default queueWatcher
