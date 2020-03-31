// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
// x = [10, "hello"]; // Error

console.log(x[0].substring(1)); // OK
// console.log(x[1].substring(1)); // Error, 'number' does not have 'substring'

// x[3] = "world"; // Error, Property '3' does not exist on type '[string, number]'.
// console.log(x[5].toString()); // Error, Property '5' does not exist on type '[string, number]'.
