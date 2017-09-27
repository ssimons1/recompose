const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('nest nests components from outer to inner', () => {
  const A = (0, _.setDisplayName)('A')((0, _.toClass)('div'))
  const B = (0, _.setDisplayName)('B')((0, _.toClass)('div'))
  const C = (0, _.setDisplayName)('C')((0, _.toClass)('div'))

  const Nest = (0, _.nest)(A, B, C)

  expect(Nest.displayName).toBe('nest(A, B, C)')

  const wrapper = (0, _enzyme.shallow)(
    _react2.default.createElement(Nest, { pass: 'through' }, 'Child')
  )

  expect(
    wrapper.equals(
      _react2.default.createElement(
        A,
        { pass: 'through' },
        _react2.default.createElement(
          B,
          { pass: 'through' },
          _react2.default.createElement(C, { pass: 'through' }, 'Child')
        )
      )
    )
  ).toBe(true)
})

// # sourceMappingURL=nest-test.js.map
