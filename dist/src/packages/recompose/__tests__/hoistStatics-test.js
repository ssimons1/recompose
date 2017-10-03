'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _hoistStatics = require('../hoistStatics');

var _hoistStatics2 = _interopRequireDefault(_hoistStatics);

var _mapProps = require('../mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('copies non-React static properties from base component to new component', function () {
  var BaseComponent = _sinon2.default.spy(function () {
    return null;
  });
  BaseComponent.foo = function () {};

  var EnhancedComponent = (0, _hoistStatics2.default)((0, _mapProps2.default)(function (props) {
    return { n: props.n * 5 };
  }))(BaseComponent);

  expect(EnhancedComponent.foo).toBe(BaseComponent.foo);

  (0, _enzyme.mount)(_react2.default.createElement(EnhancedComponent, { n: 3 }));
  expect(BaseComponent.firstCall.args[0].n).toBe(15);
});

//# sourceMappingURL=hoistStatics-test.js.map