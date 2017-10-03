'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _defaultProps = require('../defaultProps');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('defaultProps passes additional props to base component', function () {
  var DoReMi = (0, _defaultProps2.default)({ 'data-so': 'do', 'data-la': 'fa' })('div');
  expect(DoReMi.displayName).toBe('defaultProps(div)');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, null)).find('div');
  expect(div.equals(_react2.default.createElement('div', { 'data-so': 'do', 'data-la': 'fa' }))).toBe(true);
});

test('defaultProps has lower precendence than props from owner', function () {
  var DoReMi = (0, _defaultProps2.default)({ 'data-so': 'do', 'data-la': 'fa' })('div');
  expect(DoReMi.displayName).toBe('defaultProps(div)');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, { 'data-la': 'ti' })).find('div');
  expect(div.equals(_react2.default.createElement('div', { 'data-so': 'do', 'data-la': 'ti' }))).toBe(true);
});

test('defaultProps overrides undefined owner props', function () {
  var DoReMi = (0, _defaultProps2.default)({ 'data-so': 'do', 'data-la': 'fa' })('div');
  expect(DoReMi.displayName).toBe('defaultProps(div)');

  var div = (0, _enzyme.shallow)(_react2.default.createElement(DoReMi, { 'data-la': undefined })).find('div');
  expect(div.equals(_react2.default.createElement('div', { 'data-so': 'do', 'data-la': 'fa' }))).toBe(true);
});

//# sourceMappingURL=defaultProps-test.js.map