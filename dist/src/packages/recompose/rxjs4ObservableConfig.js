Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _symbolObservable = require('symbol-observable')

const _symbolObservable2 = _interopRequireDefault(_symbolObservable)

const _rx = require('rx')

const _rx2 = _interopRequireDefault(_rx)

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

const config = {
  fromESObservable: function fromESObservable(observable) {
    return _rx2.default.Observable.create(observer => {
      let _observable$subscribe = observable.subscribe({
          next: function next(val) {
            return observer.onNext(val)
          },
          error: function error(_error) {
            return observer.onError(_error)
          },
          complete: function complete() {
            return observer.onCompleted()
          },
        }),
        unsubscribe = _observable$subscribe.unsubscribe

      return unsubscribe
    })
  },
  toESObservable: function toESObservable(rxObservable) {
    return _defineProperty(
      {
        subscribe: function subscribe(observer) {
          const subscription = rxObservable.subscribe(
            val => observer.next(val),
            error => observer.error(error),
            () => observer.complete()
          )
          return {
            unsubscribe: function unsubscribe() {
              return subscription.dispose()
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

// # sourceMappingURL=rxjs4ObservableConfig.js.map
