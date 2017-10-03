'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _nest = require('../nest');

var _nest2 = _interopRequireDefault(_nest);

var _setDisplayName = require('../setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _toClass = require('../toClass');

var _toClass2 = _interopRequireDefault(_toClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('nest nests components from outer to inner', function () {
  var A = (0, _setDisplayName2.default)('A')((0, _toClass2.default)('div'));
  var B = (0, _setDisplayName2.default)('B')((0, _toClass2.default)('div'));
  var C = (0, _setDisplayName2.default)('C')((0, _toClass2.default)('div'));

  var Nest = (0, _nest2.default)(A, B, C);

  expect(Nest.displayName).toBe('nest(A, B, C)');

  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    Nest,
    { pass: 'through' },
    'Child'
  ));

  expect(wrapper.equals(_react2.default.createElement(
    A,
    { pass: 'through' },
    _react2.default.createElement(
      B,
      { pass: 'through' },
      _react2.default.createElement(
        C,
        { pass: 'through' },
        'Child'
      )
    )
  ))).toBe(true);
});

//# sourceMappingURL=nest-test.js.map