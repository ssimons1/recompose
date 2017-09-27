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
 * @name createSink
 * @description Creates a component that renders nothing (null) but calls a callback when receiving new props.
 * @param {function} callback 
 */

const createSink = function createSink(callback) {
  return (function(_Component) {
    _inherits(Sink, _Component)

    function Sink() {
      _classCallCheck(this, Sink)

      return _possibleConstructorReturn(
        this,
        (Sink.__proto__ || Object.getPrototypeOf(Sink)).apply(this, arguments)
      )
    }

    _createClass(Sink, [
      {
        key: 'componentWillMount',
        value: function componentWillMount() {
          callback(this.props)
        },
      },
      {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          callback(nextProps)
        },
      },
      {
        key: 'render',
        value: function render() {
          return null
        },
      },
    ])

    return Sink
  })(_react.Component)
}

exports.default = createSink

// # sourceMappingURL=createSink.js.map
