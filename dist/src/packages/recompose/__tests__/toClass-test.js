const _createClass = (function() {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _propTypes = require('prop-types')

const _propTypes2 = _interopRequireDefault(_propTypes)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      `Super expression must either be null or a function, not ${typeof superClass}`
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

test('toClass returns the base component if it is already a class', () => {
  const BaseComponent = (function(_React$Component) {
    _inherits(BaseComponent, _React$Component)

    function BaseComponent() {
      _classCallCheck(this, BaseComponent)

      return _possibleConstructorReturn(
        this,
        (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).apply(
          this,
          arguments
        )
      )
    }

    _createClass(BaseComponent, [
      {
        key: 'render',
        value: function render() {
          return _react2.default.createElement('div', null)
        },
      },
    ])

    return BaseComponent
  })(_react2.default.Component)

  const TestComponent = (0, _.toClass)(BaseComponent)
  expect(TestComponent).toBe(BaseComponent)
})

test('toClass copies propTypes, displayName, contextTypes and defaultProps from base component', () => {
  const StatelessComponent = function StatelessComponent() {
    return _react2.default.createElement('div', null)
  }

  StatelessComponent.displayName = 'Stateless'
  StatelessComponent.propTypes = { foo: _propTypes2.default.string }
  StatelessComponent.contextTypes = { bar: _propTypes2.default.object }
  StatelessComponent.defaultProps = { foo: 'bar', fizz: 'buzz' }

  const TestComponent = (0, _.toClass)(StatelessComponent)

  expect(TestComponent.displayName).toBe('Stateless')
  expect(TestComponent.propTypes).toEqual({ foo: _propTypes2.default.string })
  expect(TestComponent.contextTypes).toEqual({
    bar: _propTypes2.default.object,
  })
  expect(TestComponent.defaultProps).toEqual({ foo: 'bar', fizz: 'buzz' })
})

test('toClass passes defaultProps correctly', () => {
  const StatelessComponent = _sinon2.default.spy(() => null)

  StatelessComponent.displayName = 'Stateless'
  StatelessComponent.propTypes = { foo: _propTypes2.default.string }
  StatelessComponent.contextTypes = { bar: _propTypes2.default.object }
  StatelessComponent.defaultProps = { foo: 'bar', fizz: 'buzz' }

  const TestComponent = (0, _.toClass)(StatelessComponent)
  ;(0, _enzyme.mount)(_react2.default.createElement(TestComponent, null))
  expect(StatelessComponent.lastCall.args[0].foo).toBe('bar')
  expect(StatelessComponent.lastCall.args[0].fizz).toBe('buzz')
})

test('toClass passes context and props correctly', () => {
  const store = {}

  let Provider = (function(_React$Component2) {
    _inherits(Provider, _React$Component2)

    function Provider() {
      _classCallCheck(this, Provider)

      return _possibleConstructorReturn(
        this,
        (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(
          this,
          arguments
        )
      )
    }

    _createClass(Provider, [
      {
        key: 'render',
        value: function render() {
          return this.props.children
        },
      },
    ])

    return Provider
  })(_react2.default.Component)

  Provider.propTypes = {
    children: _propTypes2.default.node,
  }

  Provider = (0, _.compose)(
    (0, _.withContext)({ store: _propTypes2.default.object }, props => ({
      store: props.store,
    }))
  )(Provider)

  const StatelessComponent = function StatelessComponent(props, context) {
    return _react2.default.createElement('div', {
      'data-props': props,
      'data-context': context,
    })
  }

  StatelessComponent.contextTypes = { store: _propTypes2.default.object }

  const TestComponent = (0, _.toClass)(StatelessComponent)

  const div = (0, _enzyme.mount)(
    _react2.default.createElement(
      Provider,
      { store },
      _react2.default.createElement(TestComponent, { fizz: 'fizzbuzz' })
    )
  ).find('div')

  expect(div.prop('data-props').fizz).toBe('fizzbuzz')
  expect(div.prop('data-context').store).toBe(store)
})

test('toClass works with strings (DOM components)', () => {
  const Div = (0, _.toClass)('div')
  const div = (0, _enzyme.mount)(
    _react2.default.createElement(Div, null, 'Hello')
  )
  expect(div.html()).toBe('<div>Hello</div>')
})

// # sourceMappingURL=toClass-test.js.map
