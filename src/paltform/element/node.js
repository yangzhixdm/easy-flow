import SvgHelper from '../../share/svg'

/**
 * node class
 */
class Node {
  constructor (id, type, text, x, y) {
    this.active = false
    this.hovering = false
    this.nodeId = id
    this.text = text
    this.x = x
    this.y = y
    this.type = type

    this.create()
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
    const domRect = SvgHelper.draw('rect',
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
    const domText = SvgHelper.draw('text', {
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
}

export default Node
