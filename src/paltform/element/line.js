import SvgHelper from '../../share/svg'
import Element from './element'

let lineUuid = 0

export default class Line extends Element {

  constructor (from, to, fromNode, toNode) {
    super()
    // line实例的id 内部自动生成
    this.elementId = `line-${++lineUuid}`
    this.from = from
    this.to = to

    this.svg = SvgHelper.draw('path', {
      d: this.generate(fromNode, toNode),
      class: 'easy-flow-line',
      fill: 'transparent',
      stroke: 'red',
      strokeWidth: 2
    })
  }

  /**
   * 生成曲线路径
   */
  generate (fromNode, toNode) {
    // 获取节点坐标
    const startX = fromNode.x + 50// 加元素宽度一半 TODO: 宽度可配置
    const startY = fromNode.y + 40
    const endX = toNode.x + 50
    const endY = toNode.y

    const distanceX = toNode.x - fromNode.x
    const distanceY = toNode.y - fromNode.y
    // TODO: 后续考虑修改为比例, 并且上下左右出线方案，需要考虑象限方案
    const extra = 50
    return `M${startX} ${startY - 2} C ${startX + (distanceX / 2)} ${startY + (distanceY / 2) - extra}, ${endX - (distanceX / 2)} ${endY - (distanceY / 2) + extra}, ${endX} ${endY + 2}`
  }
}
