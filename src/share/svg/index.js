import _ from '../../utils'
const svgns = 'http://www.w3.org/2000/svg'

const drawText = function (attrs, textContent) {
  const target = document.createElementNS(svgns, 'foreignObject')
  const body = document.createElement('body')
  target.appendChild(body)
  body.style.height = '100%'
  body.style.width = '100%'
  body.style.fontSize = '14px'
  body.style.margin = 0
  body.style.padding = 0
  const p = document.createElement('p')
  body.appendChild(p)
  p.style.height = '100%'
  p.style.margin = '0px'
  p.style.overflow = 'hidden'
  p.style.textAlign = 'center'
  p.style.textOverflow = 'ellipsis'
  p.style.userSelect = 'none'
  p.style.whiteSpace = 'nowrap'
  p.style.width = '100%'
  update(target, attrs, textContent)
  return target
}

function update (target, attrs, textContent) {
  if (!attrs) {
    return
  }
  if (typeof attrs === 'string') {
    attrs = {}
    textContent = attrs
  }
  Object.entries(attrs).forEach(([k, v]) => {
    target.setAttribute(_.camel2kebab(k), v)
  })
  if (textContent) {
    if (target.tagName === 'foreignObject') {
      target.children[0].children[0].textContent = textContent
      target.style.lineHeight = `${attrs.height}px`
    } else {
      target.textContent = textContent
    }
  }
}

function draw (tagName, attrs, textContent) {
  if (typeof attrs === 'string') {
    attrs = {}
    textContent = attrs
  }
  let target
  if (tagName === 'text') {
    target = drawText(attrs, textContent)
  } else {
    target = document.createElementNS(svgns, tagName)
    update(target, attrs, textContent)
  }
  return target
}

export default {
  update,
  draw
}
