"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;
/**
 * @name compose
 * @description Use to compose multiple higher-order components into a single higher-order component. This works exactly like the function of the same name in Redux, or lodash's [flowRight()](https://bitsrc.io/lodash/lodash/component/flow-right).
 * @param {array} funcs 
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

//# sourceMappingURL=compose.js.map