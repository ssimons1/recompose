import shouldUpdate from './shouldUpdate'
import shallowEqual from './shallowEqual'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import pick from './utils/pick'

/**
 * @name onlyUpdateForKeys
 * @description Prevents the component from updating unless a prop corresponding to one of the given keys has updated. Uses [shallowEqual()](http://www.bitsrc.io/recompose/recompose/higher-order-components/shallow-equal) to test for changes.
 * @param {array} propKeys 
 * @example
 * 
 * If the owner passes unnecessary props (say, an array of comments), it will
 * not lead to wasted render cycles.
 *
 * Goes well with destructuring because it's clear which props the component
 * actually cares about.
 *
 * const enhance = onlyUpdateForKeys(['title', 'content', 'author'])
 * const Post = enhance(({ title, content, author }) =>
 *   <article>
 *     <h1>{title}</h1>
 *     <h2>By {author.name}</h2>
 *     <div>{content}</div>
 *   </article>
 * )
 */

const onlyUpdateForKeys = propKeys => {
  const hoc = shouldUpdate(
    (props, nextProps) =>
      !shallowEqual(pick(nextProps, propKeys), pick(props, propKeys))
  )

  if (process.env.NODE_ENV !== 'production') {
    return BaseComponent =>
      setDisplayName(wrapDisplayName(BaseComponent, 'onlyUpdateForKeys'))(
        hoc(BaseComponent)
      )
  }
  return hoc
}

export default onlyUpdateForKeys
