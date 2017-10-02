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
}

/**
 * @name shouldUpdate
 * @description Higher-order component version of shouldComponentUpdate(). The test function accepts both the current props and the next props.
 * @param {object} test
 */

const shouldUpdate = function shouldUpdate(test) {
  return function(BaseComponent) {
    const factory = (0, _createEagerFactory2.default)(BaseComponent)

    const ShouldUpdate = (function(_Component) {
      _inherits(ShouldUpdate, _Component)

      function ShouldUpdate() {
        _classCallCheck(this, ShouldUpdate)

        return _possibleConstructorReturn(
          this,
          (ShouldUpdate.__proto__ || Object.getPrototypeOf(ShouldUpdate))
            .apply(this, arguments)
        )
      }

      _createClass(ShouldUpdate, [
        {
          key: 'shouldComponentUpdate',
          value: function shouldComponentUpdate(nextProps) {
            return test(this.props, nextProps)
          },
        },
        {
          key: 'render',
          value: function render() {
            return factory(this.props)
          },
        },
      ])

      return ShouldUpdate
    })(_react.Component)

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'shouldUpdate')
      )(ShouldUpdate)
    }
    return ShouldUpdate
  }
}

exports.default = shouldUpdate

// # sourceMappingURL=shouldUpdate.js.map
