Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _omit = require('./utils/omit')

const _omit2 = _interopRequireDefault(_omit)

const _createEagerElement = require('./createEagerElement')

const _createEagerElement2 = _interopRequireDefault(_createEagerElement)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @name componentFromProp
 * @description Creates a component that accepts a component as a prop and renders it with the remaining props.
 * @param {string} propName 
 * @example
 * const enhance = defaultProps({ component: 'button' })
 * const Button = enhance(componentFromProp('component'))
 * 
 * <Button foo="bar" /> // renders <button foo="bar" />
 * <Button component="a" foo="bar" />  // renders <a foo="bar" />
 * <Button component={Link} foo="bar" />  // renders <Link foo="bar" />
 */

const componentFromProp = function componentFromProp(propName) {
  const Component = function Component(props) {
    return (0, _createEagerElement2.default)(
      props[propName],
      (0, _omit2.default)(props, [propName])
    )
  }
  Component.displayName = `componentFromProp(${propName})`
  return Component
}

exports.default = componentFromProp

// # sourceMappingURL=componentFromProp.js.map
