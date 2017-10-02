const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _renameProp = require('../renameProp')

const _renameProp2 = _interopRequireDefault(_renameProp)

const _withProps = require('../withProps')

const _withProps2 = _interopRequireDefault(_withProps)

const _compose = require('../compose')

const _compose2 = _interopRequireDefault(_compose)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('renameProp renames a single prop', () => {
  const StringConcat = (0, _compose2.default)(
    (0, _withProps2.default)({ 'data-so': 123, 'data-la': 456 }),
    (0, _renameProp2.default)('data-so', 'data-do')
  )('div')

  expect(StringConcat.displayName).toBe('withProps(renameProp(div))')

  const div = (0, _enzyme.mount)(
    _react2.default.createElement(StringConcat, null)
  ).find('div')
  expect(div.props()).toEqual({ 'data-do': 123, 'data-la': 456 })
})

// # sourceMappingURL=renameProp-test.js.map
