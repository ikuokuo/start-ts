interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  return null;
}

let pet = getSmallPet();

{
  // Each of these property accesses will cause an error
  /*
  if (pet.swim) {
    pet.swim();
  }
  else if (pet.fly) {
    pet.fly();
  }
  */

  if ((pet as Fish).swim) {
    (pet as Fish).swim();
  } else if ((pet as Bird).fly) {
    (pet as Bird).fly();
  }
}

// User-Defined Type Guards
{ // Using type predicates
  function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }

  // Both calls to 'swim' and 'fly' are now okay.
  if (isFish(pet)) {
    pet.swim();
  }
  else {
    pet.fly();
  }
}
{ // Using the in operator
  function move(pet: Fish | Bird) {
    if ("swim" in pet) {
      return pet.swim();
    }
    return pet.fly();
  }
}

// typeof type guards
{
  function isNumber(x: any): x is number {
    return typeof x === "number";
  }

  function isString(x: any): x is string {
    return typeof x === "string";
  }

  let padLeft;
  padLeft = function(value: string, padding: string | number) {
    if (isNumber(padding)) {
      return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  }

  padLeft = function(value: string, padding: string | number) {
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  }
  // These typeof type guards are recognized in two different forms: typeof v === "typename" and typeof v !== "typename", where "typename" must be "number", "string", "boolean", or "symbol".
}

// instanceof type guards
{
  // instanceof type guards are a way of narrowing types using their constructor function. For instance, let’s borrow our industrial string-padder example from earlier:

  interface Padder {
    getPaddingString(): string
  }

  class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
      return Array(this.numSpaces + 1).join(" ");
    }
  }

  class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
      return this.value;
    }
  }

  function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
  }

  // Type is 'SpaceRepeatingPadder | StringPadder'
  let padder: Padder = getRandomPadder();

  if (padder instanceof SpaceRepeatingPadder) {
    padder; // type narrowed to 'SpaceRepeatingPadder'
  }
  if (padder instanceof StringPadder) {
    padder; // type narrowed to 'StringPadder'
  }

  // The right side of the instanceof needs to be a constructor function, and TypeScript will narrow down to:
  //   1. the type of the function’s prototype property if its type is not any
  //   2. the union of types returned by that type’s construct signatures
  // in that order.
}
