{
  let x = [0, 1, null]; // number
}

class Animal {
}
class Rhino extends Animal {
}
class Elephant extends Animal {
}
class Snake extends Animal {
}

{
  let zoo = [new Rhino(), new Elephant(), new Snake()]; // (Rhino | Elephant | Snake)[]
}

{
  let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()]; // Animal[]
}
