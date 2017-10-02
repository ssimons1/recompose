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
 * @name createEventFactory
 * @description The factory form of [createEagerElement()](http://www.bitsrc.io/recompose/recompose/utils/create-eager-element). Given a component, it returns a factory.
 * @param {ReactClass | ReactFunctionalComponent | string} type
 * @param {object} p
 * @param {ReactNode} c
 */

const createFactory = function createFactory(type) {
  const isReferentiallyTransparent = (
    0,
    _isReferentiallyTransparentFunctionComponent2.default
  )(type)
  return function(p, c) {
    return (0, _createEagerElementUtil2.default)(
      false,
      isReferentiallyTransparent,
      type,
      p,
      c
    )
  }
}

exports.default = createFactory

// # sourceMappingURL=createEagerFactory.js.map
