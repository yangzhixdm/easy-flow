let hasOwnProperty = Object.prototype.hasOwnProperty

const kebab2camel = (str) =>
  str.replace(/(-[A-Za-z])/g, (m) => m.toUpperCase().replace('-', ''))

const camel2kebab = (str) => str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`)

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

const angel = (x, y) => {
  const angle = Math.atan2(y, x)
  const theta = angle * (180 / Math.PI)

  if (theta >= 0) {
    return theta
  } else {
    return theta + 360
  }
}

export default {
  angel,
  kebab2camel,
  camel2kebab,
  isEqual,
  isNode,
  getNodes,
  debounce,
  throttle,
  shrinkSpaces,
  appendTo,
  arrayToObject,
  deepClone
}
