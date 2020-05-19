// for..of statements

{
  let someArray = [1, "string", false];

  for (let entry of someArray) {
    console.log(entry); // 1, "string", false
  }
}

// for..of vs. for..in statements

{
  let list = [4, 5, 6];

  // returns a list of keys
  for (let i in list) {
    console.log(i); // "0", "1", "2",
  }

  // returns a list of values
  for (let i of list) {
    console.log(i); // "4", "5", "6"
  }
}
{
  let pets = new Set(["Cat", "Dog", "Hamster"]);
  pets["species"] = "mammals";

  for (let pet in pets) {
    console.log(pet); // "species"
  }

  for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
  }
}

// Code generation

// Targeting ES5 and ES3
{
  // When targeting an ES5 or ES3-compliant engine, iterators are only allowed on values of Array type.
}
// Targeting ECMAScript 2015 and higher
{
  // When targeting an ECMAScipt 2015-compliant engine, the compiler will generate for..of loops to target the built-in iterator implementation in the engine.
}
