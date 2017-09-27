import { Component } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @name withContext
 * @description Provides context to the component's children. childContextTypes is an object of React prop types. getChildContext() is a function that returns the child context. Use along with [getContext()](http://www.bitsrc.io/recompose/recompose/higher-order-components/get-context).
 * @param {object} childContextTypes 
 * @param {object} getChildContext 
 */

const withContext = (childContextTypes, getChildContext) => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  class WithContext extends Component {
    getChildContext = () => getChildContext(this.props)

    render() {
      return factory(this.props)
    }
  }

  WithContext.childContextTypes = childContextTypes

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withContext'))(
      WithContext
    )
  }
  return WithContext
}

export default withContext
