'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @name getDisplayName
 * @description Returns the display name of a React component. Falls back to 'Component'.
 * @param {ReactClass | ReactFunctionalComponent} Component 
 */

var getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

exports.default = getDisplayName;

//# sourceMappingURL=getDisplayName.js.map