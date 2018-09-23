// think of a stack of books
// the book placed last is the first one you remove
// last in, first out
// another exmaple is browser's back button... stacks most recent sites visited on top
//
// functions: push, pop, peek, length
// arrays in JS works as a stack

// program to test if word is palindrome using stack

var letters = []; // this is our stack

var word = "racecar";

var rword = "";

// put letters of word into stack
for (var i = 0; i < word.length; i++) {
  letters.push(word[i]); // :push puts elements on top of the stack
}

// pop off the stack in reverse order
for (var i = 0; i< word.length; i++) {
  rword += letters.pop(); // :pop takes off elements from top (end) of stack (array)
}

if (rword === word) {
  console.log(word + " is a palindrome.");
} else {
  console.log(word + " is not a palindrome.");
}
