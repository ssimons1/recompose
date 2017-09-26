import { Component } from 'react'

/**
 * @description A higher-order component that always renders null.
 * @example
 * This is useful in combination with another helper that expects a higher-order component, like [branch()](http://www.bitsrc.io/recompose/recompose/higher-order-components/branch):
 * // `hasNoData()` is a function that returns true if the component has no data
 * const hideIfNoData = hasNoData =>
 *   branch(
 *     hasNoData,
 *     renderNothing
 *   )
 * 
 * // Now use the `hideIfNoData()` helper to hide any base component
 * const enhance = hideIfNoData(
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

class Nothing extends Component {
  render() {
    return null
  }
}

const renderNothing = _ => Nothing

export default renderNothing
