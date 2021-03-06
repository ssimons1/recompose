'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createEagerFactory = require('./createEagerFactory');

var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * @name nest
 * @description Composes components by nesting each one inside the previous.
 * @param {array} Components 
 * @example
 *
 * // Given components A, B, and C
 * const ABC = nest(A, B, C)
 * <ABC pass="through">Child</ABC>
 * 
 * // Effectively the same as
 * <A pass="through">
 *   <B pass="through">
 *     <C pass="through">
 *       Child
 *     </C>
 *   </B>
 * </A>
 */

var nest = function nest() {
  for (var _len = arguments.length, Components = Array(_len), _key = 0; _key < _len; _key++) {
    Components[_key] = arguments[_key];
  }

  var factories = Components.map(_createEagerFactory2.default);
  var Nest = function Nest(_ref) {
    var props = _objectWithoutProperties(_ref, []),
        children = _ref.children;

    return factories.reduceRight(function (child, factory) {
      return factory(props, child);
    }, children);
  };

  if (process.env.NODE_ENV !== 'production') {
    var displayNames = Components.map(_getDisplayName2.default);
    Nest.displayName = 'nest(' + displayNames.join(', ') + ')';
  }

  return Nest;
};

exports.default = nest;

//# sourceMappingURL=nest.js.map