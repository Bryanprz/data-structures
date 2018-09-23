// Binary Search Trees search in logarithmic time since we halve
// after every search operation. i.e. on average operations are able
// to skip about half the tree. each insertion, deletion or lookup takes
// time proportional to the log of items stored in the tree.
//
// this is better than linear time required to find items by key in unsorted array
// but slower than corresponding operations on a hash table

// root node       - level 0
// first leaf node - level 1
// second ''       - level 2
// ...
// ..
// .

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left; // points to left node
    this.right = right; // points to right node
  }
}

// Data lower than current node goes to left of current node
// Data greater than current node goes to right of current node

class BST {
  constructor() {
    this.root = null; // top of tree
  }

  add(data) {
    const node = this.root;
    if (node === null) { // if this is first node, node will be null
      this.root = new Node(data);
      return;
    } else {
      const searchTree = function(node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else { // if data is neither less than or greater than any node it's already in tree
          return null;
        }
      }
      return searchTree(node);
    }
  }

  findMin() {
    let current = this.root;
    while (current.left !== null) { // will stop once current node doesn't point to a left
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  find(data) {
    let current = this.root;
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }

  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  remove(data) {

    // function signature
    // node: starting node
    // data: value to delete from tree
    const removeNode = function(node, data) {

      // if node is null we have an empty tree; return
      if (node == null) { 
        return null;
      }

      // check if we found that data in the tree
      // if we did, check if that node has children
      if (data == node.data) { // 3 cases: 1. node has no children; 2. node has 1 child (left or right); 3. node has two children

        // 1. if node has no children
        if (node.left == null && node.right == null) {

          // set the reference to the node that had that data to null; i.e. delete it.
          return null; 
        }

        // 2. if node has no left children
        if (node.left == null) {
          
          // replace the current node with whatever's on the right
          // to keep correct tree structure
          return node.right;
        }

        // 2. node has no right child
        if (node.right == null) {

          // replace current node with left node
          return node.left;
        }

        // 3. if node has two children
        //
        // go to next largest node
        var tempNode = node.right; 
        while (tempNode.left !== null) {
          // keep going down all the left nodes
          // until you hit the last left node
          // that node is larger than the current node but less than node.right
          // i.e. that's the one we use to replace original node that was passed in as arg
          tempNode = tempNode.left; 
        }
        
        // replace current node data with tempNode data from left-most node
        node.data = tempNode.data; 

        // replace right node subtree with result from recursive function call, deleting tempNode.data, i.e. left-most node
        node.right = removeNode(node.right, tempNode.data); // this says 'start at right node and look for tempNode.data and delete it'
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }

    // function call
    // pass in root (always start with root) and data that we're searching for
    this.root = removeNode(this.root, data); 
  }

  // minHeight is distance from root node to first leaf node without 2 children
  // e.g. from root node (level 0) to next leaf node with just one child or none (level 1) = 1
  findMinHeight(node = this.root) {

    // if tree is empty return -1
    if (node == null) {
      return -1;
    };

    // recurvsive calls
    // eventually one of these will return -1 as above
    // i.e. one of these will eventually point to an empty child node
    // i.e. the node will not have children
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);

    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  // distance from root node to bottom-most node of tree
  findMaxHeight(node = this.root) {
    if (node == null) {
      return -1;
    }

    // eventually one of these will return -1
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);

    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  // a balanced tree is a tree where the difference between minHeight and maxHeight differ by at most 1
  // balanced tree:  maxHeight - minHeight <= 1
  isBalanced() {
    // if min height and max height differ by only one, tree is balanced
    // minHeight >= maxHeight - 1; same as maxHeight - minHeight <= 1
    return (this.findMinHeight() >= this.findMaxHeight() - 1);
  }

  /* Tree Traversal Methods */
  // used to traverse tree and find values within tree

  /*
   depth-first search: tree is explored as deeply as possible before search continues on another subtree
     three ways to do depth-first search: 
       1. inOrder traversal: begin search at left-most node and end at right-most node. adds numbers in order
       2. preOrder traversal: explore root nodes before the leaves. searches one subtree fully (e.g. root.left) before moving on to next subtree (e.g. root.right)
       3. postOrder traversal: explores leaf nodes before roots. also searches by subtree fully up to root node before moving on to next subtree.

    breadth-first search: search explores all nodes in a given level within a tree before moving on to next level
      first level 0
      then level 1 .... etc.
  */
  
  inOrder() {
    // just check if tree even exists
    // if not return null
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traverseInOrder(node) {
        
        // this says, 'if left node exists, run this function. uses short circuit hacking
        node.left && traverseInOrder(node.left); 
        result.push(node.data);
        
        // if right node exists, run this function
        node.right && traverseInOrder(node.right);
      }

      traverseInOrder(this.root);
      return result;
    }
  }

  preOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePreOrder(node) {
        result.push(node.data);
        node.left && traversePreOrder(node.left);
        node.right && traversePreoOrder(node.right);
      }
      traversePreOrder(this.root);
      return result;
    }
  }

  postOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePostOrder(node) {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node.data);
      }
      traversePostOrder(this.root);
      return result;
    }
  }

  levelOrder() {
    //eventually this will be returned
    let result = []; 

    // temp array we are using. eventually elements from here
    // will be put onto results array
    let Q = []; 
    
    if (this.root != null) {
      Q.push(this.root);
      while (Q.length > 0) { // as long as there's something in q
        let node = Q.shift(); // dequeu first item
        result.push(node.data);
        if (node.left != null) {
          Q.push(node.left); // push next level left node
        }
        if (node.right != null) {
          Q.push(node.right); // push next level right node
        }
      }
      return result;
    } else {
      return null;
    }
  }
}
