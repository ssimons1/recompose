const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _onlyUpdateForKeys = require('../onlyUpdateForKeys')

const _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys)

const _compose = require('../compose')

const _compose2 = _interopRequireDefault(_compose)

const _withState = require('../withState')

const _withState2 = _interopRequireDefault(_withState)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('onlyUpdateForKeys implements shouldComponentUpdate()', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _compose2.default)(
    (0, _withState2.default)('counter', 'updateCounter', 0),
    (0, _withState2.default)('foobar', 'updateFoobar', 'foobar'),
    (0, _onlyUpdateForKeys2.default)(['counter'])
  )(component)

  expect(Counter.displayName).toBe(
    'withState(withState(onlyUpdateForKeys(component)))'
  )
  ;(0, _enzyme.mount)(_react2.default.createElement(Counter, null))
  let _component$firstCall$ = component.firstCall.args[0],
    updateCounter = _component$firstCall$.updateCounter,
    updateFoobar = _component$firstCall$.updateFoobar

  expect(component.lastCall.args[0].counter).toBe(0)
  expect(component.lastCall.args[0].foobar).toBe('foobar')

  // Does not update
  updateFoobar('barbaz')
  expect(component.calledOnce).toBe(true)

  updateCounter(42)
  expect(component.calledTwice).toBe(true)
  expect(component.lastCall.args[0].counter).toBe(42)
  expect(component.lastCall.args[0].foobar).toBe('barbaz')
})

// # sourceMappingURL=onlyUpdateForKeys-test.js.map
