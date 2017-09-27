Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _wrapDisplayName = require('./wrapDisplayName')

const _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName)

const _setDisplayName = require('./setDisplayName')

const _setDisplayName2 = _interopRequireDefault(_setDisplayName)

const _mapProps = require('./mapProps')

const _mapProps2 = _interopRequireDefault(_mapProps)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @name withProps
 * @description Like [mapProps()](http://www.bitsrc.io/recompose/recompose/higher-order-components/map-props), except the newly created props are merged with the owner props.
 * Instead of a function, you can also pass a props object directly. In this form, it is similar to [defaultProps()](http://www.bitsrc.io/recompose/recompose/higher-order-components/default-props), except the provided props take precedence over props from the owner.
 * @param {object} input 
 */

const withProps = function withProps(input) {
  const hoc = (0, _mapProps2.default)(props =>
    Object.assign({}, props, typeof input === 'function' ? input(props) : input)
  )
  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'withProps')
      )(hoc(BaseComponent))
    }
  }
  return hoc
}

exports.default = withProps

// # sourceMappingURL=withProps.js.map
