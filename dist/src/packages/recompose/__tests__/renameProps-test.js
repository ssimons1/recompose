'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _renameProps = require('../renameProps');

var _renameProps2 = _interopRequireDefault(_renameProps);

var _withProps = require('../withProps');

var _withProps2 = _interopRequireDefault(_withProps);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renameProps renames props', function () {
  var StringConcat = (0, _compose2.default)((0, _withProps2.default)({ 'data-so': 123, 'data-la': 456 }), (0, _renameProps2.default)({ 'data-so': 'data-do', 'data-la': 'data-fa' }))('div');

  expect(StringConcat.displayName).toBe('withProps(renameProps(div))');

  var div = (0, _enzyme.mount)(_react2.default.createElement(StringConcat, null)).find('div');

  expect(div.prop('data-do')).toBe(123);
  expect(div.prop('data-fa')).toBe(456);
});

//# sourceMappingURL=renameProps-test.js.map