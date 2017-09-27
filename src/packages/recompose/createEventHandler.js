import $$observable from 'symbol-observable'
import { createChangeEmitter } from 'change-emitter'
import { config as globalConfig } from './setObservableConfig'

/**
 * @name createEventHandlerWithConfig
 * @description createEventHandlerWithConfig is an alternative to createEventHandler() that accepts an observable config and returns a customized createEventHandler() that uses the specified observable library. See [componentFromStreamWithConfig()](http://www.bitsrc.io/recompose/recompose/observable-utilities/component-from-stream).
 * @param {object} config
 */

export const createEventHandlerWithConfig = config => () => {
  const emitter = createChangeEmitter()
  const stream = config.fromESObservable({
    subscribe(observer) {
      const unsubscribe = emitter.listen(value => observer.next(value))
      return { unsubscribe }
    },
    [$$observable]() {
      return this
    },
  })
  return {
    handler: emitter.emit,
    stream,
  }
}

/**
 * @name createEventHandler
 * @description Returns an object with properties handler and stream. stream is an observable sequence, and handler is a function that pushes new values onto the sequence. Useful for creating event handlers like onClick.
 * @param {object} config
 */

const createEventHandler = createEventHandlerWithConfig(globalConfig)

export default createEventHandler
