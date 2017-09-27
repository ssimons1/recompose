const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('renameProp renames a single prop', () => {
  const StringConcat = (0, _.compose)(
    (0, _.withProps)({ 'data-so': 123, 'data-la': 456 }),
    (0, _.renameProp)('data-so', 'data-do')
  )('div')

  expect(StringConcat.displayName).toBe('withProps(renameProp(div))')

  const div = (0, _enzyme.mount)(
    _react2.default.createElement(StringConcat, null)
  ).find('div')
  expect(div.props()).toEqual({ 'data-do': 123, 'data-la': 456 })
})

// # sourceMappingURL=renameProp-test.js.map
