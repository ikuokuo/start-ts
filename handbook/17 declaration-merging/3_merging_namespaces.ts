namespace Animals {
  export class Zebra { }
}

namespace Animals {
  export interface Legged { numberOfLegs: number; }
  export class Dog { }
}

/*
namespace Animals {
  export interface Legged { numberOfLegs: number; }

  export class Zebra { }
  export class Dog { }
}
*/

/*
namespace Animal {
  let haveMuscles = true;

  export function animalsHaveMuscles() {
    return haveMuscles;
  }
}

namespace Animal {
  export function doAnimalsHaveMuscles() {
    return haveMuscles;  // Error, because haveMuscles is not accessible here
  }
}
*/
