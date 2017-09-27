const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _setObservableConfig = require('../setObservableConfig')

const _setObservableConfig2 = _interopRequireDefault(_setObservableConfig)

const _rxjs4ObservableConfig = require('../rxjs4ObservableConfig')

const _rxjs4ObservableConfig2 = _interopRequireDefault(_rxjs4ObservableConfig)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

;(0, _setObservableConfig2.default)(_rxjs4ObservableConfig2.default)

// Most of mapPropsStream's functionality is covered by componentFromStream
test('mapPropsStream creates a higher-order component from a stream', () => {
  const Double = (0, _.mapPropsStream)(props$ =>
    props$.map(_ref => {
      const n = _ref.n
      return { children: n * 2 }
    })
  )('div')
  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(Double, { n: 112 })
  )
  const div = wrapper.find('div')
  expect(div.text()).toBe('224')
  wrapper.setProps({ n: 358 })
  expect(div.text()).toBe('716')
})

// # sourceMappingURL=mapPropsStream-test.js.map
