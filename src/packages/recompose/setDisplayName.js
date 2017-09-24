import setStatic from './setStatic'

/**
 * @description Assigns to the displayName property on the base component.
 * @param {string} displayName 
 */

const setDisplayName = displayName => setStatic('displayName', displayName)

export default setDisplayName
