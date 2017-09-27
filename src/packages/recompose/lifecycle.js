/* eslint-disable no-console */
import { Component } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @name lifecycle
 * @description A higher-order component version of React.Component(). It supports the entire Component API, except the render() method, which is implemented by default (and overridden if specified; an error will be logged to the console). You should use this helper as an escape hatch, in case you need to access component lifecycle methods.
 * Any state changes made in a lifecycle method, by using setState, will be propagated to the wrapped component as props.
 * @param {object} spec 
 */

const lifecycle = spec => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)

  if (process.env.NODE_ENV !== 'production' && spec.hasOwnProperty('render')) {
    console.error(
      'lifecycle() does not support the render method; its behavior is to ' +
        'pass all props and state to the base component.'
    )
  }

  class Lifecycle extends Component {
    render() {
      return factory({
        ...this.props,
        ...this.state,
      })
    }
  }

  Object.keys(spec).forEach(hook => (Lifecycle.prototype[hook] = spec[hook]))

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'lifecycle'))(
      Lifecycle
    )
  }
  return Lifecycle
}

export default lifecycle
