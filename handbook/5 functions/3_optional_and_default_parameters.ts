{
  function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
  }

  // let result1 = buildName("Bob");                  // error, too few parameters
  // let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result3 = buildName("Bob", "Adams");         // ah, just right
}

{
  let buildName = function(firstName: string, lastName?: string) {
    if (lastName)
      return firstName + " " + lastName;
    else
      return firstName;
  }

  let result1 = buildName("Bob");                  // works correctly now
  // let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result3 = buildName("Bob", "Adams");         // ah, just right
}

{
  let buildName = function(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
  }

  let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
  let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
  // let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result4 = buildName("Bob", "Adams");         // ah, just right
}

// optional parameters and trailing default parameters will share commonality in their types
{
  let buildNameType: (firstName: string, lastName?: string) => string
}

{
  let buildName = function(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
  }

  // let result1 = buildName("Bob");                  // error, too few parameters
  // let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
  let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
}
