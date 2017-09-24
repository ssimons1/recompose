import wrapDisplayName from './wrapDisplayName'
import setDisplayName from './setDisplayName'
import mapProps from './mapProps'

/**
 * @description Like [mapProps()](http://www.bitsrc.io/recompose/recompose/components/map-props), except the newly created props are merged with the owner props.
 * Instead of a function, you can also pass a props object directly. In this form, it is similar to defaultProps(), except the provided props take precedence over props from the owner.
 * @param {object} input 
 */

const withProps = input => {
  const hoc = mapProps(props => ({
    ...props,
    ...(typeof input === 'function' ? input(props) : input),
  }))
  if (process.env.NODE_ENV !== 'production') {
    return BaseComponent =>
      setDisplayName(wrapDisplayName(BaseComponent, 'withProps'))(
        hoc(BaseComponent)
      )
  }
  return hoc
}

export default withProps
