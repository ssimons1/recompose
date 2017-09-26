import { Component } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @description Higher-order component version of shouldComponentUpdate(). The test function accepts both the current props and the next props.
 * @param {object} test
 */

const shouldUpdate = test => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  class ShouldUpdate extends Component {
    shouldComponentUpdate(nextProps) {
      return test(this.props, nextProps)
    }

    render() {
      return factory(this.props)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'shouldUpdate'))(
      ShouldUpdate
    )
  }
  return ShouldUpdate
}

export default shouldUpdate
