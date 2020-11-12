import svg from '../../share/svg'

class Layout {

  constructor (domId) {
    this.domId = domId
    this.dom = document.getElementById(domId)
    this.getter()
  }

  getter ({ clazz = 'easyflow', fillColor = '#fdfdfd', strokeColor = '#eeeeee', strokeWitth = 1, cellSize = 12 } = {}) {
    this.clazz = clazz
    this.fillColor = fillColor
    this.strokeColor = strokeColor
    this.strokeWitth = strokeWitth
    this.cellSize = cellSize
  }

  render () {
    const container = this.dom
    container.classList.add(this.clazz)
    container.innerHTML = ''
    container.style.height = '6000px'
    container.style.width = '3000px'
    container.style.display = 'grid'
    container.style.gridTemplateColumns = '1fr'
    container.style.gridTemplateRows = '60px 1fr'
    container.style.gridTemplateAreas = '"header" "main"'

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

    container.appendChild(this.svg)
  }
}

export default Layout
