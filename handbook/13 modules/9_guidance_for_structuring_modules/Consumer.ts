import t from "./MyClass";
import f from "./MyFunc";
{
  let x = new t();
  console.log(f());
}

import { SomeType, someFunc } from "./MyThings";
{
  let x = new SomeType();
  let y = someFunc();
}

import * as myLargeModule from "./MyLargeModule.ts";
{
  let x = new myLargeModule.Dog();
}
