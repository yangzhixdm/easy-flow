import Node from '../element/node'
import Watcher from '../core/watcher'
import ctor from '../core/ctor'

export default function createNode (id, type, text, x, y) {
  let node
  if (ctor.get(type)) {
    node = new (ctor.get(type))(id, type, text, x, y)
  } else {
    node = new Node(id, type, text, x, y)
  }
  // 不存在watcher
  if (!node._watcher) {
    node._watcher = new Watcher(node)
  }

  // TODO: 需要验重
  node.dep.subs.push(node._watcher)

  return node
}
