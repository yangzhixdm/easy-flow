import Layout from './layout'
import nodeFactory from '../element/node-factory'
import lineFactory from '../element/line-factory'
import LineContainer from '../element/line-container'

class DefaultLayout extends Layout {

  constructor (id, nodes, lines) {
    super(id)
    this.nodes = nodes
    this.lines = lines
    this._nodeIntances = {}
    this._lineInstances = {}
    this.lineContainer = new LineContainer()
    this.nodesObj = this._convertNodeArrayToObject(nodes)
    this.render()
  }

  _convertNodeArrayToObject (arr) {
    return arr.reduce((acc, cur) => {
      acc[cur.id] = cur
      return acc
    }, {})
  }

  /**
   * resolve line for node
   */
  resolveDeps () {
    // 生成node和line的依赖关系，绑定的dep中
    this.lines.forEach(({ elementId, from, to }) => {
      this._nodeIntances[from].dep.subs.push(this._lineInstances[elementId]._watcher)
      this._nodeIntances[to].dep.subs.push(this._lineInstances[elementId]._watcher)
    })
  }

  renderLines () {
    this.pushNode(this.lineContainer)

    /**
     * 更新line
     */
    this.lines.forEach((line) => {
      const lineNode = lineFactory(line.from, line.to, this._nodeIntances[line.from], this._nodeIntances[line.to])
      line.elementId = lineNode.elementId
      this.pushLine(lineNode)
    })
  }

  renderNodes () {
    // TODO: 放入到layout中，那么说明产生了依赖，则需要绑定到dep中
    // 将节点加入到layout布局中
    this.nodes.forEach(({ id, type, text, x, y }) => {
      this.pushNode(nodeFactory(id, type, text, x, y))
    })
  }

  render () {
    this.renderNodes()
    this.renderLines()
    this.resolveDeps()
  }

  pushLine (line) {
    this._lineInstances[line.elementId] = line
    this.lineContainer.svg.appendChild(line.svg)
  }

  pushNode (node) {
    if (node.elementId) {
      this._nodeIntances[node.elementId] = node
    }
    this.svg.appendChild(node.svg)
  }
}

export default DefaultLayout
