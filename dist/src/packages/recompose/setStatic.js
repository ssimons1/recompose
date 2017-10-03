"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @name setStatic
 * @description Assigns a value to a static property on the base component. 
 * @param {string} key 
 * @param {any} value 
 */

var setStatic = function setStatic(key, value) {
  return function (BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */
    return BaseComponent;
  };
};

exports.default = setStatic;

//# sourceMappingURL=setStatic.js.map