import shouldUpdate from './shouldUpdate'
import shallowEqual from './shallowEqual'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

/**
 * @name pure
 * @description Prevents the component from updating unless a prop has changed. Uses [shallowEqual()](http://www.bitsrc.io/recompose/recompose/higher-order-components/shallow-equal) to test for changes.
 * 
 */

const pure = BaseComponent => {
  const hoc = shouldUpdate(
    (props, nextProps) => !shallowEqual(props, nextProps)
  )

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'pure'))(
      hoc(BaseComponent)
    )
  }

  return hoc(BaseComponent)
}

export default pure
