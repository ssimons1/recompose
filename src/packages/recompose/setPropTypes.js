import setStatic from './setStatic'

/**
 * @name setPropTypes
 * @description Assigns to the propTypes property on the base component.
 * @param {object} propTypes 
 */

const setPropTypes = propTypes => setStatic('propTypes', propTypes)

export default setPropTypes
