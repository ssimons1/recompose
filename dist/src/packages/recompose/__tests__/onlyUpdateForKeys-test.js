const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('onlyUpdateForKeys implements shouldComponentUpdate()', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.compose)(
    (0, _.withState)('counter', 'updateCounter', 0),
    (0, _.withState)('foobar', 'updateFoobar', 'foobar'),
    (0, _.onlyUpdateForKeys)(['counter'])
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
