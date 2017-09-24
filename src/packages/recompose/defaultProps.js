import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @description Specifies props to be passed by default to the base component. Similar to [withProps()](http://www.bitsrc.io/recompose/recompose/components/with-props), except the props from the owner take precedence over props provided to the HoC.
 * Although it has a similar effect, using the defaultProps() HoC is not the same as setting the static defaultProps property directly on the component.
 * @param {object} props 
 */

const defaultProps = props => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  const DefaultProps = ownerProps => factory(ownerProps)
  DefaultProps.defaultProps = props
  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps'))(
      DefaultProps
    )
  }
  return DefaultProps
}

export default defaultProps
