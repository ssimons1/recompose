const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
  return Array.from(arr)
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

test('mapProps maps owner props to child props', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const StringConcat = (0, _.compose)(
    (0, _.withState)('strings', 'updateStrings', ['do', 're', 'mi']),
    (0, _.mapProps)(_ref => {
      let strings = _ref.strings,
        rest = _objectWithoutProperties(_ref, ['strings'])

      return Object.assign({}, rest, {
        string: strings.join(''),
      })
    })
  )(component)

  expect(StringConcat.displayName).toBe('withState(mapProps(component))')
  ;(0, _enzyme.mount)(_react2.default.createElement(StringConcat, null))
  const updateStrings = component.firstCall.args[0].updateStrings

  updateStrings(strings => [].concat(_toConsumableArray(strings), ['fa']))

  expect(component.firstCall.args[0].string).toBe('doremi')
  expect(component.secondCall.args[0].string).toBe('doremifa')
})

// # sourceMappingURL=mapProps-test.js.map
