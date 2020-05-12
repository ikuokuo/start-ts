// Numeric enums
{
  enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
  }
}
{
  enum Response {
    No = 0,
    Yes = 1,
  }

  function respond(recipient: string, message: Response): void {
    // ...
  }

  respond("Princess Caroline", Response.Yes)
}

// String enums
{
  enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }
}

// Heterogeneous enums
{
  enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
  }
}

// Computed and constant members
{
  // All enum members in 'E1' and 'E2' are constant.

  enum E1 { X, Y, Z }

  enum E2 {
    A = 1, B, C
  }
}
{
  enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
  }
}

// Union enums and enum member types
{
  // enum members also become types as well

  enum ShapeKind {
    Circle,
    Square,
  }

  interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
  }

  interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
  }

  // let c: Circle = {
  //   kind: ShapeKind.Square, // Error! Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
  //   radius: 100,
  // }
}
{
  // enum types themselves effectively become a union of each enum member

  enum E {
    Foo,
    Bar,
  }

  /*
  function f(x: E) {
    if (x !== E.Foo || x !== E.Bar) {
      //               ~~~~~~~~~~~
      // Error! This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap.
    }
  }
  */
}

// Enums at runtime
{
  // Enums are real objects that exist at runtime

  enum E {
    X, Y, Z
  }

  function f(obj: { X: number }) {
    return obj.X;
  }

  // Works, since 'E' has a property named 'X' which is a number.
  f(E);
}

// Enums at compile time
{
  // Even though Enums are real objects that exist at runtime, the keyof keyword works differently than you might expect for typical objects. Instead, use keyof typeof to get a Type that represents all Enum keys as strings.

  enum LogLevel {
    ERROR, WARN, INFO, DEBUG
  }

  /**
   * This is equivalent to:
   * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
   */
  type LogLevelStrings = keyof typeof LogLevel;

  function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
      console.log('Log level key is: ', key);
      console.log('Log level value is: ', num);
      console.log('Log level message is: ', message);
    }
  }
  printImportant('ERROR', 'This is a message');
}
// Reverse mappings
{
  enum Enum {
    A
  }
  let a = Enum.A;
  let nameOfA = Enum[a]; // "A"

  // Keep in mind that string enum members do not get a reverse mapping generated at all.
}
// const enums
{
  const enum Enum {
    A = 1,
    B = A * 2
  }

  // Const enums can only use constant enum expressions and unlike regular enums they are completely removed during compilation.

  const enum Directions {
    Up,
    Down,
    Left,
    Right
  }

  let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
}

// Ambient enums
{
  /*
  declare enum Enum {
    A = 1,
    B,
    C = 2
  }
  */
}
