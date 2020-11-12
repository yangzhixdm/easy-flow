const shallowClone = (_) => ({ ..._ })
let hasOwnProperty = Object.prototype.hasOwnProperty

const pick = (obj, keys) =>
  (typeof keys === 'string' ? keys.split(' ') : keys).reduce((acc, k) => {
    if (hasOwnProperty.call(obj, k)) {
      acc[k] = obj[k]
    }
    return acc
  }, {})

const omit = (obj, keys) =>
  pick(obj, Object.keys(obj).filter((k) => !keys.includes(k)))

const kebab2camel = (str) =>
  str.replace(/(-[A-Za-z])/g, (m) => m.toUpperCase().replace('-', ''))

const camel2kebab = (str) => str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`)

const latentSet = (o, k, v) => {
  if (!o[k]) {
    Object.defineProperty(o, k, {
      configurable: false,
      enumerable: false,
      value: v
    })
  }
}

const isEqual = (foo, bar) => {
  if (!foo) {
    return true
  }
  const kFoos = Object.keys(foo)
  const kBars = Object.keys(bar)
  if (kFoos.length !== kBars.length) {
    return false
  }
  for (const k of kFoos) {
    if (!hasOwnProperty.call(bar, k) || typeof foo[k] !== typeof bar[k]) {
      return false
    }
    if (typeof foo[k] !== 'object') {
      if (foo[k] !== bar[k]) {
        return false
      }
    } else {
      if (!isEqual(foo[k], bar[k])) {
        return false
      }
    }
  }
  return true
}

const isNode = ({ model }) => model.shape.split('-')[1] === 'node'

const getNodes = (graph) => graph.getNodes().filter((node) => isNode(node))

const warning = (condition, message) => {
  if (!condition) {
    throw new Error(message)
  }
}

const debounce = (func, wait = 100) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.call(this, ...args)
    }, wait)
  }
}

const throttle = (func, wait = 10) => {
  var lastCall = Date.now()
  return function (...args) {
    const now = Date.now()
    if (now - lastCall > wait) {
      func.call(this, ...args)
      lastCall = now
    }
  }
}

const setterProxy = (o, rule, afterCb, exclude = false) => {
  Object.keys(o).forEach((k) => {
    if (exclude ? rule.test(k) : !rule.test(k)) {
      const origin = o[k]
      o[k] = function (...args) {
        origin.call(this, ...args)
        afterCb.call(this, ...args)
      }
    }
  })
}

const deepTraverse = (o, p, cb) => {
  // eslint-disable-next-line no-useless-call
  cb.call(null, o)
  if (o[p] && o[p].length) {
    Array.from(o[p]).forEach((child) => deepTraverse(child, p, cb))
  }
}

const shrinkSpaces = (s) => s.replace(/\s+/g, ' ')

const appendTo = function (target) {
  target.appendChild(this)
  return this
}

const arrayToObject = (array, key) =>
  array.reduce((acc, item) => {
    acc[item[key]] = item
    return acc
  }, {})

const deepClone = (obj) => JSON.parse(JSON.stringify(obj))

export default {
  shallowClone,
  pick,
  omit,
  kebab2camel,
  camel2kebab,
  latentSet,
  isEqual,
  isNode,
  getNodes,
  warning,
  debounce,
  throttle,
  setterProxy,
  deepTraverse,
  shrinkSpaces,
  appendTo,
  arrayToObject,
  deepClone
}
