'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _mapProps = require('../mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

var _withState = require('../withState');

var _withState2 = _interopRequireDefault(_withState);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

test('mapProps maps owner props to child props', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var StringConcat = (0, _compose2.default)((0, _withState2.default)('strings', 'updateStrings', ['do', 're', 'mi']), (0, _mapProps2.default)(function (_ref) {
    var strings = _ref.strings,
        rest = _objectWithoutProperties(_ref, ['strings']);

    return Object.assign({}, rest, {
      string: strings.join('')
    });
  }))(component);

  expect(StringConcat.displayName).toBe('withState(mapProps(component))');

  (0, _enzyme.mount)(_react2.default.createElement(StringConcat, null));
  var updateStrings = component.firstCall.args[0].updateStrings;

  updateStrings(function (strings) {
    return [].concat(_toConsumableArray(strings), ['fa']);
  });

  expect(component.firstCall.args[0].string).toBe('doremi');
  expect(component.secondCall.args[0].string).toBe('doremifa');
});

//# sourceMappingURL=mapProps-test.js.map