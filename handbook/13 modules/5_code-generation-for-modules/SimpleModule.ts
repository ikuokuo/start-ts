/*
import m = require("mod");
export let t = m.something + 1;


// AMD / RequireJS SimpleModule.js

define(["require", "exports", "./mod"], function (require, exports, mod_1) {
  exports.t = mod_1.something + 1;
});

// CommonJS / Node SimpleModule.js

var mod_1 = require("./mod");
exports.t = mod_1.something + 1;

// UMD SimpleModule.js

(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports); if (v !== undefined) module.exports = v;
  }
  else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./mod"], factory);
  }
})(function (require, exports) {
  var mod_1 = require("./mod");
  exports.t = mod_1.something + 1;
});

// System SimpleModule.js

System.register(["./mod"], function(exports_1) {
  var mod_1;
  var t;
  return {
    setters:[
      function (mod_1_1) {
        mod_1 = mod_1_1;
      }],
    execute: function() {
      exports_1("t", t = mod_1.something + 1);
    }
  }
});

// Native ECMAScript 2015 modules SimpleModule.js

import { something } from "./mod";
export var t = something + 1;
*/
