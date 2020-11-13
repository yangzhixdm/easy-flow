import Element from './element'
import SvgHelper from '../../share/svg'

let nodeUuid = 0

/**
 * node class
 */
class Node extends Element {

  constructor (id, type, text, x, y) {
    super()
    this.elementId = id || `nodeId-${++nodeUuid}`
    this.active = false
    this.hovering = false
    this.nodeId = id
    this.text = text
    this.x = x
    this.y = y
    this.type = type
    this.svgRect = null
    this.svgText = null

    this.create()
    this.event()
  }

  /**
   * 生成node class list
   */
  generateCalssList () {
    let classList = ['easy-flow-node']
    return classList.concat(`easy-flow-node-${this.type}`).join(' ')
  }

  generateId () {
    return `${this.type}-${this.nodeId}`
  }

  create () {
    const svg = SvgHelper.draw('g', { id: this.generateId(), class: this.generateCalssList() })
    const domRect = this.svgRect = SvgHelper.draw('rect',
      {
        class: `easy-flow-${this.type}-rect`,
        stroke: '#cccccc',
        strokeWidth: 1,
        width: 100,
        height: 40,
        fill: 'white',
        rx: 5,
        ry: 5,
        x: this.x,
        y: this.y
      }
    )
    const domText = this.svgText =  SvgHelper.draw('text', {
      class: `easy-flow-node-text easy-flow-${this.type}-text`,
      width: 100,
      height: 40,
      x: this.x,
      y: this.y
    }, this.text)

    svg.appendChild(domRect)
    svg.appendChild(domText)
    this.svg = svg
    return svg
  }

  event () {
    let boundingRect, x, y, offsetX, offsetY
    let extra = 40
    // TODO: 多次绑定问题，节点越多绑定次数越多，应该放在layout进行绑定，然后移动固定的节点
    this.svg.addEventListener('mousedown', (e) => {
      boundingRect = this.svg.getBoundingClientRect()
      x = e.pageX
      y = e.pageY
      offsetX = x - boundingRect.left
      offsetY = y - boundingRect.top

      document.addEventListener('mousemove', (e) => {
        if (boundingRect) {
          boundingRect = this.svg.getBoundingClientRect()
          let distanceX = e.clientX - x
          let distanceY = e.clientY - y
          this.x = distanceX + x - offsetX
          this.y = distanceY + y - offsetY - extra
          // this.moveNode()
          this.update()
        }
      })

      document.addEventListener('mouseup', (e) => {
        if (boundingRect) {
          boundingRect = null
        }
      })
    })
  }

  moveNode () {
    // TODO: 重叠顺序问题
    SvgHelper.update(this.svgRect, {
      x: this.x,
      y: this.y
    })

    SvgHelper.update(this.svgText, {
      x: this.x,
      y: this.y
    })
  }

  render () {
    console.log('render node')

    SvgHelper.update(this.svgRect, {
      x: this.x,
      y: this.y
    })

    SvgHelper.update(this.svgText, {
      x: this.x,
      y: this.y
    })
    // render
  }

  update () {
    // 触发watcher更新
    this.dep.update()
  }
}

export default Node
