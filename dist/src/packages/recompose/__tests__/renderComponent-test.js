const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _renderComponent = require('../renderComponent')

const _renderComponent2 = _interopRequireDefault(_renderComponent)

const _withState = require('../withState')

const _withState2 = _interopRequireDefault(_withState)

const _compose = require('../compose')

const _compose2 = _interopRequireDefault(_compose)

const _branch = require('../branch')

const _branch2 = _interopRequireDefault(_branch)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('renderComponent always renders the given component', () => {
  const componentA = _sinon2.default.spy(() => null)
  const componentB = _sinon2.default.spy(() => null)

  const Foobar = (0, _compose2.default)(
    (0, _withState2.default)('flip', 'updateFlip', false),
    (0, _branch2.default)(
      props => props.flip,
      (0, _renderComponent2.default)(componentA),
      (0, _renderComponent2.default)(componentB)
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
