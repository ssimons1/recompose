import onlyUpdateForKeys from './onlyUpdateForKeys'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import getDisplayName from './getDisplayName'

/**
 * 
* @description Works like [onlyUpdateForKeys()](http://www.bitsrc.io/recompose/recompose/components/only-update-for-keys), but prop keys are inferred from the propTypes of the base component. Useful in conjunction with [setPropTypes()](http://www.bitsrc.io/recompose/recompose/components/set-prop-types).
 * If the base component does not have any propTypes, the component will never receive any updates. This probably isn't the expected behavior, so a warning is printed to the console.
 */

const onlyUpdateForPropTypes = BaseComponent => {
  const propTypes = BaseComponent.propTypes

  if (process.env.NODE_ENV !== 'production') {
    if (!propTypes) {
      /* eslint-disable */
      console.error(
        'A component without any `propTypes` was passed to ' +
          '`onlyUpdateForPropTypes()`. Check the implementation of the ' +
          `component with display name "${getDisplayName(BaseComponent)}".`
      )
      /* eslint-enable */
    }
  }

  const propKeys = Object.keys(propTypes || {})
  const OnlyUpdateForPropTypes = onlyUpdateForKeys(propKeys)(BaseComponent)

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(
      wrapDisplayName(BaseComponent, 'onlyUpdateForPropTypes')
    )(OnlyUpdateForPropTypes)
  }
  return OnlyUpdateForPropTypes
}

export default onlyUpdateForPropTypes
