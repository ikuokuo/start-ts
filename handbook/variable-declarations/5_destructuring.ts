// Array destructuring

{
  let input = [1, 2];
  let [first, second] = input;
  console.log(first); // outputs 1
  console.log(second); // outputs 2

  // swap variables
  [first, second] = [second, first];

  function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
  }
  f([1, 2]);
}
// ... for the remaining items
{
  let [first, ...rest] = [1, 2, 3, 4];
  console.log(first); // outputs 1
  console.log(rest); // outputs [ 2, 3, 4 ]
}
// ignore elements
{
  let [first] = [1, 2, 3, 4];
  console.log(first); // outputs 1

  let [, second, , fourth] = [1, 2, 3, 4];
  console.log(second); // outputs 2
  console.log(fourth); // outputs 4
}

// Tuple destructuring

let tuple: [number, string, boolean] = [7, "hello", true];
{
  let [a, b, c] = tuple; // a: number, b: string, c: boolean
  // let [a, b, c, d] = tuple; // Error, no element at index 3
}
// ... for the rest of the tuple
{
  let [a, ...bc] = tuple; // bc: [string, boolean]
}
{
  let [a, b, c, ...d] = tuple; // d: [], the empty tuple
}
// ignore elements
{
  let [a] = tuple; // a: number
  let [, b] = tuple; // b: string
}

// Object destructuring

let o = {
  a: "foo",
  b: 12,
  c: "bar"
};
{
  let { a, b } = o;

  ({ a, b } = { a: "baz", b: 101 });
  // Notice that we had to surround this statement with parentheses.
  // JavaScript normally parses a { as the start of block.
}
// ... for the remaining items
{
  let { a, ...passthrough } = o;
  let total = passthrough.b + passthrough.c.length;
}
// property renaming
{
  let { a: newName1, b: newName2 } = o;

  console.log(newName1);
}
// indicate the type
{
  let { a, b }: { a: string, b: number } = o;
}
// default values
{
  function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
  }
}

// Function declarations

{
  type C = { a: string, b?: number }
  let f = function({ a, b }: C): void {
    // ...
  }
}
{
  let f = function({ a="", b=0 } = {}): void {
    // ...
  }
  f();
}
{
  let f = function({ a, b = 0 } = { a: "" }): void {
    // ...
  }
  f({ a: "yes" }); // ok, default b = 0
  f(); // ok, default to { a: "" }, which then defaults b = 0
  // f({}); // error, 'a' is required if you supply an argument
}

// Spread

// array spread
{
  let first = [1, 2];
  let second = [3, 4];
  let bothPlus = [0, ...first, ...second, 5];
}
// object spread
{
  let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
  let search = { ...defaults, food: "rich" };
  // properties that come later in the spread object overwrite properties that come earlier
}
{
  // First, it only includes an objects’ own, enumerable properties. Basically, that means you lose methods when you spread instances of an object:

  class C {
    p = 12;
    m() {
    }
  }
  let c = new C();
  let clone = { ...c };
  clone.p; // ok
  // clone.m(); // error!

  // Second, the TypeScript compiler doesn’t allow spreads of type parameters from generic functions. That feature is expected in future versions of the language.
}
