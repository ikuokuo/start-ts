{
  interface PersonPartial {
    name?: string;
    age?: number;
  }

  interface PersonReadonly {
    readonly name: string;
    readonly age: number;
  }
}

interface Person {
  name: string;
  age: number;
}

{
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  }
  type Partial<T> = {
    [P in keyof T]?: T[P];
  }

  type PersonPartial = Partial<Person>;
  type ReadonlyPerson = Readonly<Person>;
}

// If you want to add members, you can use an intersection type:
{
  // Use this:
  type PartialWithNewMember<T> = {
    [P in keyof T]?: T[P];
  } & { newMember: boolean }

  /*
  // **Do not** use the following!
  // This is an error!
  type PartialWithNewMember<T> = {
    [P in keyof T]?: T[P];
    newMember: boolean;
  }
  */
}

{
  type Keys = 'option1' | 'option2';
  type Flags = { [K in Keys]: boolean };
  /*
  type Flags = {
    option1: boolean;
    option2: boolean;
  }
  */
}

{
  type NullablePerson = { [P in keyof Person]: Person[P] | null }
  type PartialPerson = { [P in keyof Person]?: Person[P] }
}

// Here’s one more example, in which T[P] is wrapped in a Proxy<T> class:
{
  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  }
  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  }
  /*
  function proxify<T>(o: T): Proxify<T> {
    // ... wrap proxies ...
  }
  let proxyProps = proxify(props);
  */
}

// Note that Readonly<T> and Partial<T> are so useful, they are included in TypeScript’s standard library along with Pick and Record:
{
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  }
  type Record<K extends keyof any, T> = {
      [P in K]: T;
  }
}
{
  // Readonly, Partial and Pick are homomorphic whereas Record is not.
  type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
}

// Inference from mapped types
{
  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  }
  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  }

  function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
      result[k] = t[k].get();
    }
    return result;
  }

  // let originalProps = unproxify(proxyProps);
}
