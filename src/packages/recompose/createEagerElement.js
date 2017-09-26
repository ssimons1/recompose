import createEagerElementUtil from './utils/createEagerElementUtil'
import isReferentiallyTransparentFunctionComponent from './isReferentiallyTransparentFunctionComponent'

/**
 * @description React elements are lazily evaluated. But when a higher-order component renders a functional component, the laziness doesn't have any real benefit. createEagerElement() is a replacement for React.createElement() that checks if the given component is referentially transparent. If so, rather than returning a React element, it calls the functional component with the given props and returns its output.
 * @param {ReactClass | ReactFunctionalComponent | string} type 
 * @param {object} props 
 * @param {ReactNode} children 
 */

const createEagerElement = (type, props, children) => {
  const isReferentiallyTransparent = isReferentiallyTransparentFunctionComponent(
    type
  )
  /* eslint-disable */
  const hasKey = props && props.hasOwnProperty('key')
  /* eslint-enable */
  return createEagerElementUtil(
    hasKey,
    isReferentiallyTransparent,
    type,
    props,
    children
  )
}

export default createEagerElement
