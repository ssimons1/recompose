import createEagerFactory from './createEagerFactory'
import wrapDisplayName from './wrapDisplayName'

/**
 * @description Takes a component and returns a higher-order component version of that component.
 * @param Component 
 */

const renderComponent = Component => _ => {
  const factory = createEagerFactory(Component)
  const RenderComponent = props => factory(props)
  if (process.env.NODE_ENV !== 'production') {
    RenderComponent.displayName = wrapDisplayName(Component, 'renderComponent')
  }
  return RenderComponent
}

export default renderComponent
