import Layout from './layout'
import factory from '../element/node-factory'

class DefaultLayout extends Layout {

  constructor (id, nodes, lines) {
    super(id)
    this.nodes = nodes
    this.lines = lines
  }

  compose () {
    this.nodes.forEach(({ id, type, text, x, y }) => {
      this.push(factory(id, type, text, x, y))
    })
  }

  render () {
    super.render()
  }

  push (node) {
    const container = this.svg
    container.appendChild(node.svg)
  }
}

export default DefaultLayout
