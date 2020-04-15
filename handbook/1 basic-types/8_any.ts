{
  let notSure: any = 4;
  notSure = "maybe a string instead";
  notSure = false; // okay, definitely a boolean
}
// call arbitrary methods
{
  let notSure: any = 4;
  notSure.ifItExists(); // okay, ifItExists might exist at runtime
  notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

  let prettySure: Object = 4;
  // prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
}
{
  let list: any[] = [1, true, "free"];

  list[1] = 100;
}
