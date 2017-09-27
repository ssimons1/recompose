Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _shouldUpdate = require('./shouldUpdate')

const _shouldUpdate2 = _interopRequireDefault(_shouldUpdate)

const _shallowEqual = require('./shallowEqual')

const _shallowEqual2 = _interopRequireDefault(_shallowEqual)

const _setDisplayName = require('./setDisplayName')

const _setDisplayName2 = _interopRequireDefault(_setDisplayName)

const _wrapDisplayName = require('./wrapDisplayName')

const _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName)

const _pick = require('./utils/pick')

const _pick2 = _interopRequireDefault(_pick)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

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

const onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
  const hoc = (0, _shouldUpdate2.default)(
    (props, nextProps) =>
      !(0, _shallowEqual2.default)(
        (0, _pick2.default)(nextProps, propKeys),
        (0, _pick2.default)(props, propKeys)
      )
  )

  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'onlyUpdateForKeys')
      )(hoc(BaseComponent))
    }
  }
  return hoc
}

exports.default = onlyUpdateForKeys

// # sourceMappingURL=onlyUpdateForKeys.js.map
