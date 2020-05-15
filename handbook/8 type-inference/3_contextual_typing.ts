
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button);   //<- OK
  console.log(mouseEvent.kangaroo); //<- Error!
};

window.onscroll = function(uiEvent) {
  console.log(uiEvent.button); //<- Error!
}

// If this function were not in a contextually typed position, the function’s argument would implicitly have type any, and no error would be issued (unless you are using the --noImplicitAny option):
const handler = function(uiEvent) {
  console.log(uiEvent.button); //<- OK
}

// We can also explicitly give type information to the function’s argument to override any contextual type:
window.onscroll = function(uiEvent: any) {
  console.log(uiEvent.button);  //<- Now, no error is given
};

// The contextual type also acts as a candidate type in best common type. For example:
/*
function createZoo(): Animal[] {
  return [new Rhino(), new Elephant(), new Snake()];
}
*/
