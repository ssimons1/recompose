'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _setDisplayName = require('../setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('setDisplayName sets a static property on the base component', function () {
  var BaseComponent = function BaseComponent() {
    return _react2.default.createElement('div', null);
  };
  var NewComponent = (0, _setDisplayName2.default)('Foo')(BaseComponent);
  expect(NewComponent.displayName).toBe('Foo');
});

//# sourceMappingURL=setDisplayName-test.js.map