import preact = require("preact");
/* @jsx preact.h */
const x = <div />;

// emits as:

const preact = require("preact");
const x = preact.h("div", null);
