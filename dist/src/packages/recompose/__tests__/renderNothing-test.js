const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('renderNothing returns a component that renders null', () => {
  const Nothing = (0, _.renderNothing)('div')
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
