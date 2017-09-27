Object.defineProperty(exports, '__esModule', {
  value: true,
})
/**
 * @name setObservableConfig
 * @description Sets a global observable transform that is applied automatically.
 * @example
 * import Rx from 'rxjs'
 * import { setObservableConfig } from 'recompose'
 * 
 * setObservableConfig({
 *   // Converts a plain ES observable to an RxJS 5 observable
 *   fromESObservable: Rx.Observable.from
 * })
 */

let _config = {
  fromESObservable: null,
  toESObservable: null,
}

const configureObservable = function configureObservable(c) {
  _config = c
}

const config = (exports.config = {
  fromESObservable: function fromESObservable(observable) {
    return typeof _config.fromESObservable === 'function'
      ? _config.fromESObservable(observable)
      : observable
  },
  toESObservable: function toESObservable(stream) {
    return typeof _config.toESObservable === 'function'
      ? _config.toESObservable(stream)
      : stream
  },
})

exports.default = configureObservable

// # sourceMappingURL=setObservableConfig.js.map
