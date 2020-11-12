import Node from '../element/node'
import Watcher from '../../core/watcher'

let cacheWatcher = {}

export default {
  facotry: (id, type, text, x, y) => {

    const node = new Node(id, type, text, x, y)
    // 不存在watcher
    if (!cacheWatcher[id]) {
      const watcher = new Watcher(node)
      cacheWatcher[watcher.id] = watcher
    } else {
      // 直接更新
      const watcher = cacheWatcher[id]
      watcher.run()
    }

    return node
  },
  cacheWatcher
}
