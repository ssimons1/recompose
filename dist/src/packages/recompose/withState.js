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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
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
 * @name withState
 * @description Passes two additional props to the base component: a state value, and a function to update that state value.
 * The state updater has the following signature:
 * stateUpdater<T>((prevValue: T) => T, ?callback: Function): void
 * stateUpdater(newValue: any, ?callback: Function): void
 * @param {string} stateName 
 * @param {string} stateUpdaterName 
 * @param initialState 
 * @example
 * The first form accepts a function which maps the previous state value to a new state value. You'll likely want to use this state updater along with withHandlers() to create specific updater functions. For example, to create an HoC that adds basic counting functionality to a component:
 * 
 * const addCounting = compose(
 * withState('counter', 'setCounter', 0),
 * withHandlers({
 *   increment: ({ setCounter }) => () => setCounter(n => n + 1),
 *   decrement: ({ setCounter }) => () =>  setCounter(n => n - 1),
 *   reset: ({ setCounter }) => () => setCounter(0)
 * })
 *)
 *
 * The second form accepts a single value, which is used as the new state.
 * Both forms accept an optional second parameter, a callback function that will be executed once setState() is completed and the component is re-rendered.
 * An initial state value is required. It can be either the state value itself, or a function that returns an initial state given the initial props.
 */

const withState = function withState(
  stateName,
  stateUpdaterName,
  initialState
) {
  return function(BaseComponent) {
    const factory = (0, _createEagerFactory2.default)(BaseComponent)

    const WithState = (function(_Component) {
      _inherits(WithState, _Component)

      function WithState() {
        let _ref

        let _temp, _this, _ret

        _classCallCheck(this, WithState)

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
              WithState.__proto__ ||
              Object.getPrototypeOf(WithState)).call.apply(
              _ref,
              [this].concat(args)
            )
          )),
          _this)),
          (_this.state = {
            stateValue:
              typeof initialState === 'function'
                ? initialState(_this.props)
                : initialState,
          }),
          (_this.updateStateValue = function(updateFn, callback) {
            return _this.setState(_ref2 => {
              const stateValue = _ref2.stateValue
              return {
                stateValue:
                  typeof updateFn === 'function'
                    ? updateFn(stateValue)
                    : updateFn,
              }
            }, callback)
          }),
          _temp)),
          _possibleConstructorReturn(_this, _ret)
        )
      }

      _createClass(WithState, [
        {
          key: 'render',
          value: function render() {
            let _Object$assign

            return factory(
              Object.assign(
                {},
                this.props,
                ((_Object$assign = {}),
                _defineProperty(
                  _Object$assign,
                  stateName,
                  this.state.stateValue
                ),
                _defineProperty(
                  _Object$assign,
                  stateUpdaterName,
                  this.updateStateValue
                ),
                _Object$assign)
              )
            )
          },
        },
      ])

      return WithState
    })(_react.Component)

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'withState')
      )(WithState)
    }
    return WithState
  }
}

exports.default = withState

// # sourceMappingURL=withState.js.map
