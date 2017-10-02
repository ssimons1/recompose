const _compose = require('../compose')

const _compose2 = _interopRequireDefault(_compose)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('compose composes from right to left', () => {
  const double = function double(x) {
    return x * 2
  }
  const square = function square(x) {
    return x * x
  }
  expect((0, _compose2.default)(square)(5)).toBe(25)
  expect((0, _compose2.default)(square, double)(5)).toBe(100)
  expect((0, _compose2.default)(double, square, double)(5)).toBe(200)
})

test('compose can be seeded with multiple arguments', () => {
  const square = function square(x) {
    return x * x
  }
  const add = function add(x, y) {
    return x + y
  }
  expect((0, _compose2.default)(square, add)(1, 2)).toBe(9)
})

test('compose returns the identity function if given no arguments', () => {
  expect((0, _compose2.default)()(1, 2)).toBe(1)
  expect((0, _compose2.default)()(3)).toBe(3)
  expect((0, _compose2.default)()()).toBe(undefined)
})

test('compose returns the first function if given only one', () => {
  const fn = function fn() {}
  expect((0, _compose2.default)(fn)).toBe(fn)
})

// # sourceMappingURL=compose-test.js.map
