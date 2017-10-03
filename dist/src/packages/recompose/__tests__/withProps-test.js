'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _withProps = require('../withProps');

var _withProps2 = _interopRequireDefault(_withProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('withProps passes additional props to base component', function () {
  var DoReMi = (0, _withProps2.default)({ 'data-so': 'do', 'data-la': 'fa' })('div');
  expect(DoReMi.displayName).toBe('withProps(div)');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, null)).find('div');
  expect(div.prop('data-so')).toBe('do');
  expect(div.prop('data-la')).toBe('fa');
});

test('withProps takes precedent over owner props', function () {
  var DoReMi = (0, _withProps2.default)({ 'data-so': 'do', 'data-la': 'fa' })('div');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, { 'data-la': 'ti' })).find('div');
  expect(div.prop('data-so')).toBe('do');
  expect(div.prop('data-la')).toBe('fa');
});

test('withProps should accept function', function () {
  var DoReMi = (0, _withProps2.default)(function (props) {
    return {
      'data-so': props['data-la']
    };
  })('div');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, { 'data-la': 'la' })).find('div');
  expect(div.prop('data-so')).toBe('la');
});

//# sourceMappingURL=withProps-test.js.map