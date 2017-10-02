Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _createEagerElementUtil = require('./utils/createEagerElementUtil')

const _createEagerElementUtil2 = _interopRequireDefault(_createEagerElementUtil)

const _isReferentiallyTransparentFunctionComponent = require('./isReferentiallyTransparentFunctionComponent')

const _isReferentiallyTransparentFunctionComponent2 = _interopRequireDefault(
  _isReferentiallyTransparentFunctionComponent
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @name createEagerElement
 * @description React elements are lazily evaluated. But when a higher-order component renders a functional component, the laziness doesn't have any real benefit. createEagerElement() is a replacement for React.createElement() that checks if the given component is referentially transparent. If so, rather than returning a React element, it calls the functional component with the given props and returns its output.
 * @param {ReactClass | ReactFunctionalComponent | string} type 
 * @param {object} props 
 * @param {ReactNode} children 
 */

const createEagerElement = function createEagerElement(type, props, children) {
  const isReferentiallyTransparent = (
    0,
    _isReferentiallyTransparentFunctionComponent2.default
  )(type)
  /* eslint-disable */
  var hasKey = props && props.hasOwnProperty('key')
  /* eslint-enable */
  return (0, _createEagerElementUtil2.default)(
    hasKey,
    isReferentiallyTransparent,
    type,
    props,
    children
  )
}

exports.default = createEagerElement

// # sourceMappingURL=createEagerElement.js.map
