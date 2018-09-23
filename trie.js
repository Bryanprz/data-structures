// a Trie stores data in steps
// each step is a node in the Trie
// each node is a single letter of a word
//
// Tries are often used for storing words
// since there are a finite number of letters that can 
// be put together to make a string

// possible use case: validate a word is in a dictionary
// each step or node would represent one letter in a word

let Node = function() {
  this.keys = new Map();
  this.end = false;
  this.setEnd = function() {
    this.end = true;
  }

  this.isEnd = function() {
    return this.end;
  }
}

let Trie = function() {
  this.root = new Node();

  this.add = function(input, node = this.root) {
    // if we're at the end of the word input.length will be 0
    // so set that letter as end of word
    if (input.length === 0) {
      node.setEnd();
      return;

      // if the node does not have a key with the first letter 
      // of the input string...
    } else if (!node.keys.has(input[0])) {
      // create a node with the first letter of the input
      // set new map with key being first letter and value being a new node
      // e.g. 'ball' as input
      // key is 'b', value is new Node
      node.keys.set(input[0], new Node()); // <=== used for next recursion call
      // substr(1) takes substring of input after first letter
      // start this at the node we just created above and add next letter
      return this.add(input.substr(1), node.keys.get(input[0])); // <=== recursion call
    } else {
      // if letter already exists in trie
      // just add the next letter (substring(1)) starting from first letter node
      return this.add(input.substr(1), node.keys.get(input[0]));
    }
  }

  this.isWord = function(word) {
    let node = this.root;
    while (word.length > 1) {
      // if root node does not have first letter
      // of word word doesn't exist in trie
      if (!node.keys.has(word[0])) {
        return false;  
      } else {
        // if the first letter is in the trie
        // set the node pointer to the first letter node
        // instead of root node
        node = node.keys.get(word[0]);
        // set word to substring after first letter
        // this will shrink down word every iteration 
        // until while loop returns
        word = word.substr(1);
      }
    }

    // at this point word is just a single letter
    return (node.keys.has(word) && node.keys.get(word).isEnd()) ? true : false;
  }

  this.print = function() {
    let words = new Array();
    let search = function(node, string) {

      // if node keys size is not 0
      // that means there are still more letters to look through
      if (node.keys.size != 0) {
        for (let letter of node.keys.keys()) {

          // node.keys.get(letter) means
          // pass in node at that first letter from root node
          // string.concat(letter) adds that first letter to string
          // originally string is empty, we're building it up 
          // letter by letter
          search(node.keys.get(letter), string.concat(letter));
        }

        // if we've reached the end of the word push the string 
        // we just built onto the array
        if (node.isEnd()) {
          words.push(string);
        }
        // if node.keys.size does equal 0
        // that means we're at last letter of a branch
        // so add the string to words array (if length is > 0)
      } else {
        string.length > 0 ? words.push(string) : undefined;
        return;
      }
    }

    // this is where recursion function gets called initially
    search(this.root, new String());
    return words.length > 0 ? words : null;
  }
}
