Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.countRenders = undefined

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

const _setDisplayName = require('../setDisplayName')

const _setDisplayName2 = _interopRequireDefault(_setDisplayName)

const _wrapDisplayName = require('../wrapDisplayName')

const _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName)

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

const countRenders = (exports.countRenders = function countRenders(
  BaseComponent
) {
  const CountRenders = (function(_React$Component) {
    _inherits(CountRenders, _React$Component)

    function CountRenders() {
      let _ref

      let _temp, _this, _ret

      _classCallCheck(this, CountRenders)

      for (
        var _len = arguments.length, args = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }

      return (_ret = (
        (_temp = (
          (_this = _possibleConstructorReturn(
            this,
            (_ref =
              CountRenders.__proto__ ||
              Object.getPrototypeOf(CountRenders)).call.apply(
              _ref,
              [this].concat(args)
            )
          )),
          _this
        )),
        (_this.renderCount = 0),
        _temp
      )), _possibleConstructorReturn(_this, _ret)
    }

    _createClass(CountRenders, [
      {
        key: 'render',
        value: function render() {
          this.renderCount += 1
          return _react2.default.createElement(
            BaseComponent,
            Object.assign({ renderCount: this.renderCount }, this.props)
          )
        },
      },
    ])

    return CountRenders
  })(_react2.default.Component)

  return (0, _setDisplayName2.default)(
    (0, _wrapDisplayName2.default)(BaseComponent, 'countRenders')
  )(CountRenders)
})

// # sourceMappingURL=utils.js.map
