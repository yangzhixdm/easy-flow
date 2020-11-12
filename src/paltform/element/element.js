import Dep from '../../core/dep'

/**
 * class ELement
 */
class Element {
  constructor (id) {
    this.dep = new Dep()
  }
}

export default Element
