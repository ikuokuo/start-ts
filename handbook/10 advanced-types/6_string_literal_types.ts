{
  type Easing = "ease-in" | "ease-out" | "ease-in-out";
  class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
      if (easing === "ease-in") {
        // ...
      }
      else if (easing === "ease-out") {
      }
      else if (easing === "ease-in-out") {
      }
      else {
        // error! should not pass null or undefined.
      }
    }
  }

  let button = new UIElement();
  button.animate(0, 0, "ease-in");
  // button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
}

// String literal types can be used in the same way to distinguish overloads:
{
  interface Element {
  }

  function createElement(tagName: "img"): HTMLImageElement;
  function createElement(tagName: "input"): HTMLInputElement;
  // ... more overloads ...
  function createElement(tagName: string): Element {
    // ... code goes here ...
    return {};
  }
}
