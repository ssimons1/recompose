const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _propTypes = require('prop-types')

const _propTypes2 = _interopRequireDefault(_propTypes)

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _enzyme = require('enzyme')

const _onlyUpdateForPropTypes = require('../onlyUpdateForPropTypes')

const _onlyUpdateForPropTypes2 = _interopRequireDefault(_onlyUpdateForPropTypes)

const _compose = require('../compose')

const _compose2 = _interopRequireDefault(_compose)

const _withState = require('../withState')

const _withState2 = _interopRequireDefault(_withState)

const _setPropTypes = require('../setPropTypes')

const _setPropTypes2 = _interopRequireDefault(_setPropTypes)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('onlyUpdateForPropTypes only updates for props specified in propTypes', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const Counter = (0, _compose2.default)(
    (0, _withState2.default)('counter', 'updateCounter', 0),
    (0, _withState2.default)('foobar', 'updateFoobar', 'foobar'),
    _onlyUpdateForPropTypes2.default,
    (0, _setPropTypes2.default)({ counter: _propTypes2.default.number })
  )(component)

  expect(Counter.displayName).toBe(
    'withState(withState(onlyUpdateForPropTypes(component)))'
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

test('onlyUpdateForPropTypes warns if BaseComponent does not have any propTypes', () => {
  const error = _sinon2.default.stub(console, 'error')
  const ShouldWarn = (0, _onlyUpdateForPropTypes2.default)('div')
  ;(0, _enzyme.shallow)(_react2.default.createElement(ShouldWarn, null))

  expect(error.firstCall.args[0]).toBe(
    'A component without any `propTypes` was passed to ' +
      '`onlyUpdateForPropTypes()`. Check the implementation of the component ' +
      'with display name "div".'
  )

  /* eslint-disable */
  console.error.restore()
  /* eslint-enable */
})

// # sourceMappingURL=onlyUpdateForPropTypes-test.js.map
