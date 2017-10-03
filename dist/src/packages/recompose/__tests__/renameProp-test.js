'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _renameProp = require('../renameProp');

var _renameProp2 = _interopRequireDefault(_renameProp);

var _withProps = require('../withProps');

var _withProps2 = _interopRequireDefault(_withProps);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renameProp renames a single prop', function () {
  var StringConcat = (0, _compose2.default)((0, _withProps2.default)({ 'data-so': 123, 'data-la': 456 }), (0, _renameProp2.default)('data-so', 'data-do'))('div');

  expect(StringConcat.displayName).toBe('withProps(renameProp(div))');

  var div = (0, _enzyme.mount)(_react2.default.createElement(StringConcat, null)).find('div');
  expect(div.props()).toEqual({ 'data-do': 123, 'data-la': 456 });
});

//# sourceMappingURL=renameProp-test.js.map