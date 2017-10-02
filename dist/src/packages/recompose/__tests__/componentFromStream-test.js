const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _rxjs = require('rxjs')

const _rxjsObservableConfig = require('../rxjsObservableConfig')

const _rxjsObservableConfig2 = _interopRequireDefault(_rxjsObservableConfig)

const _componentFromStream = require('../componentFromStream')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const componentFromStream = (
  0,
  _componentFromStream.componentFromStreamWithConfig
)(_rxjsObservableConfig2.default)

test('componentFromStream creates a component from a prop stream transformation', () => {
  const Double = componentFromStream(props$ =>
    props$.map(_ref => {
      const n = _ref.n
      return _react2.default.createElement('div', null, n * 2)
    })
  )
  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(Double, { n: 112 })
  )
  const div = wrapper.find('div')
  expect(div.text()).toBe('224')
  wrapper.setProps({ n: 358 })
  expect(div.text()).toBe('716')
})

test('componentFromStream unsubscribes from stream before unmounting', () => {
  let subscriptions = 0
  const vdom$ = new _rxjs.Observable(observer => {
    subscriptions += 1
    observer.next(_react2.default.createElement('div', null))
    return {
      unsubscribe: function unsubscribe() {
        subscriptions -= 1
      },
    }
  })
  const Div = componentFromStream(() => vdom$)
  const wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null))
  expect(subscriptions).toBe(1)
  wrapper.unmount()
  expect(subscriptions).toBe(0)
})

test('componentFromStream renders nothing until the stream emits a value', () => {
  const vdom$ = new _rxjs.Subject()
  const Div = componentFromStream(() =>
    vdom$.mapTo(_react2.default.createElement('div', null))
  )
  const wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null))
  expect(wrapper.find('div').length).toBe(0)
  vdom$.next()
  expect(wrapper.find('div').length).toBe(1)
})

test('handler multiple observers of props stream', () => {
  const Div = componentFromStream((
    props$ // Adds three observers to props stream
  ) =>
    props$.combineLatest(props$, props$, props1 => _react2.default.createElement('div', props1)) ))

  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(Div, { value: 1 })
  )
  const div = wrapper.find('div')

  expect(div.prop('value')).toBe(1)
  wrapper.setProps({ value: 2 })
  expect(div.prop('value')).toBe(2)
})

test('complete props stream before unmounting', () => {
  let counter = 0

  const Div = componentFromStream(props$ => {
    const first$ = props$.first().do(() => {
      counter += 1
    })

    const last$ = props$
      .last()
      .do(() => {
        counter -= 1
      })
      .startWith(null)

    return props$.combineLatest(first$, last$, props1 =>
      _react2.default.createElement('div', props1)
    )
  })

  const wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null))

  expect(counter).toBe(1)
  expect(wrapper.find('div').length).toBe(1)

  wrapper.unmount()
  expect(counter).toBe(0)
})

test('completed props stream should throw an exception', () => {
  const Div = componentFromStream(props$ => {
    const first$ = props$.filter(() => false).first().startWith(null)

    return props$.combineLatest(first$, props1 =>
      _react2.default.createElement('div', props1)
    )
  })

  const wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null))

  expect(wrapper.find('div').length).toBe(1)

  expect(() => wrapper.unmount()).toThrowError(/no elements in sequence/)
})

// # sourceMappingURL=componentFromStream-test.js.map
