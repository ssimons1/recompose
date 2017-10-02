const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _componentFromProp = require('../componentFromProp')

const _componentFromProp2 = _interopRequireDefault(_componentFromProp)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('componentFromProp creates a component that takes a component as a prop and renders it with the rest of the props', () => {
  const Container = (0, _componentFromProp2.default)('component')
  expect(Container.displayName).toBe('componentFromProp(component)')

  const Component = function Component(_ref) {
    const pass = _ref.pass
    return _react2.default.createElement('div', null, 'Pass: ', pass)
  }

  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(Container, {
      component: Component,
      pass: 'through',
    })
  )
  const div = wrapper.find('div')
  expect(div.text()).toBe('Pass: through')
})

// # sourceMappingURL=componentFromProp-test.js.map
