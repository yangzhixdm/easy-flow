import SvgHelper from '../share/svg'

class LineContainer {

  constructor () {
    this.svg = SvgHelper.draw('g', { id: 'line-container', class: 'easy-flow-line-container' })
  }
}

export default LineContainer
