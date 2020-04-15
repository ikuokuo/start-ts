// Type assertions are a way to tell the compiler “trust me, I know what I’m doing.”

// angle-bracket
{
  let someValue: any = "this is a string";

  let strLength: number = (<string>someValue).length;
}
// as
{
  let someValue: any = "this is a string";

  let strLength: number = (someValue as string).length;
}
