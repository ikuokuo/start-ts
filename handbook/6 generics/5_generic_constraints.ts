{
  interface Lengthwise {
    length: number;
  }

  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
  }

  // loggingIdentity(3);  // Error, number doesn't have a .length property
  loggingIdentity({length: 10, value: 3});
}

// Using Type Parameters in Generic Constraints
{
  function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  let x = { a: 1, b: 2, c: 3, d: 4 };

  getProperty(x, "a"); // okay
  // getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
}

// Using Class Types in Generics
{
  function create<T>(c: {new(): T; }): T {
    return new c();
  }
}
{
  class BeeKeeper {
    hasMask: boolean;
  }

  class ZooKeeper {
    nametag: string;
  }

  class Animal {
    numLegs: number;
  }

  class Bee extends Animal {
    keeper: BeeKeeper;
  }

  class Lion extends Animal {
    keeper: ZooKeeper;
  }

  function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
  }

  createInstance(Lion).keeper.nametag;  // typechecks!
  createInstance(Bee).keeper.hasMask;   // typechecks!
}
