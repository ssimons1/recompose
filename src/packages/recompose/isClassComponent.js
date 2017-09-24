/**
 * @description Returns true if the given value is a React component class.
 * @param {any} Component 
 */

const isClassComponent = Component =>
  Boolean(
    Component &&
      Component.prototype &&
      typeof Component.prototype.render === 'function'
  )

export default isClassComponent
