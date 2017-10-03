'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _setPropTypes = require('../setPropTypes');

var _setPropTypes2 = _interopRequireDefault(_setPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('setPropTypes sets a static property on the base component', function () {
  var BaseComponent = function BaseComponent() {
    return _react2.default.createElement('div', null);
  };
  var NewComponent = (0, _setPropTypes2.default)({ foo: _propTypes2.default.object })(BaseComponent);

  expect(NewComponent.propTypes).toEqual({
    foo: _propTypes2.default.object
  });
});

//# sourceMappingURL=setPropTypes-test.js.map