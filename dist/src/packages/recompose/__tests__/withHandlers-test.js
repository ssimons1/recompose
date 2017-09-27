const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('withHandlers passes handlers to base component', () => {
  let submittedFormValue = void 0
  const enhanceForm = (0, _.compose)(
    (0, _.withState)('value', 'updateValue', ''),
    (0, _.withHandlers)({
      onChange: function onChange(props) {
        return function(event) {
          props.updateValue(event.target.value)
        }
      },
      onSubmit: function onSubmit(props) {
        return function() {
          submittedFormValue = props.value
        }
      },
    })
  )

  const Form = enhanceForm(_ref => {
    let value = _ref.value,
      onChange = _ref.onChange,
      onSubmit = _ref.onSubmit
    return _react2.default.createElement(
      'form',
      { onSubmit },
      _react2.default.createElement(
        'label',
        null,
        'Value',
        _react2.default.createElement('input', {
          type: 'text',
          value,
          onChange,
        })
      ),
      _react2.default.createElement('p', null, value)
    )
  })

  const wrapper = (0, _enzyme.mount)(_react2.default.createElement(Form, null))
  const input = wrapper.find('input')
  const output = wrapper.find('p')
  const form = wrapper.find('form')

  input.simulate('change', { target: { value: 'Yay' } })
  expect(output.text()).toBe('Yay')

  input.simulate('change', { target: { value: 'Yay!!' } })
  expect(output.text()).toBe('Yay!!')

  form.simulate('submit')
  expect(submittedFormValue).toBe('Yay!!')
})

test('withHandlers passes immutable handlers', () => {
  const enhance = (0, _.withHandlers)({
    handler: function handler() {
      return function() {
        return null
      }
    },
  })
  const component = _sinon2.default.spy(() => null)
  const Div = enhance(component)

  const wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null))
  wrapper.setProps({ foo: 'bar' })

  expect(component.calledTwice).toBe(true)
  expect(component.firstCall.args[0].handler).toBe(
    component.secondCall.args[0].handler
  )
})

test('withHandlers caches handlers properly', () => {
  const handlerCreationSpy = _sinon2.default.spy()
  const handlerCallSpy = _sinon2.default.spy()

  const enhance = (0, _.withHandlers)({
    handler: function handler(props) {
      handlerCreationSpy(props)
      return function(val) {
        handlerCallSpy(val)
      }
    },
  })

  const component = _sinon2.default.spy(() => null)
  const Div = enhance(component)

  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(Div, { foo: 'bar' })
  )
  const handler = component.firstCall.args[0].handler

  // Don't create handler until it is called

  expect(handlerCreationSpy.callCount).toBe(0)
  expect(handlerCallSpy.callCount).toBe(0)

  handler(1)
  expect(handlerCreationSpy.callCount).toBe(1)
  expect(handlerCreationSpy.args[0]).toEqual([{ foo: 'bar' }])
  expect(handlerCallSpy.callCount).toBe(1)
  expect(handlerCallSpy.args[0]).toEqual([1])

  // Props haven't changed; should use cached handler
  handler(2)
  expect(handlerCreationSpy.callCount).toBe(1)
  expect(handlerCallSpy.callCount).toBe(2)
  expect(handlerCallSpy.args[1]).toEqual([2])

  wrapper.setProps({ foo: 'baz' })
  handler(3)
  // Props did change; handler should be recreated
  expect(handlerCreationSpy.callCount).toBe(2)
  expect(handlerCreationSpy.args[1]).toEqual([{ foo: 'baz' }])
  expect(handlerCallSpy.callCount).toBe(3)
  expect(handlerCallSpy.args[2]).toEqual([3])
})

test('withHandlers warns if handler is not a higher-order function', () => {
  const error = _sinon2.default.stub(console, 'error')

  const Button = (0, _.withHandlers)({
    onClick: function onClick() {},
  })('button')

  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(Button, null)
  )
  const button = wrapper.find('button')

  expect(() => button.simulate('click')).toThrowError(/undefined/)

  expect(error.firstCall.args[0]).toBe(
    'withHandlers(): Expected a map of higher-order functions. Refer to ' +
      'the docs for more info.'
  )

  /* eslint-disable */
  console.error.restore()
  /* eslint-enable */
})

test('withHandlers allow handers to be a factory', () => {
  const enhance = (0, _.withHandlers)(initialProps => {
    let cache_ = void 0

    return {
      handler: function handler() {
        return function() {
          if (cache_) {
            return cache_
          }
          cache_ = Object.assign({}, initialProps)

          return cache_
        }
      },
    }
  })

  const componentHandlers = []
  const componentHandlers2 = []

  const Component = enhance(_ref2 => {
    const handler = _ref2.handler

    componentHandlers.push(handler())
    return null
  })

  const Component2 = enhance(_ref3 => {
    const handler = _ref3.handler

    componentHandlers2.push(handler())
    return null
  })

  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(Component, { hello: 'foo' })
  )
  wrapper.setProps({ hello: 'bar' })
  expect(componentHandlers[0]).toBe(componentHandlers[1])

  // check that cache is not shared
  ;(0, _enzyme.mount)(
    _react2.default.createElement(Component2, { hello: 'foo' })
  )
  expect(componentHandlers[0]).toEqual(componentHandlers2[0])
  expect(componentHandlers[0]).not.toBe(componentHandlers2[0])
})

// # sourceMappingURL=withHandlers-test.js.map
