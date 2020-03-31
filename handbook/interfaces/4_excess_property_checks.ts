{
  interface SquareConfig {
    color?: string;
    width?: number;
  }

  function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
    return {color: "white", area: 100};
  }

  // error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
  // let mySquare = createSquare({ colour: "red", width: 100 });

  // Getting around these checks is actually really simple. The easiest method is to just use a type assertion:
  let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
}

{
  // However, a better approach might be to add a string index signature if you’re sure that the object can have some extra properties that are used in some special way.
  interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
  }

  // fail if not have any common property
  // let squareOptions = { colour: "red" };

  // must have a common property
  let squareOptions = { colour: "red", width: 100 };
  let mySquare = createSquare(squareOptions);
}
