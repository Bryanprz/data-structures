// typical use case of a Set is to check for the presence of an item
// ES6 has a Set data type but doesn't implement all methods you might want

function mySet() {
  // the var collection will hold the set in this array
  var collection = [];

  // this method checks for presence of element and returns true or false
  this.has = function(value) {
    return (collection.indexOf(value) !== -1);
  }

  // returns all values in set
  this.values = function() {
    return collection;
  }

  // add an element to the set if it doesn't already exist in set
  this.add = function(element) {
    if(!this.has(element)) {
      collection.push(element);
      return true;
    }
    return false;
  }

  // this method will remove an element from a set
  this.remove = function(element) {
    if (this.has(element)) {
      index = collection.indexOf(element);
      collection.splice(index, 1); // this is how you remove an element from an array
      return true;
    }
    return false;
  }

  // this method returns the size of the collection
  this.size = function() {
    return collection.length;
  }

  // this method will return the union of two sets in a new set
  this.union = function(otherSet) {
    var unionSet = new mySet();
    var firstSet = this.values();
    var secondSet = otherSet.values();

    firstSet.forEach(function(e) {
      unionSet.add(e);
    });

    secondSet.forEach(function(e) {
      unionSet.add(e);
    });

    return unionSet;
  }

  // this method returns intersection of two sets as a new set
  this.intersection = function(otherSet) {
    var intersectionSet = new mySet();
    var firstSet = this.values();
    firstSet.forEach(function(e) {
      if (otherSet.has(e)) { // inverse of difference
        intersectionSet.add(e);
      }
    })

    return intersectionSet;
  }

  // Intersection and Difference methods are inverses of each other

  // this method returns the difference of two sets as a new set
  this.difference = function(otherSet) {
    var differenceSet = new mySet();
    var firstSet = this.values();
    firstSet.forEach(function(e) {
      if (!otherSet.has(e)) { // inverse of intersection
        differenceSet.add(e);
      }
    });

    return differenceSet;
  }

  // this method tests if set is subset of different set
  this.subset = function(otherSet) {
    var firstSet = this.values();
    return firstSet.every(function(e) {
      return otherSet.has(e);
    });
  }
}
