import config from '../config'

import Layout from '../paltform/layout/default-layout'

class EasyFlow {

  constructor (id, { nodes = [], lines = [] } = {}, plugins = []) {
    if (typeof id === 'undefined') {
      throw Error('no id')
    }

    this.id = id
    this.dom = document.getElementById(id)
    this.config = config
    this.beforeCreate()
    this.layout = new Layout(id, nodes, lines)
    this.layout.render()
    this.layout.compose()
  }

  beforeCreate () {}
}

export default EasyFlow
