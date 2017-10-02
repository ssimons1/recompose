const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _withReducer = require('../withReducer')

const _withReducer2 = _interopRequireDefault(_withReducer)

const _compose = require('../compose')

const _compose2 = _interopRequireDefault(_compose)

const _flattenProp = require('../flattenProp')

const _flattenProp2 = _interopRequireDefault(_flattenProp)

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

  const Counter = (0, _compose2.default)(
    (0, _withReducer2.default)('state', 'dispatch', reducer, initialState),
    (0, _flattenProp2.default)('state')
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

  const Counter = (0, _compose2.default)(
    (0, _withReducer2.default)('state', 'dispatch', reducer, initialState),
    (0, _flattenProp2.default)('state')
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

  const Counter = (0, _compose2.default)(
    (0, _withReducer2.default)('state', 'dispatch', reducer),
    (0, _flattenProp2.default)('state')
  )(component)
  ;(0, _enzyme.mount)(_react2.default.createElement(Counter, null))

  expect(component.lastCall.args[0].counter).toBe(0)
})

// # sourceMappingURL=withReducer-test.js.map
