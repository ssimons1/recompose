'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _setStatic = require('../setStatic');

var _setStatic2 = _interopRequireDefault(_setStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('setStatic sets a static property on the base component', function () {
  var BaseComponent = function BaseComponent() {
    return _react2.default.createElement('div', null);
  };
  var NewComponent = (0, _setStatic2.default)('propTypes', { foo: _propTypes2.default.object })(BaseComponent);

  expect(NewComponent.propTypes).toEqual({
    foo: _propTypes2.default.object
  });
});

//# sourceMappingURL=setStatic-test.js.map