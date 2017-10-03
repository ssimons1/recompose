'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name hoistStatics
 * @description Augments a higher-order component so that when used, it copies non-react static properties from the base component to the new component. This is helpful when using Recompose with libraries like Relay.
 * Note that this only hoists non-react statics. The following static properties will not be hoisted: childContextTypes, contextTypes, defaultProps, displayName, getDefaultProps, mixins, propTypes, and type. The following native static methods will also be ignored: name, length, prototype, caller, arguments, and arity.
 * 
 */

var hoistStatics = function hoistStatics(higherOrderComponent) {
  return function (BaseComponent) {
    var NewComponent = higherOrderComponent(BaseComponent);
    (0, _hoistNonReactStatics2.default)(NewComponent, BaseComponent);
    return NewComponent;
  };
};

exports.default = hoistStatics;

//# sourceMappingURL=hoistStatics.js.map