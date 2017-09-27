const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('withStateHandlers should persist events passed as argument', () => {
  const component = function component(_ref) {
    let value = _ref.value,
      onChange = _ref.onChange
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', {
        type: 'text',
        value,
        onChange,
      }),
      _react2.default.createElement('p', null, value)
    )
  }

  const InputComponent = (0, _.withStateHandlers)(
    { value: '' },
    {
      onChange: function onChange() {
        return function(e) {
          return {
            value: e.target.value,
          }
        }
      },
    }
  )(component)

  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(InputComponent, null)
  )
  const input = wrapper.find('input')
  const output = wrapper.find('p')
  // having that enzyme simulate does not simulate real situation
  // emulate persist
  input.simulate('change', {
    persist: function persist() {
      this.target = { value: 'Yay' }
    },
  })
  expect(output.text()).toBe('Yay')

  input.simulate('change', { target: { value: 'empty' } })
  expect(output.text()).toBe('empty')
})

test('withStateHandlers adds a stateful value and a function for updating it', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.withStateHandlers)(
    { counter: 0 },
    {
      updateCounter: function updateCounter(_ref2) {
        const counter = _ref2.counter
        return function(increment) {
          return {
            counter: counter + increment,
          }
        }
      },
    }
  )(component)
  expect(Counter.displayName).toBe('withStateHandlers(component)')
  ;(0, _enzyme.mount)(
    _react2.default.createElement(Counter, { pass: 'through' })
  )
  const updateCounter = component.firstCall.args[0].updateCounter

  expect(component.lastCall.args[0].counter).toBe(0)
  expect(component.lastCall.args[0].pass).toBe('through')

  updateCounter(9)
  expect(component.lastCall.args[0].counter).toBe(9)
  updateCounter(1)
  updateCounter(10)

  expect(component.lastCall.args[0].counter).toBe(20)
  expect(component.lastCall.args[0].pass).toBe('through')
})

test('withStateHandlers accepts initialState as function of props', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.withStateHandlers)(
    _ref3 => {
      const initialCounter = _ref3.initialCounter
      return {
        counter: initialCounter,
      }
    },
    {
      updateCounter: function updateCounter(_ref4) {
        const counter = _ref4.counter
        return function(increment) {
          return {
            counter: counter + increment,
          }
        }
      },
    }
  )(component)

  const initialCounter = 101
  ;(0, _enzyme.mount)(
    _react2.default.createElement(Counter, { initialCounter })
  )
  expect(component.lastCall.args[0].counter).toBe(initialCounter)
})

test('withStateHandlers initial state must be function or object or null or undefined', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.withStateHandlers)(1, {})(component)
  // React throws an error
  expect(() =>
    (0, _enzyme.mount)(_react2.default.createElement(Counter, null))
  ).toThrow()
})

test('withStateHandlers have access to props', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.withStateHandlers)(
    _ref5 => {
      const initialCounter = _ref5.initialCounter
      return {
        counter: initialCounter,
      }
    },
    {
      increment: function increment(_ref6, _ref7) {
        const counter = _ref6.counter
        const incrementValue = _ref7.incrementValue
        return function() {
          return {
            counter: counter + incrementValue,
          }
        }
      },
    }
  )(component)

  const initialCounter = 101
  const incrementValue = 37
  ;(0, _enzyme.mount)(
    _react2.default.createElement(Counter, {
      initialCounter,
      incrementValue,
    })
  )

  const increment = component.firstCall.args[0].increment

  increment()
  expect(component.lastCall.args[0].counter).toBe(
    initialCounter + incrementValue
  )
})

test('withStateHandlers passes immutable state updaters', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.withStateHandlers)(
    _ref8 => {
      const initialCounter = _ref8.initialCounter
      return {
        counter: initialCounter,
      }
    },
    {
      increment: function increment(_ref9, _ref10) {
        const counter = _ref9.counter
        const incrementValue = _ref10.incrementValue
        return function() {
          return {
            counter: counter + incrementValue,
          }
        }
      },
    }
  )(component)

  const initialCounter = 101
  const incrementValue = 37
  ;(0, _enzyme.mount)(
    _react2.default.createElement(Counter, {
      initialCounter,
      incrementValue,
    })
  )

  const increment = component.firstCall.args[0].increment

  increment()
  expect(component.lastCall.args[0].counter).toBe(
    initialCounter + incrementValue
  )
})

test('withStateHandlers does not rerender if state updater returns undefined', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.withStateHandlers)(
    _ref11 => {
      const initialCounter = _ref11.initialCounter
      return {
        counter: initialCounter,
      }
    },
    {
      updateCounter: function updateCounter(_ref12) {
        const counter = _ref12.counter
        return function(increment) {
          return increment === 0
            ? undefined
            : {
                counter: counter + increment,
              }
        }
      },
    }
  )(component)

  const initialCounter = 101
  ;(0, _enzyme.mount)(
    _react2.default.createElement(Counter, { initialCounter })
  )
  expect(component.callCount).toBe(1)

  const updateCounter = component.firstCall.args[0].updateCounter

  updateCounter(1)
  expect(component.callCount).toBe(2)

  updateCounter(0)
  expect(component.callCount).toBe(2)
})

test('withStateHandlers rerenders if parent props changed', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _.compose)(
    (0, _.withStateHandlers)(
      _ref13 => {
        const initialCounter = _ref13.initialCounter
        return {
          counter: initialCounter,
        }
      },
      {
        increment: function increment(_ref14) {
          const counter = _ref14.counter
          return function(incrementValue) {
            return {
              counter: counter + incrementValue,
            }
          }
        },
      }
    ),
    (0, _.withStateHandlers)(
      { incrementValue: 1 },
      {
        // updates parent state and return undefined
        updateParentIncrement: function updateParentIncrement(_ref15, _ref16) {
          const incrementValue = _ref15.incrementValue
          const increment = _ref16.increment
          return function() {
            increment(incrementValue)
            return undefined
          }
        },
      }
    )
  )(component)

  const initialCounter = 101
  ;(0, _enzyme.mount)(
    _react2.default.createElement(Counter, { initialCounter })
  )

  const updateParentIncrement =
    component.firstCall.args[0].updateParentIncrement

  updateParentIncrement()
  expect(component.lastCall.args[0].counter).toBe(initialCounter + 1)
})

// # sourceMappingURL=withStateHandlers-test.js.map
