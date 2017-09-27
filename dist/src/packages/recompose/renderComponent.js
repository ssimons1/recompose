Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _createEagerFactory = require('./createEagerFactory')

const _createEagerFactory2 = _interopRequireDefault(_createEagerFactory)

const _wrapDisplayName = require('./wrapDisplayName')

const _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @name renderComponent
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

const renderComponent = function renderComponent(Component) {
  return function(_) {
    const factory = (0, _createEagerFactory2.default)(Component)
    const RenderComponent = function RenderComponent(props) {
      return factory(props)
    }
    if (process.env.NODE_ENV !== 'production') {
      RenderComponent.displayName = (0, _wrapDisplayName2.default)(
        Component,
        'renderComponent'
      )
    }
    return RenderComponent
  }
}

exports.default = renderComponent

// # sourceMappingURL=renderComponent.js.map
