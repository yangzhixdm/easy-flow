import Layout from '../layout/default-layout'
import Event from '../event'

class EasyFlow {

  constructor (id, { nodes = [], lines = [] } = {}, plugins = []) {
    if (typeof id === 'undefined') {
      throw Error('no id')
    }

    this.id = id
    this.dom = document.getElementById(id)
    this.layout = new Layout(id, nodes, lines)
    this.event = new Event('layout')
  }
}

export default EasyFlow
