import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @description Accepts a function that maps owner props to a new collection of props that are passed to the base component.
 * mapProps() pairs well with functional utility libraries like lodash/fp. For example, Recompose does not come with a omitProps() function, but you can easily build one using lodash-fp's omit():
 *
 * const omitProps = keys => mapProps(props => omit(keys, props))
 * 
 * // Because of currying in lodash-fp, this is the same as
 * const omitProps = compose(mapProps, omit)
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
