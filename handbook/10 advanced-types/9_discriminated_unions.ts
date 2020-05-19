// There are three ingredients:
// 1. Types that have a common, singleton type property — the discriminant.
// 2. A type alias that takes the union of those types — the union.
// 3. Type guards on the common property.

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

{
  type Shape = Square | Rectangle | Circle;

  function area(s: Shape) {
    switch (s.kind) {
      case "square": return s.size * s.size;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
    }
  }
}

interface Triangle {
  kind: "triangle";
}
type Shape = Square | Rectangle | Circle | Triangle;

// Exhaustiveness checking
{
  let area = function(s: Shape) {  // error: returns number | undefined
    switch (s.kind) {
      case "square": return s.size * s.size;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
    }
    // should error here - we didn't handle case "triangle"
  }
}
{
  // The first is to turn on --strictNullChecks and specify a return type:
  let area = function(s: Shape): number { // error: returns number | undefined
    switch (s.kind) {
      case "square": return s.size * s.size;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
    }
  }
}
{
  // The second method uses the never type that the compiler uses to check for exhaustiveness:
  function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
  }
  let area = function(s: Shape) {
    switch (s.kind) {
      case "square": return s.size * s.size;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
      case "triangle": return 0;
      default: return assertNever(s); // error here if there are missing cases
    }
  }
}
