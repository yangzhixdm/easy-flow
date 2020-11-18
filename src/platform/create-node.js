import Node from '../element/node'
import Watcher from '../core/watcher'
import ctor from '../core/ctor'

export default function createNode (options) {
  let node
  if (ctor.get(options.type)) {
    node = new (ctor.get(options.type))(options)
  } else {
    node = new Node(options)
  }
  // 不存在watcher
  if (!node._watcher) {
    node._watcher = new Watcher(node)
  }

  // TODO: 需要验重
  node.dep.subs.push(node._watcher)

  return node
}
