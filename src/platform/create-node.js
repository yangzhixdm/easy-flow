import Node from '../element/node'
import Watcher from '../core/watcher'

export default function createNode (id, type, text, x, y) {

  const node = new Node(id, type, text, x, y)
  // 不存在watcher
  if (!node._watcher) {
    node._watcher = new Watcher(node)
  }

  // TODO: 需要验重
  node.dep.subs.push(node._watcher)

  return node
}
