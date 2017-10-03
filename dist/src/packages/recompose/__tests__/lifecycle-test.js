'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _lifecycle = require('../lifecycle');

var _lifecycle2 = _interopRequireDefault(_lifecycle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('lifecycle is a higher-order component version of React.Component', function () {
  var enhance = (0, _lifecycle2.default)({
    componentWillMount: function componentWillMount() {
      this.setState({ 'data-bar': 'baz' });
    }
  });
  var Div = enhance('div');
  expect(Div.displayName).toBe('lifecycle(div)');

  var div = (0, _enzyme.mount)(_react2.default.createElement(Div, { 'data-foo': 'bar' })).find('div');
  expect(div.prop('data-foo')).toBe('bar');
  expect(div.prop('data-bar')).toBe('baz');
});

//# sourceMappingURL=lifecycle-test.js.map