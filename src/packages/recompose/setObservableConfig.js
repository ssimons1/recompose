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

const configureObservable = c => {
  _config = c
}

export const config = {
  fromESObservable: observable =>
    typeof _config.fromESObservable === 'function'
      ? _config.fromESObservable(observable)
      : observable,
  toESObservable: stream =>
    typeof _config.toESObservable === 'function'
      ? _config.toESObservable(stream)
      : stream,
}

export default configureObservable
