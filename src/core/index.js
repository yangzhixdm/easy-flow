import Layout from '../layout/default-layout'
import Event from '../event'
import Element from '../element/element'
import Node from '../element/node'
import Line from '../element/line'
import ctor from './ctor'

class EasyFlow {

  constructor (id, { nodes = [], lines = [] } = {}, plugins = []) {

    if (typeof id === 'undefined') {
      throw Error('no id')
    }

    ctor.set('Node', Node)
    ctor.set('Line', Line)

    this.id = id
    this.dom = document.getElementById(id)
    this.layout = new Layout(id, nodes, lines)
    this.event = new Event('layout')
  }

  static install (type = 'element', options) {
    let Sub = function () {}
    let name = options.name
    Sub.prototype = new Element()
    Sub.prototype.constructor = Sub
    ctor.set(name, Sub)
  }
}

export default EasyFlow
