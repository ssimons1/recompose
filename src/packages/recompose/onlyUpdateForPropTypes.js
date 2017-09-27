import onlyUpdateForKeys from './onlyUpdateForKeys'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import getDisplayName from './getDisplayName'

/**
 * @name onlyUpdateForPropTypes
 * @description Works like [onlyUpdateForKeys()](http://www.bitsrc.io/recompose/recompose/higher-order-components/only-update-for-keys), but prop keys are inferred from the propTypes of the base component. Useful in conjunction with [setPropTypes()](http://www.bitsrc.io/recompose/recompose/components/set-prop-types).
 * If the base component does not have any propTypes, the component will never receive any updates. This probably isn't the expected behavior, so a warning is printed to the console.
 * @example
 * import PropTypes from 'prop-types'; // You need to import prop-types. See https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * 
 * const enhance = compose(
 *   onlyUpdateForPropTypes,
 *   setPropTypes({
 *     title: PropTypes.string.isRequired,
 *     content: PropTypes.string.isRequired,
 *     author: PropTypes.object.isRequired
 *   })
 * )
 * 
 * const Post = enhance(({ title, content, author }) =>
 *   <article>
 *     <h1>{title}</h1>
 *     <h2>By {author.name}</h2>
 *     <div>{content}</div>
 *   </article>
 * )
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
