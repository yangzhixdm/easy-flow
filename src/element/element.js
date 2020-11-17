import Dep from '../core/dep'
import Event from '../event'

/**
 * class ELement
 */
class Element {
  constructor () {
    this.dep = new Dep()
    this.event = new Event('element')
  }
}

export default Element
