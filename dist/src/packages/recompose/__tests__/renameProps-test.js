const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _renameProps = require('../renameProps')

const _renameProps2 = _interopRequireDefault(_renameProps)

const _withProps = require('../withProps')

const _withProps2 = _interopRequireDefault(_withProps)

const _compose = require('../compose')

const _compose2 = _interopRequireDefault(_compose)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('renameProps renames props', () => {
  const StringConcat = (0, _compose2.default)(
    (0, _withProps2.default)({ 'data-so': 123, 'data-la': 456 }),
    (0, _renameProps2.default)({ 'data-so': 'data-do', 'data-la': 'data-fa' })
  )('div')

  expect(StringConcat.displayName).toBe('withProps(renameProps(div))')

  const div = (0, _enzyme.mount)(
    _react2.default.createElement(StringConcat, null)
  ).find('div')

  expect(div.prop('data-do')).toBe(123)
  expect(div.prop('data-fa')).toBe(456)
})

// # sourceMappingURL=renameProps-test.js.map
