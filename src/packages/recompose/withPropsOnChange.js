import { Component } from 'react'
import pick from './utils/pick'
import shallowEqual from './shallowEqual'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @description Like [withProps()](http://www.bitsrc.io/recompose/recompose/components/with-props), except the new props are only created when one of the owner props specified by shouldMapOrKeys changes. This helps ensure that expensive computations inside [createProps()](http://www.bitsrc.io/recompose/recompose/components/create-props) are only executed when necessary.
 * Instead of an array of prop keys, the first parameter can also be a function that returns a boolean, given the current props and the next props. This allows you to customize when [createProps()](http://www.bitsrc.io/recompose/recompose/components/create-props) should be called.
 * @param {array} shouldMapOrKeys 
 * 
 */

const withPropsOnChange = (shouldMapOrKeys, propsMapper) => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  const shouldMap =
    typeof shouldMapOrKeys === 'function'
      ? shouldMapOrKeys
      : (props, nextProps) =>
          !shallowEqual(
            pick(props, shouldMapOrKeys),
            pick(nextProps, shouldMapOrKeys)
          )

  class WithPropsOnChange extends Component {
    computedProps = propsMapper(this.props)

    componentWillReceiveProps(nextProps) {
      if (shouldMap(this.props, nextProps)) {
        this.computedProps = propsMapper(nextProps)
      }
    }

    render() {
      return factory({
        ...this.props,
        ...this.computedProps,
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withPropsOnChange'))(
      WithPropsOnChange
    )
  }
  return WithPropsOnChange
}

export default withPropsOnChange
