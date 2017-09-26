/* eslint-disable no-console */
import { Component } from 'react'
import createEagerFactory from './createEagerFactory'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import mapValues from './utils/mapValues'

/**
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

const withHandlers = handlers => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  class WithHandlers extends Component {
    cachedHandlers = {}

    handlers = mapValues(
      typeof handlers === 'function' ? handlers(this.props) : handlers,
      (createHandler, handlerName) => (...args) => {
        const cachedHandler = this.cachedHandlers[handlerName]
        if (cachedHandler) {
          return cachedHandler(...args)
        }

        const handler = createHandler(this.props)
        this.cachedHandlers[handlerName] = handler

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

        return handler(...args)
      }
    )

    componentWillReceiveProps() {
      this.cachedHandlers = {}
    }

    render() {
      return factory({
        ...this.props,
        ...this.handlers,
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withHandlers'))(
      WithHandlers
    )
  }
  return WithHandlers
}

export default withHandlers
