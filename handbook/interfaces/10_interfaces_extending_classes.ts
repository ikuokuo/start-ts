// When an interface type extends a class type it inherits the members of the class but not their implementations.
{
  class Control {
    private state: any;
  }

  interface SelectableControl extends Control {
    select(): void;
  }

  class Button extends Control implements SelectableControl {
    select() { }
  }

  class TextBox extends Control {
    select() { }
  }

  // Error: Property 'state' is missing in type 'Image'.
  // class Image implements SelectableControl {
  //   private state: any;
  //   select() { }
  // }

  class Location {
  }
}
