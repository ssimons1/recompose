const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('copies non-React static properties from base component to new component', () => {
  const BaseComponent = _sinon2.default.spy(() => null)
  BaseComponent.foo = function() {}

  const EnhancedComponent = (0, _.hoistStatics)(
    (0, _.mapProps)(props => ({ n: props.n * 5 }))
  )(BaseComponent)

  expect(EnhancedComponent.foo).toBe(BaseComponent.foo)
  ;(0, _enzyme.mount)(
    _react2.default.createElement(EnhancedComponent, { n: 3 })
  )
  expect(BaseComponent.firstCall.args[0].n).toBe(15)
})

// # sourceMappingURL=hoistStatics-test.js.map
