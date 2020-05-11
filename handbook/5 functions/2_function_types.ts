// Typing the function
{
  function add(x: number, y: number): number {
    return x + y;
  }

  let myAdd = function(x: number, y: number): number { return x + y; };
}

// Writing the function type
{
  let myAdd: (x: number, y: number) => number =
      function(x: number, y: number): number { return x + y; };
}
{
  let myAdd: (baseValue: number, increment: number) => number =
      function(x: number, y: number): number { return x + y; };
}

// Inferring the types
{
  // myAdd has the full function type
  let myAdd = function(x: number, y: number): number { return  x + y; };
}
{
  // The parameters 'x' and 'y' have the type number
  let myAdd: (baseValue: number, increment: number) => number =
      function(x, y) { return x + y; };
}
