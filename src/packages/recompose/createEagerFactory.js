import createEagerElementUtil from './utils/createEagerElementUtil'
import isReferentiallyTransparentFunctionComponent from './isReferentiallyTransparentFunctionComponent'

/**
 * @description The factory form of [createEagerElement()](http://www.bitsrc.io/recompose/recompose/utils/create-eager-element). Given a component, it returns a factory.
 * @param {*} type 
 */

const createFactory = type => {
  const isReferentiallyTransparent = isReferentiallyTransparentFunctionComponent(
    type
  )
  return (p, c) =>
    createEagerElementUtil(false, isReferentiallyTransparent, type, p, c)
}

export default createFactory
