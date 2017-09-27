const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('withState adds a stateful value and a function for updating it', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.withState)('counter', 'updateCounter', 0)(component)
  expect(Counter.displayName).toBe('withState(component)')
  ;(0, _enzyme.mount)(
    _react2.default.createElement(Counter, { pass: 'through' })
  )
  const updateCounter = component.firstCall.args[0].updateCounter

  expect(component.lastCall.args[0].counter).toBe(0)
  expect(component.lastCall.args[0].pass).toBe('through')

  updateCounter(n => n + 9)
  updateCounter(n => n * 2)

  expect(component.lastCall.args[0].counter).toBe(18)
  expect(component.lastCall.args[0].pass).toBe('through')
})

test('withState also accepts a non-function, which is passed directly to setState()', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.withState)('counter', 'updateCounter', 0)(component)
  ;(0, _enzyme.mount)(_react2.default.createElement(Counter, null))
  const updateCounter = component.firstCall.args[0].updateCounter

  updateCounter(18)
  expect(component.lastCall.args[0].counter).toBe(18)
})

test('withState accepts setState() callback', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.withState)('counter', 'updateCounter', 0)(component)
  ;(0, _enzyme.mount)(_react2.default.createElement(Counter, null))
  const updateCounter = component.firstCall.args[0].updateCounter

  const renderSpy = _sinon2.default.spy(() => {
    expect(component.lastCall.args[0].counter).toBe(18)
  })

  expect(component.lastCall.args[0].counter).toBe(0)
  updateCounter(18, renderSpy)
})

test('withState also accepts initialState as function of props', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.withState)(
    'counter',
    'updateCounter',
    props => props.initialCounter
  )(component)
  ;(0, _enzyme.mount)(
    _react2.default.createElement(Counter, { initialCounter: 1 })
  )
  const updateCounter = component.firstCall.args[0].updateCounter

  expect(component.lastCall.args[0].counter).toBe(1)
  updateCounter(n => n * 3)
  expect(component.lastCall.args[0].counter).toBe(3)
})

// # sourceMappingURL=withState-test.js.map
