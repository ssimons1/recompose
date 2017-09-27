const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _objectWithoutProperties(obj, keys) {
  const target = {}
  for (const i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

test('createSink creates a React component that fires a callback when receiving new props', () => {
  const spy = _sinon2.default.spy()
  const Sink = (0, _.createSink)(spy)
  const Counter = (0, _.compose)(
    (0, _.withState)('counter', 'updateCounter', 0),
    (0, _.mapProps)(_ref => {
      let updateCounter = _ref.updateCounter,
        rest = _objectWithoutProperties(_ref, ['updateCounter'])

      return Object.assign(
        {
          increment: function increment() {
            return updateCounter(n => n + 1)
          },
        },
        rest
      )
    })
  )(Sink)
  ;(0, _enzyme.mount)(
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(Counter, null)
    )
  )

  const increment = spy.lastCall.args[0].increment

  const getCounter = function getCounter() {
    return spy.lastCall.args[0].counter
  }
  expect(getCounter()).toBe(0)
  increment()
  expect(getCounter()).toBe(1)
  increment()
  expect(getCounter()).toBe(2)
})

// # sourceMappingURL=createSink-test.js.map
