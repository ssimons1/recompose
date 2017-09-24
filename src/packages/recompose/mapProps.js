import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @description Accepts a function that maps owner props to a new collection of props that are passed to the base component.
 * @param {object} propsMapper 
 */

const mapProps = propsMapper => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  const MapProps = props => factory(propsMapper(props))
  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'mapProps'))(MapProps)
  }
  return MapProps
}

export default mapProps
