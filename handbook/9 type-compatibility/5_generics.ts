{
  interface Empty<T> {
  }
  let x: Empty<number>;
  let y: Empty<string>;

  x = y;  // OK, because y matches structure of x
}

{
  interface NotEmpty<T> {
    data: T;
  }
  let x: NotEmpty<number>;
  let y: NotEmpty<string>;

  // x = y;  // Error, because x and y are not compatible
}

// For generic types that do not have their type arguments specified, compatibility is checked by specifying any in place of all unspecified type arguments.
{
  let identity = function<T>(x: T): T {
    return x;
  }

  let reverse = function<U>(y: U): U {
    return y;
  }

  identity = reverse;  // OK, because (x: any) => any matches (y: any) => any
}
