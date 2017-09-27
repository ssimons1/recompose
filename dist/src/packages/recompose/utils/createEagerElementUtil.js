Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _react = require('react')

const _react2 = _interopRequireDefault(_react)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const createEagerElementUtil = function createEagerElementUtil(
  hasKey,
  isReferentiallyTransparent,
  type,
  props,
  children
) {
  if (
    process.env.NODE_ENV === 'production' &&
    !hasKey &&
    isReferentiallyTransparent
  ) {
    if (children) {
      return type(Object.assign({}, props, { children }))
    }
    return type(props)
  }

  const Component = type

  if (children) {
    return _react2.default.createElement(Component, props, children)
  }

  return _react2.default.createElement(Component, props)
}

exports.default = createEagerElementUtil

// # sourceMappingURL=createEagerElementUtil.js.map
