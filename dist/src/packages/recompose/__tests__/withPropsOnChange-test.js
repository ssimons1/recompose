const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _withPropsOnChange = require('../withPropsOnChange')

const _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

const _withState = require('../withState')

const _withState2 = _interopRequireDefault(_withState)

const _flattenProp = require('../flattenProp')

const _flattenProp2 = _interopRequireDefault(_flattenProp)

const _compose = require('../compose')

const _compose2 = _interopRequireDefault(_compose)

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

test('withPropsOnChange maps subset of owner props to child props', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const mapSpy = _sinon2.default.spy()
  const StringConcat = (0, _compose2.default)(
    (0, _withState2.default)('strings', 'updateStrings', {
      a: 'a',
      b: 'b',
      c: 'c',
    }),
    (0, _flattenProp2.default)('strings'),
    (0, _withPropsOnChange2.default)(['a', 'b'], _ref => {
      let a = _ref.a,
        b = _ref.b,
        props = _objectWithoutProperties(_ref, ['a', 'b'])

      mapSpy()
      return Object.assign({}, props, {
        foobar: a + b,
      })
    })
  )(component)

  expect(StringConcat.displayName).toBe(
    'withState(flattenProp(withPropsOnChange(component)))'
  )
  ;(0, _enzyme.mount)(_react2.default.createElement(StringConcat, null))
  const updateStrings = component.firstCall.args[0].updateStrings

  expect(component.lastCall.args[0].foobar).toBe('ab')
  expect(component.calledOnce).toBe(true)
  expect(mapSpy.callCount).toBe(1)

  // Does not re-map for non-dependent prop updates
  updateStrings(strings => Object.assign({}, strings, { c: 'baz' }))
  expect(component.lastCall.args[0].foobar).toBe('ab')
  expect(component.lastCall.args[0].c).toBe('c')
  expect(component.calledTwice).toBe(true)
  expect(mapSpy.callCount).toBe(1)

  updateStrings(strings => Object.assign({}, strings, { a: 'foo', b: 'bar' }))
  expect(component.lastCall.args[0].foobar).toBe('foobar')
  expect(component.lastCall.args[0].c).toBe('baz')
  expect(component.calledThrice).toBe(true)
  expect(mapSpy.callCount).toBe(2)
})

// # sourceMappingURL=withPropsOnChange-test.js.map
