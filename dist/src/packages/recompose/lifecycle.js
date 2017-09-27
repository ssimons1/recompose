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

const _setDisplayName = require('./setDisplayName')

const _setDisplayName2 = _interopRequireDefault(_setDisplayName)

const _wrapDisplayName = require('./wrapDisplayName')

const _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName)

const _createEagerFactory = require('./createEagerFactory')

const _createEagerFactory2 = _interopRequireDefault(_createEagerFactory)

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
} /* eslint-disable no-console */

/**
 * @name lifecycle
 * @description A higher-order component version of React.Component(). It supports the entire Component API, except the render() method, which is implemented by default (and overridden if specified; an error will be logged to the console). You should use this helper as an escape hatch, in case you need to access component lifecycle methods.
 * Any state changes made in a lifecycle method, by using setState, will be propagated to the wrapped component as props.
 * @param {object} spec 
 */

const lifecycle = function lifecycle(spec) {
  return function(BaseComponent) {
    const factory = (0, _createEagerFactory2.default)(BaseComponent)

    if (
      process.env.NODE_ENV !== 'production' &&
      spec.hasOwnProperty('render')
    ) {
      console.error(
        'lifecycle() does not support the render method; its behavior is to ' +
          'pass all props and state to the base component.'
      )
    }

    const Lifecycle = (function(_Component) {
      _inherits(Lifecycle, _Component)

      function Lifecycle() {
        _classCallCheck(this, Lifecycle)

        return _possibleConstructorReturn(
          this,
          (Lifecycle.__proto__ || Object.getPrototypeOf(Lifecycle)).apply(
            this,
            arguments
          )
        )
      }

      _createClass(Lifecycle, [
        {
          key: 'render',
          value: function render() {
            return factory(Object.assign({}, this.props, this.state))
          },
        },
      ])

      return Lifecycle
    })(_react.Component)

    Object.keys(spec).forEach(hook => (Lifecycle.prototype[hook] = spec[hook]))

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'lifecycle')
      )(Lifecycle)
    }
    return Lifecycle
  }
}

exports.default = lifecycle

// # sourceMappingURL=lifecycle.js.map
