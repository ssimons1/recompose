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

const _shallowEqual = require('./shallowEqual')

const _shallowEqual2 = _interopRequireDefault(_shallowEqual)

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
}

/**
 * @name withStateHandlers
 * @description Passes state object properties and immutable updater functions in a form of (...payload: any[]) => Object to the base component.
 * Every state updater function accepts state, props and payload and must return a new state or undefined. The new state is shallowly merged with the previous state. Returning undefined does not cause a component rerender.
 * @param {object | function} initialState 
 * @param {object} stateUpdaters 
 * @example
 *  const Counter = withStateHandlers(
 *    ({ initialCounter = 0 }) => ({
 *      counter: initialCounter,
 *    }),
 *    {
 *      incrementOn: ({ counter }) => (value) => ({
 *        counter: counter + value,
 *      }),
 *      decrementOn: ({ counter }) => (value) => ({
 *        counter: counter - value,
 *      }),
 *      resetCounter: (_, { initialCounter = 0 }) => () => ({
 *        counter: initialCounter,
 *      }),
 *    }
 *  )(
 *    ({ counter, incrementOn, decrementOn, resetCounter }) =>
 *      <div>
 *        <Button onClick={() => incrementOn(2)}>Inc</Button>
 *        <Button onClick={() => decrementOn(3)}>Dec</Button>
 *        <Button onClick={resetCounter}>Dec</Button>
 *      </div>
 *  )
 */

const withStateHandlers = function withStateHandlers(
  initialState,
  stateUpdaters
) {
  return function(BaseComponent) {
    const factory = (0, _createEagerFactory2.default)(BaseComponent)

    const WithStateHandlers = (function(_Component) {
      _inherits(WithStateHandlers, _Component)

      function WithStateHandlers() {
        let _ref

        let _temp, _this, _ret

        _classCallCheck(this, WithStateHandlers)

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
                WithStateHandlers.__proto__ ||
                Object.getPrototypeOf(WithStateHandlers)).call.apply(
                _ref,
                [this].concat(args)
              )
            )),
            _this
          )),
          _initialiseProps.call(_this),
          _temp
        )), _possibleConstructorReturn(_this, _ret)
      }

      _createClass(WithStateHandlers, [
        {
          key: 'shouldComponentUpdate',
          value: function shouldComponentUpdate(nextProps, nextState) {
            const propsChanged = nextProps !== this.props
            // the idea is to skip render if stateUpdater handler return undefined
            // this allows to create no state update handlers with access to state and props
            const stateChanged = !(0, _shallowEqual2.default)(
              nextState,
              this.state
            )
            return propsChanged || stateChanged
          },
        },
        {
          key: 'render',
          value: function render() {
            return factory(
              Object.assign({}, this.props, this.state, this.stateUpdaters)
            )
          },
        },
      ])

      return WithStateHandlers
    })(_react.Component)

    var _initialiseProps = function _initialiseProps() {
      const _this2 = this

      this.state =
        typeof initialState === 'function'
          ? initialState(this.props)
          : initialState
      this.stateUpdaters = (0, _mapValues2.default)(
        stateUpdaters,
        handler =>
          function(mayBeEvent) {
            for (
              var _len2 = arguments.length,
                args = Array(_len2 > 1 ? _len2 - 1 : 0),
                _key2 = 1;
              _key2 < _len2;
              _key2++
            ) {
              args[_key2 - 1] = arguments[_key2]
            }

            // Having that functional form of setState can be called async
            // we need to persist SyntheticEvent
            if (mayBeEvent && typeof mayBeEvent.persist === 'function') {
              mayBeEvent.persist()
            }

            _this2.setState((state, props) =>
              handler(state, props)(...[mayBeEvent].concat(args))
            )
          }
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'withStateHandlers')
      )(WithStateHandlers)
    }
    return WithStateHandlers
  }
}

exports.default = withStateHandlers

// # sourceMappingURL=withStateHandlers.js.map
