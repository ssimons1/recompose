import React, { Component } from 'react'
import getDisplayName from './getDisplayName'
import isClassComponent from './isClassComponent'

/**
 * @description Takes a function component and wraps it in a class. This can be used as a fallback for libraries that need to add a ref to a component, like Relay.
 * If the base component is already a class, it returns the given component.
 */

const toClass = baseComponent => {
  if (isClassComponent(baseComponent)) {
    return baseComponent
  }

  class ToClass extends Component {
    render() {
      if (typeof baseComponent === 'string') {
        return React.createElement(baseComponent, this.props)
      }
      return baseComponent(this.props, this.context)
    }
  }

  ToClass.displayName = getDisplayName(baseComponent)
  ToClass.propTypes = baseComponent.propTypes
  ToClass.contextTypes = baseComponent.contextTypes
  ToClass.defaultProps = baseComponent.defaultProps

  return ToClass
}

export default toClass
