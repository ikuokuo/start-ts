// When comparing two objects of a class type, only members of the instance are compared. Static members and constructors do not affect compatibility.
{
  class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { }
  }

  class Size {
    feet: number;
    constructor(numFeet: number) { }
  }

  let a: Animal;
  let s: Size;

  a = s;  // OK
  s = a;  // OK
}

// Private and protected members in classes
