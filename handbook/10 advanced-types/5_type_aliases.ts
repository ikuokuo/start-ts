{
  type Name = string;
  type NameResolver = () => string;
  type NameOrResolver = Name | NameResolver;
  function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
      return n;
    }
    else {
      return n();
    }
  }
}

{
  type Container<T> = { value: T };

  type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
  }
}

{
  type LinkedList<T> = T & { next: LinkedList<T> };

  interface Person {
    name: string;
  }

  var people: LinkedList<Person>;
  var s = people.name;
  var s = people.next.name;
  var s = people.next.next.name;
  var s = people.next.next.next.name;

  // type Yikes = Array<Yikes>; // error
}

// Interfaces vs. Type Aliases
{
  // One difference is that interfaces create a new name that is used everywhere. Type aliases don’t create a new name — for instance, error messages won’t use the alias name.
  type Alias = { num: number }
  interface Interface {
      num: number;
  }
  // declare function aliased(arg: Alias): Alias;
  // declare function interfaced(arg: Interface): Interface;

  // type Cat = Animal & { purrs: true }

  // On the other hand, if you can’t express some shape with an interface and you need to use a union or tuple type, type aliases are usually the way to go.
}
