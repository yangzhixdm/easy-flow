import Layout from './layout'
import nodeFactory from '../element/node-factory'
import LineContainer from '../element/line-container'
import Line from '../element/line'

class DefaultLayout extends Layout {

  constructor (id, nodes, lines) {
    super(id)
    this.nodes = nodes
    this.lines = lines
    this.lineContainer = new LineContainer()
    this.nodesObj = this._convertNodeArrayToObject(nodes)
    this.compose()
  }

  _convertNodeArrayToObject (arr) {
    return arr.reduce((acc, cur) => {
      acc[cur.id] = cur
      return acc
    }, {})
  }

  compose () {
    this.push(this.lineContainer)

    /**
     * 更新line
     */
    this.lines.forEach(({ from, to }) => {
      this.pushLine(new Line(from, to, this.nodesObj[from], this.nodesObj[to]))
    })

    // TODO: 放入到layout中，那么说明产生了依赖，则需要绑定到dep中
    // 将节点加入到layout布局中
    this.nodes.forEach(({ id, type, text, x, y }) => {
      this.push(nodeFactory.facotry(id, type, text, x, y))
    })
  }

  pushLine (line) {
    const container = this.lineContainer.svg
    container.appendChild(line.svg)
  }

  push (node) {
    const container = this.svg
    container.appendChild(node.svg)
  }
}

export default DefaultLayout
