import svg from '../../share/svg'
import Header from './header'

class Layout {

  constructor (domId) {
    this.domId = domId
    this.dom = document.getElementById(domId)
    this.getter()

    const container = this.dom
    container.classList.add(this.clazz)
    container.innerHTML = ''
    container.style.height = '6000px'
    container.style.width = '3000px'

    const size = this.cellSize
    const image = svg.draw('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
      width: `${size}px`,
      height: `${size}px`
    })

    const kara = svg.draw('path', {
      fill: this.fillColor,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWitth,
      d: `M 0 0 h ${size} v ${size} h -${size} z`
    })

    image.appendChild(kara)
    const encodedImg = window.btoa(image.outerHTML)
    container.style.backgroundImage = `url(data:image/svg+xml;base64,${encodedImg})`

    // TODO: 抽取配置化
    const height = 6000
    const width = 3000
    this.svg = svg.draw('svg', { width, height, transformOrigin: 'left top' })

    const header = new Header()
    const tpl = header.render()
    const placehoderNode = document.createElement('div')
    container.appendChild(placehoderNode)
    placehoderNode.outerHTML = tpl
    container.appendChild(this.svg)
  }

  getter ({ clazz = 'easyflow', fillColor = '#fdfdfd', strokeColor = '#eeeeee', strokeWitth = 1, cellSize = 12 } = {}) {
    this.clazz = clazz
    this.fillColor = fillColor
    this.strokeColor = strokeColor
    this.strokeWitth = strokeWitth
    this.cellSize = cellSize
  }
}

export default Layout
