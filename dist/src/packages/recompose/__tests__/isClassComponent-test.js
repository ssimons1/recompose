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

const _createReactClass = require('create-react-class')

const _createReactClass2 = _interopRequireDefault(_createReactClass)

const _isClassComponent = require('../isClassComponent')

const _isClassComponent2 = _interopRequireDefault(_isClassComponent)

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

test('isClassComponent returns false for functions', () => {
  const Foo = function Foo() {
    return _react2.default.createElement('div', null)
  }

  expect((0, _isClassComponent2.default)(Foo)).toBe(false)
})

test('isClassComponent returns true for React component classes', () => {
  const Foo = (function(_Component) {
    _inherits(Foo, _Component)

    function Foo() {
      _classCallCheck(this, Foo)

      return _possibleConstructorReturn(
        this,
        (Foo.__proto__ || Object.getPrototypeOf(Foo)).apply(this, arguments)
      )
    }

    _createClass(Foo, [
      {
        key: 'render',
        value: function render() {
          return _react2.default.createElement('div', null)
        },
      },
    ])

    return Foo
  })(_react.Component)

  /* eslint-disable react/prefer-es6-class */

  const Bar = (0, _createReactClass2.default)({
    displayName: 'Bar',
    render: function render() {
      return _react2.default.createElement('div', null)
    },
  })
  /* eslint-enable react/prefer-es6-class */

  expect((0, _isClassComponent2.default)(Foo)).toBe(true)
  expect((0, _isClassComponent2.default)(Bar)).toBe(true)
})

// # sourceMappingURL=isClassComponent-test.js.map
