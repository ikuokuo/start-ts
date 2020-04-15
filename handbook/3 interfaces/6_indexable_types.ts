{
  // index signature
  interface StringArray {
    [index: number]: string;
  }
  // There are two types of supported index signatures: string and number.

  let myArray: StringArray;
  myArray = ["Bob", "Fred"];

  let myStr: string = myArray[0];
}
{
  class Animal {
    name: string;
  }
  class Dog extends Animal {
    breed: string;
  }

  // It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer.
  interface Okay {
    [x: string]: Animal;
    [x: number]: Dog;
  }
}
{
  interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    // name: string;      // error, the type of 'name' is not a subtype of the indexer
  }

  interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number;    // ok, length is a number
    name: string;      // ok, name is a string
  }
}
{
  // readonly
  interface ReadonlyStringArray {
    readonly [index: number]: string;
  }
  let myArray: ReadonlyStringArray = ["Alice", "Bob"];
  // myArray[2] = "Mallory"; // error!
}
