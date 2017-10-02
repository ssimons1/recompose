const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _renderNothing = require('../renderNothing')

const _renderNothing2 = _interopRequireDefault(_renderNothing)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('renderNothing returns a component that renders null', () => {
  const Nothing = (0, _renderNothing2.default)('div')
  const wrapper = (0, _enzyme.shallow)(
    _react2.default.createElement(Nothing, null)
  )

  const Parent = function Parent() {
    return _react2.default.createElement(Nothing, null)
  }
  const parentWrapper = (0, _enzyme.shallow)(
    _react2.default.createElement(Parent, null)
  )

  expect(wrapper.type()).toBe(null)
  expect(parentWrapper.text()).toBe('<Nothing />')
})

// # sourceMappingURL=renderNothing-test.js.map
