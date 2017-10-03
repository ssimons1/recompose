'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _renderNothing = require('../renderNothing');

var _renderNothing2 = _interopRequireDefault(_renderNothing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renderNothing returns a component that renders null', function () {
  var Nothing = (0, _renderNothing2.default)('div');
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(Nothing, null));

  var Parent = function Parent() {
    return _react2.default.createElement(Nothing, null);
  };
  var parentWrapper = (0, _enzyme.shallow)(_react2.default.createElement(Parent, null));

  expect(wrapper.type()).toBe(null);
  expect(parentWrapper.text()).toBe('<Nothing />');
});

//# sourceMappingURL=renderNothing-test.js.map