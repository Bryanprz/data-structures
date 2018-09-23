/* Queue */

// First In First Out
// like a queue in a store to buy something

function Queue() {
  collection = [];

  this.print = function() {
    console.log(collection);
  };

  // items go onto end of array
  this.enqueue = function(value) {
    collection.push(value);
  };

  // items are returned from front of array
  this.dequeue = function() {
    return collection.shift();
  };

  this.front = function() {
    return collection[0];
  };

  this.size = function() {
    return collection.length;
  };

  this.isEmpty = function() {
    return (collection.length === 0);
  };
}

/* Priority Queue */
// has a value that sets priority. elements are added as arrays; first
// element is value, second is priority
// example: [['bryan', 3], ['maria', 4]]

function PriorityQueue() {
  var collection = [];

  this.printCollection = function() {
    console.log(collection);
  };

  this.enqueue = function(element) {
    if (this.isEmpty()) {
      collection.push(element);
    } else {
      var added = false; // used to add item at end of queue if priority value isn't used
      for (var i = 0; i < collection.length; i++) {
        if (element[1] < collection[i][1]) {
          collection.splice(i, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        collection.push(element);
      }
    }
  }

  this.dequeue = function() {
    var value = collection.shift();
    return value[0];
  }

  this.front = function() {
    return collection[0];
  }

  this.size = function() {
    return collection.length;
  }

  this.isEmpty = function() {
    return (collection.length === 0);
  }
}
