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

const _createEagerFactory = require('./createEagerFactory')

const _createEagerFactory2 = _interopRequireDefault(_createEagerFactory)

const _setDisplayName = require('./setDisplayName')

const _setDisplayName2 = _interopRequireDefault(_setDisplayName)

const _wrapDisplayName = require('./wrapDisplayName')

const _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName)

const _mapValues = require('./utils/mapValues')

const _mapValues2 = _interopRequireDefault(_mapValues)

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
 * @name withHandlers
 * @description Takes an object map of handler creators or a factory function. These are higher-order functions that accept a set of props and return a function handler:
 * This allows the handler to access the current props via closure, without needing to change its signature.
 * Handlers are passed to the base component as immutable props, whose identities are preserved across renders. This avoids a common pitfall where functional components create handlers inside the body of the function, which results in a new handler on every render and breaks downstream shouldComponentUpdate() optimizations that rely on prop equality. This is the main reason to use withHandlers to create handlers instead of using [mapProps](http://www.bitsrc.io/recompose/recompose/higher-order-components/map-props) or [withProps](http://www.bitsrc.io/recompose/recompose/higher-order-components/with-props), which will create new handlers every time when it get updated.
 * @param {object | func} handlers
 * @example
 * const enhance = compose(
 *   withState('value', 'updateValue', ''),
 *   withHandlers({
 *     onChange: props => event => {
 *       props.updateValue(event.target.value)
 *     },
 *     onSubmit: props => event => {
 *       event.preventDefault()
 *       submitForm(props.value)
 *     }
 *   })
 * )
 * 
 * const Form = enhance(({ value, onChange, onSubmit }) =>
 *   <form onSubmit={onSubmit}>
 *     <label>Value
 *       <input type="text" value={value} onChange={onChange} />
 *     </label>
 *   </form>
 * )
 */

const withHandlers = function withHandlers(handlers) {
  return function(BaseComponent) {
    const factory = (0, _createEagerFactory2.default)(BaseComponent)

    const WithHandlers = (function(_Component) {
      _inherits(WithHandlers, _Component)

      function WithHandlers() {
        let _ref

        let _temp, _this, _ret

        _classCallCheck(this, WithHandlers)

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        return (
          (_ret = ((_temp = ((_this = _possibleConstructorReturn(
            this,
            (_ref =
              WithHandlers.__proto__ ||
              Object.getPrototypeOf(WithHandlers)).call.apply(
              _ref,
              [this].concat(args)
            )
          )),
          _this)),
          _initialiseProps.call(_this),
          _temp)),
          _possibleConstructorReturn(_this, _ret)
        )
      }

      _createClass(WithHandlers, [
        {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps() {
            this.cachedHandlers = {}
          },
        },
        {
          key: 'render',
          value: function render() {
            return factory(Object.assign({}, this.props, this.handlers))
          },
        },
      ])

      return WithHandlers
    })(_react.Component)

    var _initialiseProps = function _initialiseProps() {
      const _this2 = this

      this.cachedHandlers = {}
      this.handlers = (0, _mapValues2.default)(
        typeof handlers === 'function' ? handlers(this.props) : handlers,
        (createHandler, handlerName) =>
          function() {
            const cachedHandler = _this2.cachedHandlers[handlerName]
            if (cachedHandler) {
              return cachedHandler(...arguments)
            }

            const handler = createHandler(_this2.props)
            _this2.cachedHandlers[handlerName] = handler

            if (
              process.env.NODE_ENV !== 'production' &&
              typeof handler !== 'function'
            ) {
              console.error(
                // eslint-disable-line no-console
                'withHandlers(): Expected a map of higher-order functions. ' +
                  'Refer to the docs for more info.'
              )
            }

            return handler(...arguments)
          }
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'withHandlers')
      )(WithHandlers)
    }
    return WithHandlers
  }
}

exports.default = withHandlers

// # sourceMappingURL=withHandlers.js.map
