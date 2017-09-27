Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _isClassComponent = require('./isClassComponent')

const _isClassComponent2 = _interopRequireDefault(_isClassComponent)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const isReferentiallyTransparentFunctionComponent = function isReferentiallyTransparentFunctionComponent(
  Component
) {
  return Boolean(
    typeof Component === 'function' &&
      !(0, _isClassComponent2.default)(Component) &&
      !Component.defaultProps &&
      !Component.contextTypes
  )
}

exports.default = isReferentiallyTransparentFunctionComponent

// # sourceMappingURL=isReferentiallyTransparentFunctionComponent.js.map
