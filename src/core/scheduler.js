let callbacklist = []
let isflush = false

/**
 * watcher入队
 */
function watcherQueue (watcher) {
  // TODO: 判断状态
  if (isflush) {
    flushWatcherQueue(watcher)
  } else {
    watcher.run()
  }
}

function flushWatcherQueue (watcher) {
  if (isflush) {
    callbacklist.push(watcher)
  } else {
    batchInvoke()
  }
}

/**
 * 批量执行更新
 */
function batchInvoke () {
  for (let i = 0; i < callbacklist.length; i++) {
    callbacklist[i].run()
  }
}

export default watcherQueue
