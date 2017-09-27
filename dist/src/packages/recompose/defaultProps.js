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
 * @name defaultProps
 * @description Specifies props to be passed by default to the base component. Similar to [withProps()](http://www.bitsrc.io/recompose/recompose/higher-order-components/with-props), except the props from the owner take precedence over props provided to the HoC.
 * Although it has a similar effect, using the defaultProps() HoC is not the same as setting the static defaultProps property directly on the component.
 * @param {object} props 
 */

const defaultProps = function defaultProps(props) {
  return function(BaseComponent) {
    const factory = (0, _createEagerFactory2.default)(BaseComponent)
    const DefaultProps = function DefaultProps(ownerProps) {
      return factory(ownerProps)
    }
    DefaultProps.defaultProps = props
    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'defaultProps')
      )(DefaultProps)
    }
    return DefaultProps
  }
}

exports.default = defaultProps

// # sourceMappingURL=defaultProps.js.map
