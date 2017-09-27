const _ = require('../')

test('compose composes from right to left', () => {
  const double = function double(x) {
    return x * 2
  }
  const square = function square(x) {
    return x * x
  }
  expect((0, _.compose)(square)(5)).toBe(25)
  expect((0, _.compose)(square, double)(5)).toBe(100)
  expect((0, _.compose)(double, square, double)(5)).toBe(200)
})

test('compose can be seeded with multiple arguments', () => {
  const square = function square(x) {
    return x * x
  }
  const add = function add(x, y) {
    return x + y
  }
  expect((0, _.compose)(square, add)(1, 2)).toBe(9)
})

test('compose returns the identity function if given no arguments', () => {
  expect((0, _.compose)()(1, 2)).toBe(1)
  expect((0, _.compose)()(3)).toBe(3)
  expect((0, _.compose)()()).toBe(undefined)
})

test('compose returns the first function if given only one', () => {
  const fn = function fn() {}
  expect((0, _.compose)(fn)).toBe(fn)
})

// # sourceMappingURL=compose-test.js.map
