Object.defineProperty(exports, '__esModule', {
  value: true,
})

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

const _getDisplayName = require('./getDisplayName')

const _getDisplayName2 = _interopRequireDefault(_getDisplayName)

const _isClassComponent = require('./isClassComponent')

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

/**
 * @name toClass
 * @description Takes a function component and wraps it in a class. This can be used as a fallback for libraries that need to add a ref to a component, like Relay.
 * If the base component is already a class, it returns the given component.
 */

const toClass = function toClass(baseComponent) {
  if ((0, _isClassComponent2.default)(baseComponent)) {
    return baseComponent
  }

  const ToClass = (function(_Component) {
    _inherits(ToClass, _Component)

    function ToClass() {
      _classCallCheck(this, ToClass)

      return _possibleConstructorReturn(
        this,
        (ToClass.__proto__ || Object.getPrototypeOf(ToClass)).apply(
          this,
          arguments
        )
      )
    }

    _createClass(ToClass, [
      {
        key: 'render',
        value: function render() {
          if (typeof baseComponent === 'string') {
            return _react2.default.createElement(baseComponent, this.props)
          }
          return baseComponent(this.props, this.context)
        },
      },
    ])

    return ToClass
  })(_react.Component)

  ToClass.displayName = (0, _getDisplayName2.default)(baseComponent)
  ToClass.propTypes = baseComponent.propTypes
  ToClass.contextTypes = baseComponent.contextTypes
  ToClass.defaultProps = baseComponent.defaultProps

  return ToClass
}

exports.default = toClass

// # sourceMappingURL=toClass.js.map
