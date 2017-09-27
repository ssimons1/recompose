const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const SET_COUNTER = 'SET_COUNTER'

test('adds a stateful value and a function for updating it', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const initialState = { counter: 0 }

  const reducer = function reducer(state, action) {
    return action.type === SET_COUNTER ? { counter: action.payload } : state
  }

  const Counter = (0, _.compose)(
    (0, _.withReducer)('state', 'dispatch', reducer, initialState),
    (0, _.flattenProp)('state')
  )(component)

  expect(Counter.displayName).toBe('withReducer(flattenProp(component))')
  ;(0, _enzyme.mount)(_react2.default.createElement(Counter, null))
  const dispatch = component.firstCall.args[0].dispatch

  expect(component.lastCall.args[0].counter).toBe(0)

  dispatch({ type: SET_COUNTER, payload: 18 })
  expect(component.lastCall.args[0].counter).toBe(18)
})

test('calls initialState when it is a function', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const initialState = function initialState(_ref) {
    const initialCount = _ref.initialCount
    return { counter: initialCount }
  }

  const reducer = function reducer(state, action) {
    return action.type === SET_COUNTER ? { counter: action.payload } : state
  }

  const Counter = (0, _.compose)(
    (0, _.withReducer)('state', 'dispatch', reducer, initialState),
    (0, _.flattenProp)('state')
  )(component)
  ;(0, _enzyme.mount)(
    _react2.default.createElement(Counter, { initialCount: 10 })
  )

  expect(component.lastCall.args[0].counter).toBe(10)
})

test('receives state from reducer when initialState is not provided', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const initialState = { counter: 0 }

  const reducer = function reducer() {
    const state =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : initialState
    const action = arguments[1]
    return action.type === SET_COUNTER ? { counter: action.payload } : state
  }

  const Counter = (0, _.compose)(
    (0, _.withReducer)('state', 'dispatch', reducer),
    (0, _.flattenProp)('state')
  )(component)
  ;(0, _enzyme.mount)(_react2.default.createElement(Counter, null))

  expect(component.lastCall.args[0].counter).toBe(0)
})

// # sourceMappingURL=withReducer-test.js.map
