// Binary heap is a partially ordered binary tree
// which satisfies the heap property
//
// each node has at most two child nodes
//
// heap property indicates specific relationship between parent
// and child notes.
//
// --- Heap Property --- 
// max heap: all parent nodes are greater than or equal to child node
// min heap: all parent nodes are less than or equal to child node
// order between child nodes on the same level does not matter, only parent-child
//
// binary heap trees are balanced trees, i.e. all levels of tree are fully filled
// and if last level is partially filled, its filled from left to right
//
// heaps can be implemented as arrays, possible because of partial ordering according
// to the heap property. 
//
// index of elements in arrays follow this formula:
//   left child: i * 2
//   right child: i * 2 + 1
//   parent: floor(i / 2); round down to nearest number
//  
//  heap arrays do NOT have index 0; they start at 1
//  last index is also size of heap because heaps start at index 0


let MinHeap = function() {

  let heap = [null]; // set index 0 to null b/c root starts at index 1

  this.insert = function(num) {
    heap.push(num); // first add number to end of heap array, then reorder
    
    // heap.length > 2; means there's more than 1 element in heap
    // if that's the case we need to reorder after adding element to end of arr
    if (heap.length > 2) { 
      
      // index of last element
      let index = heap.length - 1; 

      // Math.floor(index/2) is equation for index of parent node
      // this says while last element is less than its parent
      while (heap[index] < heap[Math.floor(index/2)]) {

        // if index isn't 0, i.e. if we haven't reached the root node
        if (index >= 1) {

          // switch the location of parent and child within the array
          [heap[Math.floor(index/2)], heap[index]] = [heap[index], heap[Math.floor(index/2)]];

          // if parent node is not root node; root node index is 1
          if (Math.floor(index/2) > 1) {

            // set index pointer to parent and repeat while loop
            // to continue comparing parent and child
            index = Math.floor(index/2);

            // else if parent node is root node break out of while loop
          } else {
            break;
          }
        }
      }
    }
  }

  this.remove = function() {
    // we always remove root node from heap
    let smallest = heap[1]; 

    // if we have more than one node in tree
    if (heap.length > 2) {

      // set the first node to be the last node
      heap[1] = heap[heap.length - 1];

      // remove the last element from the array
      // since we already moved it to first index
      heap.splice(heap.length - 1);

      // if length is 3 there's only 2 numbers within tree, (0 index is null)
      if (heap.length == 3) {
        // move the smallest element to index 1
        if (heap[1] > heap[2]) {
          [heap[1], heap[2]] = [heap[2], heap[1]];
        }
        return smallest;
      }

      // if above conditional did not return then there are more than
      // 2 elements in heap so it's more complicated
      let i = 1;
      let left = 2 * i;
      let right = 2 * i + 1;

      // while root element is greater than or equal to left or right child
      while (heap[i] >= heap[left] || heap[i] >= heap[right]) {
        if (heap[left] < heap[right]) {

          // if left child is smallest of 3, switch it with root
          [heap[i], heap[left]] = [heap[left], heap[i]];
          
          // move index pointer to next left child and repeat while loop
          i = 2 * i; 
        } else {

          // right child must be smallest of 3, switch it with root
          [heap[i], heap[right]] = [heap[right], heap[i]];
          
          // move index pointer to next right child and repeat while loop
          i = 2 * i + 1; 
        }
        // update new left and right indexes 
        left = 2 * i;
        right = 2 * i + 1;
        if (heap[left] == undefined || heap[right] == undefined) {
          // if left or right child nodes are undefined we're at bottom of tree
          // so break out of while loop
          break;
        }
      }
    } else if (heap.length == 2) {
      // if heap just has one element just cut off that element
      // if just one element length of heap is 2 because index 0 is null
      heap.splice(1, 1);
    } else {
      // otherwise tree is empty, return null
      return null;
    }
    return smallest;
  }

  // common use case for heap data structure is for heap sort
  // this is one of most efficient sorting algorithms with 
  // average and worst case performance of O(n logn) 
  //
  // Heap sort takes an unsorted array, adding each item in the array 
  // into a min heap, and then extracting every item out of the min
  // heap into a new array
  //
  // the min heap structure ensures that the new array will contain
  // the original items in least to greatest order
  this.sort = function() {
    let result = new Array();
    while (heap.length > 1) {
      // push smallest element from heap array
      // onto this new array until heap length is 1, i.e. heap is empty
      // remove() will return elements of heap in order
      // so results array will contain all elements in min order
      result.push(this.remove());
    }
    return result;
  }
}

var myHeap = new MinHeap();
myHeap.insert(3);
