// Type compatibility in TypeScript is based on structural subtyping. Structural typing is a way of relating types based solely on their members.
{
  interface Named {
    name: string;
  }

  class Person {
    name: string;
  }

  let p: Named;
  // OK, because of structural typing
  p = new Person();
}

