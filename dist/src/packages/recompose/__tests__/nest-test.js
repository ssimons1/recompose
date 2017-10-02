const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _nest = require('../nest')

const _nest2 = _interopRequireDefault(_nest)

const _setDisplayName = require('../setDisplayName')

const _setDisplayName2 = _interopRequireDefault(_setDisplayName)

const _toClass = require('../toClass')

const _toClass2 = _interopRequireDefault(_toClass)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('nest nests components from outer to inner', () => {
  const A = (0, _setDisplayName2.default)('A')((0, _toClass2.default)('div'))
  const B = (0, _setDisplayName2.default)('B')((0, _toClass2.default)('div'))
  const C = (0, _setDisplayName2.default)('C')((0, _toClass2.default)('div'))

  const Nest = (0, _nest2.default)(A, B, C)

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
