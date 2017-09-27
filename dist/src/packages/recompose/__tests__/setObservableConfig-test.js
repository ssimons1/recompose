const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _rxjsObservableConfig = require('../rxjsObservableConfig')

const _rxjsObservableConfig2 = _interopRequireDefault(_rxjsObservableConfig)

const _rxjs4ObservableConfig = require('../rxjs4ObservableConfig')

const _rxjs4ObservableConfig2 = _interopRequireDefault(_rxjs4ObservableConfig)

const _mostObservableConfig = require('../mostObservableConfig')

const _mostObservableConfig2 = _interopRequireDefault(_mostObservableConfig)

const _xstreamObservableConfig = require('../xstreamObservableConfig')

const _xstreamObservableConfig2 = _interopRequireDefault(
  _xstreamObservableConfig
)

const _baconObservableConfig = require('../baconObservableConfig')

const _baconObservableConfig2 = _interopRequireDefault(_baconObservableConfig)

const _kefirObservableConfig = require('../kefirObservableConfig')

const _kefirObservableConfig2 = _interopRequireDefault(_kefirObservableConfig)

const _flydObservableConfig = require('../flydObservableConfig')

const _flydObservableConfig2 = _interopRequireDefault(_flydObservableConfig)

const _setObservableConfig = require('../setObservableConfig')

const _setObservableConfig2 = _interopRequireDefault(_setObservableConfig)

const _componentFromStream = require('../componentFromStream')

const _componentFromStream2 = _interopRequireDefault(_componentFromStream)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const testTransform = function testTransform(transform) {
  const Double = (0, _componentFromStream2.default)(transform)
  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(Double, { n: 112 })
  )
  const div = wrapper.find('div')
  expect(div.text()).toBe('224')
  wrapper.setProps({ n: 358 })
  expect(div.text()).toBe('716')
}

test('works with RxJS 5', () => {
  ;(0, _setObservableConfig2.default)(_rxjsObservableConfig2.default)
  testTransform(props$ =>
    props$.map(_ref => {
      const n = _ref.n
      return _react2.default.createElement('div', null, n * 2)
    })
  )
})

test('works with RxJS 4', () => {
  ;(0, _setObservableConfig2.default)(_rxjs4ObservableConfig2.default)
  testTransform(props$ =>
    props$.map(_ref2 => {
      const n = _ref2.n
      return _react2.default.createElement('div', null, n * 2)
    })
  )
})

test('works with most', () => {
  ;(0, _setObservableConfig2.default)(_mostObservableConfig2.default)
  testTransform(props$ =>
    props$.map(_ref3 => {
      const n = _ref3.n
      return _react2.default.createElement('div', null, n * 2)
    })
  )
})

test('works with xstream', () => {
  ;(0, _setObservableConfig2.default)(_xstreamObservableConfig2.default)
  testTransform(props$ =>
    props$.map(_ref4 => {
      const n = _ref4.n
      return _react2.default.createElement('div', null, n * 2)
    })
  )
})

test('works with bacon', () => {
  ;(0, _setObservableConfig2.default)(_baconObservableConfig2.default)
  testTransform(props$ =>
    props$.map(_ref5 => {
      const n = _ref5.n
      return _react2.default.createElement('div', null, n * 2)
    })
  )
})

test('works with kefir', () => {
  ;(0, _setObservableConfig2.default)(_kefirObservableConfig2.default)
  testTransform(props$ =>
    props$.map(_ref6 => {
      const n = _ref6.n
      return _react2.default.createElement('div', null, n * 2)
    })
  )
})

test('works with flyd', () => {
  ;(0, _setObservableConfig2.default)(_flydObservableConfig2.default)
  testTransform(props$ =>
    props$.map(_ref7 => {
      const n = _ref7.n
      return _react2.default.createElement('div', null, n * 2)
    })
  )
})

// # sourceMappingURL=setObservableConfig-test.js.map
