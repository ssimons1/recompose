import createEagerFactory from './createEagerFactory'
import getDisplayName from './getDisplayName'

/**
 * @description Composes components by nesting each one inside the previous.
 * @param {array} Components 
 * @example
 *
 * // Given components A, B, and C
 * const ABC = nest(A, B, C)
 * <ABC pass="through">Child</ABC>
 * 
 * // Effectively the same as
 * <A pass="through">
 *   <B pass="through">
 *     <C pass="through">
 *       Child
 *     </C>
 *   </B>
 * </A>
 */

const nest = (...Components) => {
  const factories = Components.map(createEagerFactory)
  const Nest = ({ ...props, children }) =>
    factories.reduceRight((child, factory) => factory(props, child), children)

  if (process.env.NODE_ENV !== 'production') {
    const displayNames = Components.map(getDisplayName)
    Nest.displayName = `nest(${displayNames.join(', ')})`
  }

  return Nest
}

export default nest
