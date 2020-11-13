import Line from '../element/line'
import Watcher from '../../core/watcher'

export default function (from, to, fromNode, toNode) {

  const line = new Line(from, to, fromNode, toNode)
  // 不存在watcher
  if (!line._watcher) {
    line._watcher = new Watcher(line)
  }

  // TODO: 需要验重
  line.dep.subs.push(line._watcher)

  return line
}
