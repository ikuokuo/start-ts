{
  function identity<T>(arg: T): T {
    return arg;
  }

  let output = identity<string>("myString");  // type of output will be 'string'

  let output2 = identity("myString");  // type of output will be 'string'
}
