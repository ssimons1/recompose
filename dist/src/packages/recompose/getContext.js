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
 * @name getContext
 * @description Gets values from context and passes them along as props. Use along with [withContext()](http://www.bitsrc.io/recompose/recompose/higher-order-components/with-context).
 * @param {object} contextTypes 
 */

const getContext = function getContext(contextTypes) {
  return function(BaseComponent) {
    const factory = (0, _createEagerFactory2.default)(BaseComponent)
    const GetContext = function GetContext(ownerProps, context) {
      return factory(Object.assign({}, ownerProps, context))
    }

    GetContext.contextTypes = contextTypes

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'getContext')
      )(GetContext)
    }
    return GetContext
  }
}

exports.default = getContext

// # sourceMappingURL=getContext.js.map
