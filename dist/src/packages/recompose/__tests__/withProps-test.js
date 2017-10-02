const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _withProps = require('../withProps')

const _withProps2 = _interopRequireDefault(_withProps)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('withProps passes additional props to base component', () => {
  const DoReMi = (0, _withProps2.default)({ 'data-so': 'do', 'data-la': 'fa' })(
    'div'
  )
  expect(DoReMi.displayName).toBe('withProps(div)')

  const div = (0, _enzyme.shallow)(
    _react2.default.createElement(DoReMi, null)
  ).find('div')
  expect(div.prop('data-so')).toBe('do')
  expect(div.prop('data-la')).toBe('fa')
})

test('withProps takes precedent over owner props', () => {
  const DoReMi = (0, _withProps2.default)({ 'data-so': 'do', 'data-la': 'fa' })(
    'div'
  )

  const div = (0, _enzyme.shallow)(
    _react2.default.createElement(DoReMi, { 'data-la': 'ti' })
  ).find('div')
  expect(div.prop('data-so')).toBe('do')
  expect(div.prop('data-la')).toBe('fa')
})

test('withProps should accept function', () => {
  const DoReMi = (0, _withProps2.default)(props => ({
    'data-so': props['data-la'],
  }))('div')

  const div = (0, _enzyme.shallow)(
    _react2.default.createElement(DoReMi, { 'data-la': 'la' })
  ).find('div')
  expect(div.prop('data-so')).toBe('la')
})

// # sourceMappingURL=withProps-test.js.map
