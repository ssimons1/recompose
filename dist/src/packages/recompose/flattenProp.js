Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _setDisplayName = require('./setDisplayName')

const _setDisplayName2 = _interopRequireDefault(_setDisplayName)

const _wrapDisplayName = require('./wrapDisplayName')

const _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName)

const _createEagerFactory = require('./createEagerFactory')

const _createEagerFactory2 = _interopRequireDefault(_createEagerFactory)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @name flattenProp
 * @description Flattens a prop so that its fields are spread out into the props object.
 * @param {string} propName 
 * @example
 * // An example use case for flattenProp() is when receiving fragment data from Relay. Relay fragments are passed as an object of props, which you often want flattened out into its constituent fields:
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

const flattenProp = function flattenProp(propName) {
  return function(BaseComponent) {
    const factory = (0, _createEagerFactory2.default)(BaseComponent)
    const FlattenProp = function FlattenProp(props) {
      return factory(Object.assign({}, props, props[propName]))
    }

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'flattenProp')
      )(FlattenProp)
    }
    return FlattenProp
  }
}

exports.default = flattenProp

// # sourceMappingURL=flattenProp.js.map
