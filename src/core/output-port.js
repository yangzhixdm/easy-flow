import Port from './port.js'

/**
 * OutputPort class
 */
class OutputPort extends Port {
  render () {
    console.log(this.x)
    console.log(this.y)
  }
}

export default OutputPort
