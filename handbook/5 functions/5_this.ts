// this and arrow functions
{
  let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
      return function() {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);

        return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
    }
  }

  let cardPicker = deck.createCardPicker();
  // 'this' will be set to window/undefined instead of our deck object
  let pickedCard = cardPicker();

  alert("card: " + pickedCard.card + " of " + pickedCard.suit);
}
{
  let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
      // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);

        return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
    }
  }

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();

  alert("card: " + pickedCard.card + " of " + pickedCard.suit);
}
// make TS=handbook/5\ functions/5_this.ts TSC_OPTIONS="-t ES2015 --noImplicitThis"

// this parameters
{
  // Unfortunately, the type of this.suits[pickedSuit] is still any.
  // That’s because this comes from the function expression inside the object literal.
  // To fix this, you can provide an explicit this parameter.
  // this parameters are fake parameters that come first in the parameter list of a function:
  function f(this: void) {
    // make sure `this` is unusable in this standalone function
  }
}
{
  interface Card {
    suit: string;
    card: number;
  }
  interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
  }
  let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);

        return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
    }
  }

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();

  alert("card: " + pickedCard.card + " of " + pickedCard.suit);
}
// so --noImplicitThis will not cause any errors

// this parameters in callbacks
{
  interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
  }
  interface Event {
    message: string;
  }
  let uiElement: UIElement;

  class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
      // oops, used `this` here. using this callback would crash at runtime
      this.info = e.message;
    }
    onClickGood(this: void, e: Event) {
      // can't use `this` here because it's of type void!
      console.log('clicked!');
    }
  }

  let h = new Handler();
  // uiElement.addClickListener(h.onClickBad); // error!
  uiElement.addClickListener(h.onClickGood);
}
{
  interface Event {
    message: string;
  }

  // If you want this then you’ll have to use an arrow function:
  class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
  }
}
