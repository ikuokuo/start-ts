{
  let identity = function<T>(arg: T): T {
    return arg;
  }

  let loggingIdentity = function<T>(arg: T): T {
    // console.log(arg.length);  // Error: T doesn't have .length
    return arg;
  }
}

{
  let loggingIdentity = function<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
  }
}

{
  let loggingIdentity = function<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
  }
}
