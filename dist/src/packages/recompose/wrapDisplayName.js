'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name wrapDisplayName
 * @description Returns a wrapped version of a React component's display name. For instance, if the display name of component is 'Post', and wrapperName is 'mapProps', the return value is 'mapProps(Post)'. Most Recompose higher-order components use wrapDisplayName().
 * @param {ReactClass | ReactFunctionalComponent} BaseComponent
 * @param {string} hocName
 */

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + '(' + (0, _getDisplayName2.default)(BaseComponent) + ')';
};

exports.default = wrapDisplayName;

//# sourceMappingURL=wrapDisplayName.js.map