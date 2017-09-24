import hoistNonReactStatics from 'hoist-non-react-statics'

/**
 * @description Augments a higher-order component so that when used, it copies non-react static properties from the base component to the new component. This is helpful when using Recompose with libraries like Relay.
 * Note that this only hoists non-react statics. The following static properties will not be hoisted: childContextTypes, contextTypes, defaultProps, displayName, getDefaultProps, mixins, propTypes, and type. The following native static methods will also be ignored: name, length, prototype, caller, arguments, and arity.
 * 
 */

const hoistStatics = higherOrderComponent => BaseComponent => {
  const NewComponent = higherOrderComponent(BaseComponent)
  hoistNonReactStatics(NewComponent, BaseComponent)
  return NewComponent
}

export default hoistStatics
