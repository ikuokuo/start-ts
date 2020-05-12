{
  function identity<T>(arg: T): T {
    return arg;
  }

  let myIdentity: <T>(arg: T) => T = identity;

  // use a different name for the generic type parameter
  let myIdentity2: <U>(arg: U) => U = identity;

  // as a call signature of an object literal type
  let myIdentity3: {<T>(arg: T): T} = identity;
}

{
  interface GenericIdentityFn {
    <T>(arg: T): T;
  }

  let identity = function<T>(arg: T): T {
    return arg;
  }

  let myIdentity: GenericIdentityFn = identity;
}
{
  interface GenericIdentityFn<T> {
    (arg: T): T;
  }

  let identity = function<T>(arg: T): T {
    return arg;
  }

  let myIdentity: GenericIdentityFn<number> = identity;
}

