Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.createEventHandlerWithConfig = undefined

const _symbolObservable = require('symbol-observable')

const _symbolObservable2 = _interopRequireDefault(_symbolObservable)

const _changeEmitter = require('change-emitter')

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

/**
 * @name createEventHandlerWithConfig
 * @description createEventHandlerWithConfig is an alternative to createEventHandler() that accepts an observable config and returns a customized createEventHandler() that uses the specified observable library. See [componentFromStreamWithConfig()](http://www.bitsrc.io/recompose/recompose/observable-utilities/component-from-stream).
 * @param {object} config
 */

const createEventHandlerWithConfig = (exports.createEventHandlerWithConfig = function createEventHandlerWithConfig(
  config
) {
  return function() {
    const emitter = (0, _changeEmitter.createChangeEmitter)()
    const stream = config.fromESObservable(
      _defineProperty(
        {
          subscribe: function subscribe(observer) {
            const unsubscribe = emitter.listen(value => observer.next(value))
            return { unsubscribe }
          },
        },
        _symbolObservable2.default,
        function() {
          return this
        }
      )
    )
    return {
      handler: emitter.emit,
      stream,
    }
  }
})

/**
 * @name createEventHandler
 * @description Returns an object with properties handler and stream. stream is an observable sequence, and handler is a function that pushes new values onto the sequence. Useful for creating event handlers like onClick.
 * @param {object} config
 */

const createEventHandler = createEventHandlerWithConfig(
  _setObservableConfig.config
)

exports.default = createEventHandler

// # sourceMappingURL=createEventHandler.js.map
