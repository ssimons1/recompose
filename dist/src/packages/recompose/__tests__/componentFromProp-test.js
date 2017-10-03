'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _componentFromProp = require('../componentFromProp');

var _componentFromProp2 = _interopRequireDefault(_componentFromProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('componentFromProp creates a component that takes a component as a prop and renders it with the rest of the props', function () {
  var Container = (0, _componentFromProp2.default)('component');
  expect(Container.displayName).toBe('componentFromProp(component)');

  var Component = function Component(_ref) {
    var pass = _ref.pass;
    return _react2.default.createElement(
      'div',
      null,
      'Pass: ',
      pass
    );
  };

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Container, { component: Component, pass: 'through' }));
  var div = wrapper.find('div');
  expect(div.text()).toBe('Pass: through');
});

//# sourceMappingURL=componentFromProp-test.js.map