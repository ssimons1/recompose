import createEagerFactory from './createEagerFactory'
import wrapDisplayName from './wrapDisplayName'

/**
 * @description Takes a component and returns a higher-order component version of that component.
 * @param {ReactClass | ReactFunctionalComponent | string} Component
 * @example
 * This is useful in combination with another helper that expects a higher-order component, like [branch()](http://www.bitsrc.io/recompose/recompose/higher-order-components/branch):
 *
 * // `isLoading()` is a function that returns whether or not the component
 * // is in a loading state
 * const spinnerWhileLoading = isLoading =>
 *   branch(
 *     isLoading,
 *     renderComponent(Spinner) // `Spinner` is a React component
 *   )
 * 
 * // Now use the `spinnerWhileLoading()` helper to add a loading spinner to any
 * // base component
 * const enhance = spinnerWhileLoading(
 *   props => !(props.title && props.author && props.content)
 * )
 * const Post = enhance(({ title, author, content }) =>
 *   <article>
 *     <h1>{title}</h1>
 *     <h2>By {author.name}</h2>
 *     <div>{content}</div>
 *   </article>
 * )
 */

const renderComponent = Component => _ => {
  const factory = createEagerFactory(Component)
  const RenderComponent = props => factory(props)
  if (process.env.NODE_ENV !== 'production') {
    RenderComponent.displayName = wrapDisplayName(Component, 'renderComponent')
  }
  return RenderComponent
}

export default renderComponent
