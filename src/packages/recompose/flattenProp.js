import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @description Flattens a prop so that its fields are spread out into the props object.
 * @param {string} propName 
 * An example use case for flattenProp() is when receiving fragment data from Relay. Relay fragments are passed as an object of props, which you often want flattened out into its constituent fields:
 * @example
 *
 * // The `post` prop is an object with title, author, and content fields
 * const enhance = flattenProp('post')
 * const Post = enhance(({ title, content, author }) =>
 *   <article>
 *     <h1>{title}</h1>
 *     <h2>By {author.name}</h2>
 *     <div>{content}</div>
 *   </article>
 * )
 */

const flattenProp = propName => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  const FlattenProp = props =>
    factory({
      ...props,
      ...props[propName],
    })

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'flattenProp'))(
      FlattenProp
    )
  }
  return FlattenProp
}

export default flattenProp
