Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _symbolObservable = require('symbol-observable')

const _symbolObservable2 = _interopRequireDefault(_symbolObservable)

const _flyd = require('flyd')

const _flyd2 = _interopRequireDefault(_flyd)

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

const noop = function noop() {}

const config = {
  fromESObservable: function fromESObservable(observable) {
    const stream = _flyd2.default.stream()

    let _observable$subscribe = observable.subscribe({
        next: function next(value) {
          return stream(value)
        },
        error: function error(_error) {
          return stream({ error: _error })
        },
        complete: function complete() {
          return stream.end(true)
        },
      }),
      unsubscribe = _observable$subscribe.unsubscribe

    _flyd2.default.on(unsubscribe, stream.end)
    return stream
  },

  toESObservable: function toESObservable(stream) {
    return _defineProperty(
      {
        subscribe: function subscribe(observer) {
          const sub = _flyd2.default.on(observer.next || noop, stream)
          _flyd2.default.on(_ => observer.complete(), sub.end)
          return {
            unsubscribe: function unsubscribe() {
              return sub.end(true)
            },
          }
        },
      },
      _symbolObservable2.default,
      function() {
        return this
      }
    )
  },
}

exports.default = config

// # sourceMappingURL=flydObservableConfig.js.map
