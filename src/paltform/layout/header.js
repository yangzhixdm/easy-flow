class Header {

  constructor (options) {
    this.options = options || {
      types: [
        {
          text: '澄清节点',
          icon: 'easy-flow easy-flow-clarify-node',
          color: '#a074f6'
        },
        {
          text: 'API节点',
          icon: 'easy-flow easy-flow-api',
          color: '#6c90ff'
        },
        {
          text: '挂机节点',
          icon: 'easy-flow easy-flow-end-node',
          color: '#1ea839'
        }
      ]
    }
  }

  render () {
    const template = `
      <div class='easy-flow__header'>
        ${this.options.types.map((type) => { return `<p class='easy-flow__header--item'><i class="${type.icon}" style="color: ${type.color};"></i><span>${type.text}</sapn></p>` }).join('\n')}
      </div>
    `

    return template
  }
}

export default Header
