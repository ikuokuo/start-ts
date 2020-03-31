// make TS=handbook/typescript-in-5-minutes/1_greeter.ts

function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Jane User";
// let user = [0, 1, 2];

document.body.textContent = greeter(user);
