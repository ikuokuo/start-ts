import validator from "./2_ZipCodeValidator";

let myValidator = new validator();


import validate from "./2_StaticZipCodeValidator";

let strings = ["Hello", "98052", "101"];

// Use function validate
strings.forEach(s => {
  console.log(`"${s}" ${validate(s) ? "matches" : "does not match"}`);
});
