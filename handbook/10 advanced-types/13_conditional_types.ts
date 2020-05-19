{
  // T extends U ? X : Y

  let f: <T extends boolean>(x: T) => T extends true ? string : number;

  // Type is 'string | number'
  let x = f(Math.random() < 0.5);
}
type TypeName<T> =
T extends string ? "string" :
T extends number ? "number" :
T extends boolean ? "boolean" :
T extends undefined ? "undefined" :
T extends Function ? "function" :
"object";
{
  type T0 = TypeName<string>;  // "string"
  type T1 = TypeName<"a">;  // "string"
  type T2 = TypeName<true>;  // "boolean"
  type T3 = TypeName<() => void>;  // "function"
  type T4 = TypeName<string[]>;  // "object"
}
// But as an example of a place where conditional types are deferred - where they stick around instead of picking a branch - would be in the following:
{
  interface Foo {
    propA: boolean;
    propB: boolean;
  }

  let f: <T>(x: T) => T extends Foo ? string : number;

  let foo = function<U>(x: U) {
    // Has type 'U extends Foo ? string : number'
    let a = f(x);

    // This assignment is allowed though!
    let b: string | number = a;
  }
}

// Distributive conditional types
{
  // Conditional types in which the checked type is a naked type parameter are called distributive conditional types.

  type T10 = TypeName<string | (() => void)>;  // "string" | "function"
  type T12 = TypeName<string | string[] | undefined>;  // "string" | "object" | "undefined"
  type T11 = TypeName<string[] | number[]>;  // "object"
}
{
  type BoxedValue<T> = { value: T };
  type BoxedArray<T> = { array: T[] };
  type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;

  type T20 = Boxed<string>;  // BoxedValue<string>;
  type T21 = Boxed<number[]>;  // BoxedArray<number>;
  type T22 = Boxed<string | number[]>;  // BoxedValue<string> | BoxedArray<number>;
}
{
  // The distributive property of conditional types can conveniently be used to filter union types:

  type Diff<T, U> = T extends U ? never : T;  // Remove types from T that are assignable to U
  type Filter<T, U> = T extends U ? T : never;  // Remove types from T that are not assignable to U

  type T30 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
  type T31 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
  type T32 = Diff<string | number | (() => void), Function>;  // string | number
  type T33 = Filter<string | number | (() => void), Function>;  // () => void

  type NonNullable<T> = Diff<T, null | undefined>;  // Remove null and undefined from T

  type T34 = NonNullable<string | number | undefined>;  // string | number
  type T35 = NonNullable<string | string[] | null | undefined>;  // string | string[]

  function f1<T>(x: T, y: NonNullable<T>) {
    x = y;  // Ok
    // y = x;  // Error
  }

  function f2<T extends string | undefined>(x: T, y: NonNullable<T>) {
    x = y;  // Ok
    // y = x;  // Error
    // let s1: string = x;  // Error
    let s2: string = y;  // Ok
  }
}
{
  // Conditional types are particularly useful when combined with mapped types:

  type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
  type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

  type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
  type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

  interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(newName: string): void;
  }

  type T40 = FunctionPropertyNames<Part>;  // "updatePart"
  type T41 = NonFunctionPropertyNames<Part>;  // "id" | "name" | "subparts"
  type T42 = FunctionProperties<Part>;  // { updatePart(newName: string): void }
  type T43 = NonFunctionProperties<Part>;  // { id: number, name: string, subparts: Part[] }
}
{
  // Similar to union and intersection types, conditional types are not permitted to reference themselves recursively.

  // type ElementType<T> = T extends any[] ? ElementType<T[number]> : T;  // Error
}

// Type inference in conditional types
{
  type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
}
{
  type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;

  type T0 = Unpacked<string>;  // string
  type T1 = Unpacked<string[]>;  // string
  type T2 = Unpacked<() => string>;  // string
  type T3 = Unpacked<Promise<string>>;  // string
  type T4 = Unpacked<Promise<string>[]>;  // Promise<string>
  type T5 = Unpacked<Unpacked<Promise<string>[]>>;  // string
}
{
  type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
  type T10 = Foo<{ a: string, b: string }>;  // string
  type T11 = Foo<{ a: string, b: number }>;  // string | number
}
{
  type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
  type T20 = Bar<{ a: (x: string) => void, b: (x: string) => void }>;  // string
  type T21 = Bar<{ a: (x: string) => void, b: (x: number) => void }>;  // string & number
}
{
  function foo(x: string): number;
  function foo(x: number): string;
  function foo(x: string | number): string | number {
    return null;
  }
  type T30 = ReturnType<typeof foo>;  // string | number
}
{
  // It is not possible to use infer declarations in constraint clauses for regular type parameters:
  // type ReturnType<T extends (...args: any[]) => infer R> = R;  // Error, not supported
}
{
  // However, much the same effect can be obtained by erasing the type variables in the constraint and instead specifying a conditional type:
  type AnyFunction = (...args: any[]) => any;
  type ReturnType<T extends AnyFunction> = T extends (...args: any[]) => infer R ? R : any;
}

// Predefined conditional types
// * Exclude<T, U> – Exclude from T those types that are assignable to U.
// * Extract<T, U> – Extract from T those types that are assignable to U.
// * NonNullable<T> – Exclude null and undefined from T.
// * ReturnType<T> – Obtain the return type of a function type.
// * InstanceType<T> – Obtain the instance type of a constructor function type.
{
  type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
  type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

  type T02 = Exclude<string | number | (() => void), Function>;  // string | number
  type T03 = Extract<string | number | (() => void), Function>;  // () => void

  type T04 = NonNullable<string | number | undefined>;  // string | number
  type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

  let f1 = function(s: string) {
    return { a: 1, b: s };
  }

  class C {
    x = 0;
    y = 0;
  }

  type T10 = ReturnType<() => string>;  // string
  type T11 = ReturnType<(s: string) => void>;  // void
  type T12 = ReturnType<(<T>() => T)>;  // {}
  type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
  type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
  type T15 = ReturnType<any>;  // any
  type T16 = ReturnType<never>;  // never
  // type T17 = ReturnType<string>;  // Error
  // type T18 = ReturnType<Function>;  // Error

  type T20 = InstanceType<typeof C>;  // C
  type T21 = InstanceType<any>;  // any
  type T22 = InstanceType<never>;  // never
  // type T23 = InstanceType<string>;  // Error
  // type T24 = InstanceType<Function>;  // Error
}
