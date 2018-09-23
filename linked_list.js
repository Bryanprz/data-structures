function LinkedList() {
  var length = 0;
  var head = null;

  var Node = function(element) {
    this.element = element;
    this.next = null;
  }

  this.size = function() {
    return length;
  }

  this.head = function() {
    return head;
  }

  this.add = function(element) {
    var node = new Node(element);

    if (head === null) {
      head = node;
    } else {
      var currentNode = head; // start at head to iterate through

      while (currentNode.next) {
        currentNode = currentNode.next; // iterate to the next one if it exists
      }

      currentNode.next = node; // when we reach last node in list, set node there
    }

    length++;
  }

  this.remove = function(element) {
    var currentNode = head; // start at head to iterate
    var previousNode;

    if (currentNode.element === element) {
      head = currentNode.next; // if currentNode is element to delete, move head pointer
    } else {
      while (currentNode.element !== element) {
        previousNode = currentNode;
        currentNode = currentNode.next; // move pointer to next node
      }

      // if target element is found, skip over current node 
      // by pointing previous node to next node
      previousNode.next = currentNode.next;  
    }

    length--;
  }

  this.isEmpty = function() {
    return (length === 0);
  }

  this.indexOf = function(element) {
    var currentNode = head;
    var index = -1;

    while (currentNode) {
      index++;
      if (currentNode.element === element) {
        return index;
      }

      currentNode = currentNode.next;
    }

    return -1;
  }

  this.elementAt = function(index) {
    var currentNode = head;
    var count = 0;

    while (count < index) {
      count++;
      currentNode = currentNode.next;
    }
    return currentNode.element;
  }

  this.addAt = function(index, element) {
    var node = new Node(element);

    var currentNode = head;
    var previousNode;
    var currentIndex = 0;

    if (index > length) {
      return false;
    }

    if (index === 0) {
      node.next = currentNode;
      head = node; // don't forget to update this variable. function variable
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode; // move both pointers
        currentNode = currentNode.next; // move both pointers
      }

      node.next = currentNode;
      previousNode.next = node;
    }

    length++;
  }

  this.removeAt = function(index) {
    var currentNode = head;
    var previousNode;
    var currentIndex = 0;

    if (index < 0 || index >= length) {
      return null;
    }

    if (index === 0) {
      head = currentNode.next;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode; // initially head
        currentNode = currentNode.next;
      }

      previousNode.next = currentNode.next;
    }
    length--;
    return currentNode.element; // returned deleted node
  }
}
