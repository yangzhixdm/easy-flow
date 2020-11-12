import Node from '../element/node'

export default function facotry (id, type, text, x, y) {
  return new Node(id, type, text, x, y)
}
