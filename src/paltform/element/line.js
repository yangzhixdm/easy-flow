import SvgHelper from '../../share/svg'
import Element from './element'
import createRoute from './line-route'

let lineUuid = 0

export default class Line extends Element {

  constructor (from, to, fromNode, toNode) {
    super()
    // line实例的id 内部自动生成
    this.elementId = `line-${++lineUuid}`
    this.from = from
    this.to = to
    this.fromNode = fromNode
    this.toNode = toNode

    this.linePath = SvgHelper.draw('path', {
      d: this.generate(fromNode, toNode),
      class: 'easy-flow-line',
      fill: 'transparent',
      stroke: 'red',
      strokeWidth: 1
    })

    this.arrow = SvgHelper.draw('path', {
      d: this.generateArrow(fromNode, toNode),
      class: 'easy-flow-line',
      fill: 'red',
      stroke: 'red',
      strokeWidth: 1
    })

    this.svg = SvgHelper.draw('g', {
      class: 'easy-flow-line-container'
    })

    this.svg.appendChild(this.linePath)
    this.svg.appendChild(this.arrow)
  }

  /**
   * 生成曲线路径
   */
  generate (fromNode, toNode) {
    return createRoute.createLineRoute(fromNode, toNode)
  }

  generateArrow (fromNode, toNode) {
    return createRoute.createLineArrow(fromNode, toNode)
  }

  render () {
    SvgHelper.update(this.linePath, {
      d: this.generate(this.fromNode, this.toNode)
    })

    SvgHelper.update(this.arrow, {
      d: this.generateArrow(this.fromNode, this.toNode)
    })
  }
}
