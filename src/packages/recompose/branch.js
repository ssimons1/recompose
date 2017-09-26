import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @description Accepts a test function and two higher-order components. The test function is passed the props from the owner. If it returns true, the left higher-order component is applied to BaseComponent; otherwise, the right higher-order component is applied. If the right is not supplied, it will by default render the wrapped component.
 * @param {function} test
 * @param {HigherOrderComponent} left
 * @param {HigherOrderComponent} right
 *  
 */

const identity = Component => Component

const branch = (test, left, right = identity) => BaseComponent => {
  let leftFactory
  let rightFactory
  const Branch = props => {
    if (test(props)) {
      leftFactory = leftFactory || createEagerFactory(left(BaseComponent))
      return leftFactory(props)
    }
    rightFactory = rightFactory || createEagerFactory(right(BaseComponent))
    return rightFactory(props)
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'branch'))(Branch)
  }
  return Branch
}

export default branch
