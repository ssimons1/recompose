'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setDisplayName = require('./setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = require('./wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _createEagerFactory = require('./createEagerFactory');

var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name branch
 * @description Accepts a test function and two higher-order components. The test function is passed the props from the owner. If it returns true, the left higher-order component is applied to BaseComponent; otherwise, the right higher-order component is applied. If the right is not supplied, it will by default render the wrapped component.
 * @param {function} test
 * @param {HigherOrderComponent} left
 * @param {HigherOrderComponent} right
 *  
 */

var identity = function identity(Component) {
  return Component;
};

var branch = function branch(test, left) {
  var right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : identity;
  return function (BaseComponent) {
    var leftFactory = void 0;
    var rightFactory = void 0;
    var Branch = function Branch(props) {
      if (test(props)) {
        leftFactory = leftFactory || (0, _createEagerFactory2.default)(left(BaseComponent));
        return leftFactory(props);
      }
      rightFactory = rightFactory || (0, _createEagerFactory2.default)(right(BaseComponent));
      return rightFactory(props);
    };

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'branch'))(Branch);
    }
    return Branch;
  };
};

exports.default = branch;

//# sourceMappingURL=branch.js.map