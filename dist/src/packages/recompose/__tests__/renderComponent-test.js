const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('renderComponent always renders the given component', () => {
  const componentA = _sinon2.default.spy(() => null)
  const componentB = _sinon2.default.spy(() => null)

  const Foobar = (0, _.compose)(
    (0, _.withState)('flip', 'updateFlip', false),
    (0, _.branch)(
      props => props.flip,
      (0, _.renderComponent)(componentA),
      (0, _.renderComponent)(componentB)
    )
  )(null)
  ;(0, _enzyme.mount)(_react2.default.createElement(Foobar, null))
  const updateFlip = componentB.firstCall.args[0].updateFlip

  expect(componentB.calledOnce).toBe(true)
  expect(componentA.notCalled).toBe(true)

  updateFlip(true)
  expect(componentB.calledOnce).toBe(true)
  expect(componentA.calledOnce).toBe(true)
})

// # sourceMappingURL=renderComponent-test.js.map
