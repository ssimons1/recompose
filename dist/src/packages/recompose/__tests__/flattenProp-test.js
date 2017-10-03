'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _flattenProp = require('../flattenProp');

var _flattenProp2 = _interopRequireDefault(_flattenProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('flattenProps flattens an object prop and spreads it into the top-level props object', function () {
  var Counter = (0, _flattenProp2.default)('data-state')('div');
  expect(Counter.displayName).toBe('flattenProp(div)');

  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(Counter, { 'data-pass': 'through', 'data-state': { 'data-counter': 1 } }));

  expect(wrapper.equals(_react2.default.createElement('div', {
    'data-pass': 'through',
    'data-state': { 'data-counter': 1 },
    'data-counter': 1
  }))).toBe(true);

  wrapper.setProps({
    'data-pass': 'through',
    'data-state': { 'data-state': 1 }
  });
  expect(wrapper.equals(_react2.default.createElement('div', { 'data-pass': 'through', 'data-state': 1 }))).toBe(true);
});

//# sourceMappingURL=flattenProp-test.js.map