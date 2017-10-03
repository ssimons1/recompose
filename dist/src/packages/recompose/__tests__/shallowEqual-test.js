'use strict';

var _shallowEqual = require('../shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Adapted from https://github.com/rackt/react-redux/blob/master/test/utils/shallowEqual.spec.js
test('shallowEqual returns true if arguments are equal, without comparing properties', function () {
  var throwOnAccess = {
    get foo() {
      throw new Error('Property was accessed');
    }
  };
  expect((0, _shallowEqual2.default)(throwOnAccess, throwOnAccess)).toBe(true);
});

test('shallowEqual returns true if arguments fields are equal', function () {
  expect((0, _shallowEqual2.default)({ a: 1, b: 2, c: undefined }, { a: 1, b: 2, c: undefined })).toBe(true);

  expect((0, _shallowEqual2.default)({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBe(true);

  var o = {};
  expect((0, _shallowEqual2.default)({ a: 1, b: 2, c: o }, { a: 1, b: 2, c: o })).toBe(true);
});

test('shallowEqual returns false if either argument is null or undefined', function () {
  expect((0, _shallowEqual2.default)(null, { a: 1, b: 2 })).toBe(false);
  expect((0, _shallowEqual2.default)({ a: 1, b: 2 }, null)).toBe(false);
});

test('shallowEqual returns false if first argument has too many keys', function () {
  expect((0, _shallowEqual2.default)({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBe(false);
});

test('shallowEqual returns false if second argument has too many keys', function () {
  expect((0, _shallowEqual2.default)({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(false);
});

test('shallowEqual returns false if arguments have different keys', function () {
  expect((0, _shallowEqual2.default)({ a: 1, b: 2, c: undefined }, { a: 1, bb: 2, c: undefined })).toBe(false);
});

//# sourceMappingURL=shallowEqual-test.js.map