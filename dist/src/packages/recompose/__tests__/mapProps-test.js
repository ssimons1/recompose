const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _mapProps = require('../mapProps')

const _mapProps2 = _interopRequireDefault(_mapProps)

const _withState = require('../withState')

const _withState2 = _interopRequireDefault(_withState)

const _compose = require('../compose')

const _compose2 = _interopRequireDefault(_compose)

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

  const StringConcat = (0, _compose2.default)(
    (0, _withState2.default)('strings', 'updateStrings', ['do', 're', 'mi']),
    (0, _mapProps2.default)(_ref => {
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
