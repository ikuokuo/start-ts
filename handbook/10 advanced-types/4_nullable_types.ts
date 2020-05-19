// make TS=handbook/10\ advanced-types/4_nullable_types.ts TSC_OPTIONS="-t ES2015 --strictNullChecks"

// The --strictNullChecks flag fixes this: when you declare a variable, it doesn’t automatically include null or undefined. You can include them explicitly using a union type:
{
  let s = "foo";
  // s = null; // error, 'null' is not assignable to 'string'
  let sn: string | null = "bar";
  sn = null; // ok

  // sn = undefined; // error, 'undefined' is not assignable to 'string | null'
}
// From TypeScript 3.7 and onwards, you can use optional chaining to simplify working with nullable types.

// Optional parameters and properties
{
  let f = function(x: number, y?: number) {
    return x + (y || 0);
  }
  f(1, 2);
  f(1);
  f(1, undefined);
  // f(1, null); // error, 'null' is not assignable to 'number | undefined'
}
{
  class C {
    a: number;
    b?: number;
  }
  let c = new C();
  c.a = 12;
  // c.a = undefined; // error, 'undefined' is not assignable to 'number'
  c.b = 13;
  c.b = undefined; // ok
  // c.b = null; // error, 'null' is not assignable to 'number | undefined'
}

// Type guards and type assertions
{
  let f = function(sn: string | null): string {
    if (sn == null) {
      return "default";
    } else {
      return sn;
    }
  }

  f = function(sn: string | null): string {
    return sn || "default";
  }
}
{
  // The syntax is postfix !: identifier! removes null and undefined from the type of identifier:
  function broken(name: string | null): string {
    function postfix(epithet: string) {
      // return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
      return name!.charAt(0) + '.  the ' + epithet;
    }
    name = name || "Bob";
    return postfix("great");
  }

  function fixed(name: string | null): string {
    function postfix(epithet: string) {
      return name!.charAt(0) + '.  the ' + epithet; // ok
    }
    name = name || "Bob";
    return postfix("great");
  }
}
