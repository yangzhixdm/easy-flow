import Layout from '../layout/default-layout'
import Event from '../event'
import Node from '../element/node'
import Line from '../element/line'
import ctor from './ctor'

class EasyFlow {

  constructor (id, { nodes = [], lines = [] } = {}, plugins = []) {

    if (typeof id === 'undefined') {
      throw Error('no id')
    }

    ctor.set('Node', Node)
    ctor.set('Line', Line)

    this.id = id
    this.dom = document.getElementById(id)
    this.layout = new Layout(id, nodes, lines)
    this.event = new Event('layout')
  }

  static install (type = 'element', options) {
    // 这样子继承的还是会触发父类的构造方法，导致init被重新执行了一次
    class Sub extends Node {}

    // 这里涉及到三层继承，使用Object.create的方式，无法实现super的执行，导致element无法被执行
    // extends 则完美解决了该问题

    let name = options.name
    Sub.prototype.constructor = Sub
    // 赋值属性，可以考虑给定一个options，然后在构造方法中自动进行获取，就不用手动单独赋值了，可以参考vue,mergeOption，哈哈哈
    if (options.render) {
      Sub.prototype.render = options.render
    }
    ctor.set(name, Sub)
  }
}

export default EasyFlow
