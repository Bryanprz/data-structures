// Creates a Stack class
var Stack = function() {
  this.count = 0; // keeps track of how many items are in the stack
  this.storage = {};

  // Adds a value onto the end of the stack
  this.push = function(value) {
    this.storage[this.count] = value;
    this.count++;
  }

  // Removes and returns the value at the end (top) of the stack
  this.pop = function() {
    if (this.count === 0) {
      return undefined;
    }

    this.count--;
    var result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }

  this.size = function() {
    return this.count;
  }

  // Returns the value at the end of the stack without removing it
  this.peek = function() {
    return this.storage[this.count - 1];
  }
}
