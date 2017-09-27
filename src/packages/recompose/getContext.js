import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @name getContext
 * @description Gets values from context and passes them along as props. Use along with [withContext()](http://www.bitsrc.io/recompose/recompose/higher-order-components/with-context).
 * @param {object} contextTypes 
 */

const getContext = contextTypes => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  const GetContext = (ownerProps, context) =>
    factory({
      ...ownerProps,
      ...context,
    })

  GetContext.contextTypes = contextTypes

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'getContext'))(
      GetContext
    )
  }
  return GetContext
}

export default getContext
