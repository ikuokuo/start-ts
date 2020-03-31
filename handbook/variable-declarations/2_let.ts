let hello = "Hello!";

// Block-scoping

{
  function f(input: boolean) {
    let a = 100;

    if (input) {
      // Still okay to reference 'a'
      let b = a + 1;
      return b;
    }

    // Error: 'b' doesn't exist here
    // return b;
  }
}

{
  try {
    throw "oh no!";
  } catch (e) {
    console.log("Oh well.");
  }

  // Error: 'e' doesn't exist here
  // console.log(e);
}

{
  // a++; // illegal to use 'a' before it's declared;
  // let a;
}

{
  function foo() {
    // okay to capture 'a'
    return a;
  }

  // illegal call 'foo' before 'a' is declared
  // runtimes should throw an error here
  foo();

  let a;
}

// Re-declarations and Shadowing

{
  let x = 10;
  // let x = 20; // error: can't re-declare 'x' in the same scope
}

{
  let f = function(x) {
    // let x = 100; // error: interferes with parameter declaration
  }

  let g = function() {
    let x = 100;
    // var x = 100; // error: can't have both declarations of 'x'
  }
}

{
  let f = function(condition, x) {
    if (condition) {
      let x = 100;
      return x;
    }
    return x;
  }

  f(false, 0); // returns '0'
  f(true, 0);  // returns '100'
}

{
  // Shadowing should usually be avoided
  function sumMatrix(matrix: number[][]) { // perform correctly
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
      var currentRow = matrix[i];
      for (let i = 0; i < currentRow.length; i++) { // shadows i
        sum += currentRow[i];
      }
    }
    return sum;
  }
}

// Block-scoped variable capturing

function theCityThatAlwaysSleeps() {
  let getCity;

  if (true) {
    let city = "Seattle";
    getCity = function() {
      return city;
    }
  }

  return getCity();
}

{
  for (let i = 0; i < 10 ; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
  }
}
