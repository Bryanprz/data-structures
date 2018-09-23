function bfs(graph, root) {
  var nodesLen = {}; 

  for (var i = 0; i < graph.length; i++) {
    nodesLen[i] = Infinity;
  }
  nodesLen[root] = 0; 

  var queue = [root];
  var current; 

  while (queue.length != 0) {
    current = queue.shift();

    var currConnected = graph[current]; 
    var neighborIdx = [];
    var idx = currConnected.indexOf(1);
    while (idx != -1) {
      neighborIdx.push(idx);
      idx = currConnected.indexOf(1, idx + 1);
    }

    for (var j = 0; j < neighborIdx.length; j++) {
      if (nodesLen[neighborIdx[j]] == Infinity) {
        nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
        queue.push(neighborIdx[j]);
      }
    }
  }

  return nodesLen;
}

// Directed Adjacency Matrix: Both columns and rows represent nodes. 1 means
// current node points to that node

var exBFSGraph = [

// 0  1  2  3  4
  [0, 1, 1, 1, 0], // 0 node row. 0 points to 1, 2, and 3 nodes
  [0, 0, 1, 0, 0], // 1 node row. 1 points to 2.
  [1, 1, 0, 0, 0], // 2 node row. 2 points to 0 and 1
  [0, 0, 0, 1, 0], // 3 node row. 3 points to itself.
  [0, 1, 0, 0, 0]  // 4 node row. 4 points to 1
];

// this says to return distances of all nodes from 1
console.log(bfs(exBFSGraph, 1)); 
