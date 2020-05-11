// Public by default
{
  class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }
}

// ECMAScript Private Fields
{
  class Animal {
    #name: string;
    constructor(theName: string) { this.#name = theName; }
  }

  // new Animal("Cat").#name; // Property '#name' is not accessible outside class 'Animal' because it has a private identifier.
}

// Understanding TypeScript’s private
{
  class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
  }

  // new Animal("Cat").name; // Error: 'name' is private;
}
{
  class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
  }

  class Rhino extends Animal {
    constructor() { super("Rhino"); }
  }

  class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
  }

  let animal = new Animal("Goat");
  let rhino = new Rhino();
  let employee = new Employee("Bob");

  animal = rhino;
  // animal = employee; // Error: 'Animal' and 'Employee' are not compatible
}

// Understanding protected
{
  class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
  }

  class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  let howard = new Employee("Howard", "Sales");
  console.log(howard.getElevatorPitch());
  // console.log(howard.name); // error
}
{
  // A constructor may also be marked protected. This means that the class cannot be instantiated outside of its containing class, but can be extended.

  class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
  }

  // Employee can extend Person
  class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  let howard = new Employee("Howard", "Sales");
  // let john = new Person("John"); // Error: The 'Person' constructor is protected
}
