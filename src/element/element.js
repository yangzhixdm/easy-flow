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

  // init 方法的存在主要是为了方便初始化参数，如果直接写在构造方法中的化，那么不方便继承
  // 毕竟子类的参数可能和父节点的参数不一样，如果使用一个init方法，那么就可以将构造器和数据的初始化进行分开，通过遍历的方式进行处理参数，而不是直接写死
  // 只需要遍历option然后将对应的参数赋值
  init (options) {

  }

  static extend () {
    let Sub = function () {}
    Sub.prototype = Object.create(Element.prototype)
    Sub.prototype.constructor = Sub
    console.log(Sub)
  }
}

export default Element
