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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @name pure
 * @description Prevents the component from updating unless a prop has changed. Uses [shallowEqual()](http://www.bitsrc.io/recompose/recompose/higher-order-components/shallow-equal) to test for changes.
 * 
 */

const pure = function pure(BaseComponent) {
  const hoc = (0, _shouldUpdate2.default)(
    (props, nextProps) => !(0, _shallowEqual2.default)(props, nextProps)
  )

  if (process.env.NODE_ENV !== 'production') {
    return (0, _setDisplayName2.default)(
      (0, _wrapDisplayName2.default)(BaseComponent, 'pure')
    )(hoc(BaseComponent))
  }

  return hoc(BaseComponent)
}

exports.default = pure

// # sourceMappingURL=pure.js.map
