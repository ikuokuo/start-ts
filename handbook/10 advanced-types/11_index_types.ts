{
  function pluck(o, propertyNames) {
    return propertyNames.map(n => o[n]);
  }
}

interface Car {
  manufacturer: string;
  model: string;
  year: number;
}
let taxi: Car = {
  manufacturer: 'Toyota',
  model: 'Camry',
  year: 2014
};

{
  let pluck = function<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map(n => o[n]);
  }

  // Manufacturer and model are both of type string,
  // so we can pluck them both into a typed string array
  let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);

  // If we try to pluck model and year, we get an
  // array of a union type: (string | number)[]
  let modelYear = pluck(taxi, ['model', 'year'])
}
{
  let carProps: keyof Car; // the union of ('manufacturer' | 'model' | 'year')

  // error, 'unknown' is not in 'manufacturer' | 'model' | 'year'
  // pluck(taxi, ['year', 'unknown']);
}
{
  function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
  }

  let name: string = getProperty(taxi, 'manufacturer');
  let year: number = getProperty(taxi, 'year');

  // error, 'unknown' is not in 'manufacturer' | 'model' | 'year'
  // let unknown = getProperty(taxi, 'unknown');
}

// Index types and index signatures
{
  // keyof and T[K] interact with index signatures. An index signature parameter type must be ‘string’ or ‘number’.

  interface Dictionary<T> {
    [key: string]: T;
  }
  let keys: keyof Dictionary<number>; // string | number
  let value: Dictionary<number>['foo']; // number
}
{
  // If you have a type with a number index signature, keyof T will just be number.
  interface Dictionary<T> {
    [key: number]: T;
  }
  let keys: keyof Dictionary<number>; // number
  // let value: Dictionary<number>['foo']; // Error, Property 'foo' does not exist on type 'Dictionary<number>'.
  let value: Dictionary<number>[42]; // number
}
