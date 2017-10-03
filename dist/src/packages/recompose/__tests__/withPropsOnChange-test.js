'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _withPropsOnChange = require('../withPropsOnChange');

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange);

var _withState = require('../withState');

var _withState2 = _interopRequireDefault(_withState);

var _flattenProp = require('../flattenProp');

var _flattenProp2 = _interopRequireDefault(_flattenProp);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

test('withPropsOnChange maps subset of owner props to child props', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var mapSpy = _sinon2.default.spy();
  var StringConcat = (0, _compose2.default)((0, _withState2.default)('strings', 'updateStrings', { a: 'a', b: 'b', c: 'c' }), (0, _flattenProp2.default)('strings'), (0, _withPropsOnChange2.default)(['a', 'b'], function (_ref) {
    var a = _ref.a,
        b = _ref.b,
        props = _objectWithoutProperties(_ref, ['a', 'b']);

    mapSpy();
    return Object.assign({}, props, {
      foobar: a + b
    });
  }))(component);

  expect(StringConcat.displayName).toBe('withState(flattenProp(withPropsOnChange(component)))');

  (0, _enzyme.mount)(_react2.default.createElement(StringConcat, null));
  var updateStrings = component.firstCall.args[0].updateStrings;

  expect(component.lastCall.args[0].foobar).toBe('ab');
  expect(component.calledOnce).toBe(true);
  expect(mapSpy.callCount).toBe(1);

  // Does not re-map for non-dependent prop updates
  updateStrings(function (strings) {
    return Object.assign({}, strings, { c: 'baz' });
  });
  expect(component.lastCall.args[0].foobar).toBe('ab');
  expect(component.lastCall.args[0].c).toBe('c');
  expect(component.calledTwice).toBe(true);
  expect(mapSpy.callCount).toBe(1);

  updateStrings(function (strings) {
    return Object.assign({}, strings, { a: 'foo', b: 'bar' });
  });
  expect(component.lastCall.args[0].foobar).toBe('foobar');
  expect(component.lastCall.args[0].c).toBe('baz');
  expect(component.calledThrice).toBe(true);
  expect(mapSpy.callCount).toBe(2);
});

//# sourceMappingURL=withPropsOnChange-test.js.map