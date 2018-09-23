/* Graphs are collections of things and the relationships between them
 
  Data in graphs are called nodes or vertices
  Connections are called edges 
 
  example of graph: social network site. 
    nodes = people
    edges = friendships
 
  Two types of Graphs
  1. Directed. edges have direction. e.g. web pages (nodes) with links (edges). 
    links point from one node to another
 
  2. Undirected. edges have no direction. friends (nodess) with friendships (edges.
    friendships are 2way
 
  --- 3 Ways to represent a graph --- 
  1. Adjacency List. Associates each vertix in graph with collection of neighboring 
    vertices or edges
 
              b
             / \
            a   c
 
    var undirectedG = {
      NodeA: ['NodeB'],
      NodeB: ['NodeA', 'NodeC'],
      NodeC: ['NodeB']
    }
     
   Can also be represented with arrays with numbers instead of string labels
     if collection above is represented as [a, b, c]
 
   var undirectedGArr = {
     [1],    // Node A. points to element index 1 (b)
     [0, 2], // Node B. points to element 0 and 2 (a and c)
     [1]     // Node C. points to element index 1 (b)
   }
 
  2. Adjacency Matrix. 2 dimensional array where each nested array has same
    number of elements as the outer array. Its a matrix with numbers where 
    numbers represent edges. 0's mean no edge or relationship. 1 means there is 
    a relationship
    
             a  b  c
         a | 0  1  0
         b | 1  0  1
         c | 0  1  0

   In JS:
     
         var adjMat = [
           [0, 1, 0], // a row. a connects to b
           [1, 0, 1], // b row. b connects to a and c
           [0, 1, 0]  // c row. c connects to b
         ];

   Adjacency Matrix can also represent a directed graph. Numbers mark only which nodes
   are pointed to. 

         a <-- b <-- c

         var adjMat = [
           [0, 0, 0], // a row. a points to nothing
           [1, 0, 0], // b row. b points to a
           [0, 1, 0]  // c row. c points to b
         ];

  3. Incidence Matrix. 2 dimensional array. But rows and columns don't both represent nodes.
     In incidence matrix rows represent nodes, and columns represent edges. This means
     we can have an uneven number of rows and columns. Each column represents a unique edge.
     Each edge connects two nodes. To show there's an edge between two nodes, put a 1 in 
     BOTH rows of a particular column.

     Undirected Graph

         A – 1 – B
         |\     /
        4| 3   2
         |  \ /
         D   C

         1  2  3  4
     a | 1  0  1  1   // Edge 1 connects a and b. Edge 3 connects a and c
     b | 1  1  0  0   // Edge 1 connects a and b. Edge 2 connects b and c  
     c | 0  1  1  0   // Edge 3 connects a and c
     d | 0  0  0  1   // Edge 4 connects a and d

     Directed Graph (x means arrows. if no arrow next to node, not a point)

         A –– 1 –– x B
         | x        /
         4  \     2
         |   3   /
         x    \ x
         D     C

         1  2  3  4
     a | 1  0 -1  1   // Edge 3 points from c to a. a is -1
     b |-1  1  0  0   // Edge 1 points from a to b. b is -1 
     c | 0 -1  1  0   // Edge 2 points from b to c. c is -1
     d | 0  0  0 -1   // Edge 4 points from a to d. d is -1

     In JS:

      var incMatDir = [
       [1, 0, -1, 1],   // a row. indices are edge columns
       [-1, 1, 0, 0],   // b row. indices are edge columns
       [0, -1, 1, 0],   // c row. indices are edge columns
       [0, 0, 0, -1]    // d row. indices are edge columns
      ];

    Graphs can have weighted edges. So far the graphs above are unweighted (0 or 1).
    Weights can be represented as number greater than 1.

 
    --- Main Uses of Graphs: Graph Traversal ---
    Traversal means finding the distance between two nodes in a graph.
    Main types of traversal algorithms are breadth-first search and depth-first search

    Breadth-first search: Node visits ALL its neighboring nodes that are 1 edge away,
    then goes on to visit each of THEIR neighbors. The point is to determine how close
    nodes are to a root node. 

 */

// Breadth-First Search

function bfs(graph, root) {
  var nodesLen = {}; // object where we keep track of distances from root

  // graph is 2 dimensional array. iterate on each array
  // and set number of arrays (i.e. nodes) to Infinity initially
  // Infinity means a node is never reached from root
  for (var i = 0; i < graph.length; i++) {
    nodesLen[i] = Infinity;
  }
  // returns { '0': Infinity, '1': Infinity, '2': Infinity, '3': Infinity, '4': Infinity }

  // set root node as 0 because distance from itself is always 0
  nodesLen[root] = 0; 

  // create queue to keep track of nodes to visit
  // unlike tree or heap, we don't start from 0 index, we start from root.
  // i.e. from desired node to search distances from
  var queue = [root];

  // keep track of current node we are traversing
  var current; 

  while (queue.length != 0) {
    // start off while loop by taking first node from queue to traverse
    // initially first node to traverse is root node
    current = queue.shift();

    // get all nodes connected to current node. remember graph is 2D array
    // so graph[current] is an array of node connections (0s and 1s)
    var currConnected = graph[current]; // returns [0, 0, 1, 0, 0]

    // keep track of list of nodes connected to current node
    var neighborIdx = [];

    // get the first node connected to current node. 
    // in our array, 1 means current node (index of array) 
    // is connected to another node (index of 1)
    var idx = currConnected.indexOf(1); // returns 2

    // idx will equal -1 if current node has no connections
    while (idx != -1) {
      // if there's a connection add node (index of 1) to neighbor array
      neighborIdx.push(idx);

      // then search for next connected node starting after previous one we found
      idx = currConnected.indexOf(1, idx + 1);
    }
    // returns [2]; that's the node that has a connection to root node

    for (var j = 0; j < neighborIdx.length; j++) {
      // neighborIdx is [2]
      // neighborIdx[j] will return each element in neighborIdx, in this case just 2
      // nodesLen is object where nodes equal Infinity (except root which is 0) 
      // if node points to Infinity we haven't set the distance so set it now
      // so this says does nodeLen[2] == Infinity? 

      if (nodesLen[neighborIdx[j]] == Infinity) {
        // nodesLen[current] is nodesLen[root] which is 0 initially
        // why are we adding 1 to nodesLen[current]? because for each neighbor FROM THE ROOT
        // we increment the distance by 1. nodesLen[current] goes from neighbor to neighbor
        // for every jump we increment distance from root, and assign that incremented value 
        // to that node in the nodesLen object.
        nodesLen[neighborIdx[j]] = nodesLen[current] + 1;

        // push connected node (neighbor) into queue. it will become the next
        // current node from which to search connections for.
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
