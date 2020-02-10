function UctNode(parentNode, board, action) {
  this.action = action
  this.parentNode = parentNode
  this.children = []
  this.wins = 0
  this.visits = 0
  this.unexamined = board.getActions()
  this.activePlayer = board.active
}

UctNode.prototype.addChild = function(board, index) {
  var node = new UctNode(this, board, this.unexamined[index])
  this.unexamined.splice(index, 1)
  this.children[this.children.length] = node
  return node
}

UctNode.prototype.selectChild = function() {
  var selected = null
  var bestValue = Number.NEGATIVE_INFINITY
  for (var i = 0; i < this.children.length; ++i) {
    var child = this.children[i]
    var uctValue =
      child.wins / child.visits +
      Math.sqrt((2 * Math.log(this.visits)) / child.visits)
    if (uctValue > bestValue) {
      selected = child
      bestValue = uctValue
    }
  }
  return selected
}

UctNode.prototype.update = function(result) {
  ++this.visits
  this.wins += result[this.activePlayer]
}

UctNode.prototype.mostVisitedChild = function() {
  var mostVisited = this.children[0]
  for (var i = 1; i < this.children.length; ++i) {
    if (this.children[i].visits > mostVisited.visits) {
      mostVisited = this.children[i]
    }
  }
  return mostVisited
}
