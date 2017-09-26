/**
 * @description Returns the display name of a React component. Falls back to 'Component'.
 * @param {ReactClass | ReactFunctionalComponent} Component 
 */

const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component
  }

  if (!Component) {
    return undefined
  }

  return Component.displayName || Component.name || 'Component'
}

export default getDisplayName
