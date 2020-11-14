import _ from '../../utils'

/**
 * create line route
 */
function createLineRoute (fromNode, toNode) {
  // TODO: 多条线路绘制
  return createRoute(createRegin(fromNode, toNode), fromNode, toNode)
}

function createRegin (fromNode, toNode) {
  const fromX = fromNode.x
  const fromY = fromNode.y
  const toX = toNode.x
  const toY = toNode.y

  // 计算角度
  const x = toX - fromX
  const y = fromY - toY
  // 以开始节点为坐标，计算目标节点与开始节点的角度
  const theta = _.angel(x, y)
  // 判定象限，第一象限45度和第四象限45度: region = 0, 依次类推
  const region = Math.floor(theta / 45)

  return region
}

function createPoint (region, sx, sy, ex, ey) {
  // TODO:好像涉及到了 x 和 y的比例的问题
  // const extra = 50
  const width = 100
  const height = 40

  let startX, startY, endX, endY
  if (region === 0) {
    // 目标节点在起始节点 0 - 45 区间
    startX = sx + width
    startY = sy + height / 2
    endX = ex
    endY = ey + height / 2
  } else if (region === 1) {
    // 目标节点在起始节点 45- 90 区间
    startX = sx + width / 2
    startY = sy
    endX = ex
    endY = ey + height / 2
  } else if (region === 2) {
    // 目标节点在起始节点 90 - 135 区间
    startX = sx + width / 2
    startY = sy
    endX = ex + width / 2
    endY = ey + height
  } else if (region === 3) {
    // 目标节点在起始节点 135 - 180 区间
    startX = sx
    startY = sy + height / 2
    endX = ex + width / 2
    endY = ey + height
  } else if (region === 4) {
    // 目标节点在起始节点下边
    startX = sx
    startY = sy + height / 2
    endX = ex + width
    endY = ey + height / 2
  } else if (region === 5) {
    // 目标节点在起始节点下边
    startX = sx + width / 2
    startY = sy + height
    endX = ex + width / 2
    endY = ey
  } else if (region === 6) {
    // 目标节点在起始节点下边
    startX = sx + width / 2
    startY = sy + height
    endX = ex + width / 2
    endY = ey
  } else if (region === 7) {
    // 目标节点在起始节点下边
    startX = sx + width / 2
    startY = sy + height
    endX = ex
    endY = ey + height / 2
  }

  return {
    startX,
    startY,
    endX,
    endY
  }
}

function createRoute (region, fromNode, toNode) {
  const point = createPoint(region, fromNode.x, fromNode.y, toNode.x, toNode.y)
  return `M${point.startX} ${point.startY}, ${point.endX} ${point.endY}`
}

/**
 * 创建箭头
 */
function createLineArrow (fromNode, toNode) {
  const node = createPoint(createRegin(fromNode, toNode), fromNode.x, fromNode.y, toNode.x, toNode.y)
  return `M ${node.endX - 3} ${node.endY - 5} l 3 5 l 3 -5 z`
}

export default {
  createLineArrow,
  createLineRoute
}
