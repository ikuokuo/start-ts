{
  /**
   * Takes a string and adds "padding" to the left.
   * If 'padding' is a string, then 'padding' is appended to the left side.
   * If 'padding' is a number, then that number of spaces is added to the left side.
   */
  function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  }

  padLeft("Hello world", 4); // returns "    Hello world"

  let indentedString = padLeft("Hello world", true); // passes at compile time, fails at runtime.
}
{
  /**
   * Takes a string and adds "padding" to the left.
   * If 'padding' is a string, then 'padding' is appended to the left side.
   * If 'padding' is a number, then that number of spaces is added to the left side.
   */
  let padLeft = function(value: string, padding: string | number) {
    // ...
  }

  // let indentedString = padLeft("Hello world", true); // errors during compilation
}

// If we have a value that has a union type, we can only access members that are common to all types in the union.
{
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
  pet.layEggs(); // okay
  // pet.swim();    // errors
}
