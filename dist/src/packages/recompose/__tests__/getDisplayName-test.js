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

const _getDisplayName = require('../getDisplayName')

const _getDisplayName2 = _interopRequireDefault(_getDisplayName)

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

test('getDisplayName gets the display name of a React component', () => {
  const SomeComponent = (function(_React$Component) {
    _inherits(SomeComponent, _React$Component)

    function SomeComponent() {
      _classCallCheck(this, SomeComponent)

      return _possibleConstructorReturn(
        this,
        (SomeComponent.__proto__ || Object.getPrototypeOf(SomeComponent))
          .apply(this, arguments)
      )
    }

    _createClass(SomeComponent, [
      {
        key: 'render',
        value: function render() {
          return _react2.default.createElement('div', null)
        },
      },
    ])

    return SomeComponent
  })(_react2.default.Component)

  const SomeOtherComponent = (function(_React$Component2) {
    _inherits(SomeOtherComponent, _React$Component2)

    function SomeOtherComponent() {
      _classCallCheck(this, SomeOtherComponent)

      return _possibleConstructorReturn(
        this,
        (SomeOtherComponent.__proto__ ||
          Object.getPrototypeOf(SomeOtherComponent))
          .apply(this, arguments)
      )
    }

    _createClass(SomeOtherComponent, [
      {
        key: 'render',
        value: function render() {
          return _react2.default.createElement('div', null)
        },
      },
    ])

    return SomeOtherComponent
  })(_react2.default.Component)

  SomeOtherComponent.displayName = 'CustomDisplayName'

  function YetAnotherComponent() {
    return _react2.default.createElement('div', null)
  }

  expect((0, _getDisplayName2.default)(SomeComponent)).toBe('SomeComponent')
  expect((0, _getDisplayName2.default)(SomeOtherComponent)).toBe(
    'CustomDisplayName'
  )
  expect((0, _getDisplayName2.default)(YetAnotherComponent)).toBe(
    'YetAnotherComponent'
  )
  expect(
    (0, _getDisplayName2.default)(() =>
      _react2.default.createElement('div', null)
    )
  ).toBe('Component')
  expect((0, _getDisplayName2.default)('div')).toBe('div')
})

// # sourceMappingURL=getDisplayName-test.js.map
