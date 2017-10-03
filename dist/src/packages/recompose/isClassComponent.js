'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @name isClassComponent
 * @description Returns true if the given value is a React component class.
 * @param {any} Component 
 */

var isClassComponent = function isClassComponent(Component) {
  return Boolean(Component && Component.prototype && typeof Component.prototype.render === 'function');
};

exports.default = isClassComponent;

//# sourceMappingURL=isClassComponent.js.map