// The basic rule for TypeScript’s structural type system is that x is compatible with y if y has at least the same members as x. For example:
{
  interface Named {
    name: string;
  }

  let x: Named;
  // y's inferred type is { name: string; location: string; }
  let y = { name: "Alice", location: "Seattle" };
  x = y;

  function greet(n: Named) {
    console.log("Hello, " + n.name);
  }
  greet(y); // OK
}
