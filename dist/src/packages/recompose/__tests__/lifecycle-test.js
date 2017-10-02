const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _lifecycle = require('../lifecycle')

const _lifecycle2 = _interopRequireDefault(_lifecycle)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('lifecycle is a higher-order component version of React.Component', () => {
  const enhance = (0, _lifecycle2.default)({
    componentWillMount: function componentWillMount() {
      this.setState({ 'data-bar': 'baz' })
    },
  })
  const Div = enhance('div')
  expect(Div.displayName).toBe('lifecycle(div)')

  const div = (0, _enzyme.mount)(
    _react2.default.createElement(Div, { 'data-foo': 'bar' })
  ).find('div')
  expect(div.prop('data-foo')).toBe('bar')
  expect(div.prop('data-bar')).toBe('baz')
})

// # sourceMappingURL=lifecycle-test.js.map
