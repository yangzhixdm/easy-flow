import Dep from '../core/dep'

/**
 * class ELement
 */
class Element {
  constructor () {
    this.dep = new Dep()
  }
}

export default Element
