Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.componentFromStreamWithConfig = undefined

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

const _changeEmitter = require('change-emitter')

const _symbolObservable = require('symbol-observable')

const _symbolObservable2 = _interopRequireDefault(_symbolObservable)

const _setObservableConfig = require('./setObservableConfig')

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
 * @name componentFromStreamWithConfig
 * @description componentFromStreamWithConfig is an alternative to componentFromStream() that accepts an observable config and returns a customized componentFromStream() which uses the specified observable library. This option is recommended if you want to avoid global state with [setObservableConfig()](http://www.bitsrc.io/recompose/recompose/observable-utilities/set-observable-config).
 * @param {object} config
 */

const componentFromStreamWithConfig = (exports.componentFromStreamWithConfig = function componentFromStreamWithConfig(
  config
) {
  return function(propsToVdom) {
    return (function(_Component) {
      _inherits(ComponentFromStream, _Component)

      function ComponentFromStream() {
        let _ref

        let _temp, _this, _ret

        _classCallCheck(this, ComponentFromStream)

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
                ComponentFromStream.__proto__ ||
                Object.getPrototypeOf(ComponentFromStream)).call.apply(
                _ref,
                [this].concat(args)
              )
            )),
            _this
          )),
          (_this.state = { vdom: null }),
          (_this.propsEmitter = (0, _changeEmitter.createChangeEmitter)()),
          (_this.props$ = config.fromESObservable(
            _defineProperty(
              {
                subscribe: function subscribe(observer) {
                  const unsubscribe = _this.propsEmitter.listen(props => {
                    if (props) {
                      observer.next(props)
                    } else {
                      observer.complete()
                    }
                  })
                  return { unsubscribe }
                },
              },
              _symbolObservable2.default,
              function() {
                return this
              }
            )
          )),
          (_this.vdom$ = config.toESObservable(propsToVdom(_this.props$))),
          _temp
        )), _possibleConstructorReturn(_this, _ret)
      }

      // Stream of props

      // Stream of vdom

      _createClass(ComponentFromStream, [
        {
          key: 'componentWillMount',
          value: function componentWillMount() {
            const _this2 = this

            // Subscribe to child prop changes so we know when to re-render
            this.subscription = this.vdom$.subscribe({
              next: function next(vdom) {
                _this2.setState({ vdom })
              },
            })
            this.propsEmitter.emit(this.props)
          },
        },
        {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            // Receive new props from the owner
            this.propsEmitter.emit(nextProps)
          },
        },
        {
          key: 'shouldComponentUpdate',
          value: function shouldComponentUpdate(nextProps, nextState) {
            return nextState.vdom !== this.state.vdom
          },
        },
        {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            // Call without arguments to complete stream
            this.propsEmitter.emit()

            // Clean-up subscription before un-mounting
            this.subscription.unsubscribe()
          },
        },
        {
          key: 'render',
          value: function render() {
            return this.state.vdom
          },
        },
      ])

      return ComponentFromStream
    })(_react.Component)
  }
})

/**
 * @name componentFromStream
 * @description Creates a React component by mapping an observable stream of props to a stream of React nodes (vdom).
 * You can think of propsToReactNode as a function f such that
 *
 * const vdom$ = f(props$)
 * 
 * where props$ is a stream of props and vdom$ is a stream of React nodes. This formulation similar to the popular notion of React views as a function, often communicated as
 * 
 * v = f(d)
 * @example
 * const Counter = componentFromStream(props$ => {
 *   const { handler: increment, stream: increment$ } = createEventHandler()
 *   const { handler: decrement, stream: decrement$ } = createEventHandler()
 *   const count$ = Observable.merge(
 *       increment$.mapTo(1),
 *       decrement$.mapTo(-1)
 *     )
 *     .startWith(0)
 *     .scan((count, n) => count + n, 0)
 * 
 *   return props$.combineLatest(
 *     count$,
 *     (props, count) =>
 *       <div {...props}>
 *         Count: {count}
 *         <button onClick={increment}>+</button>
 *         <button onClick={decrement}>-</button>
 *       </div>
 *   )
 * })
 * @param {object} propsToVdom
 */

const componentFromStream = function componentFromStream(propsToVdom) {
  return componentFromStreamWithConfig(_setObservableConfig.config)(propsToVdom)
}

exports.default = componentFromStream

// # sourceMappingURL=componentFromStream.js.map
