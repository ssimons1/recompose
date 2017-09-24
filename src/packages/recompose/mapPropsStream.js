import $$observable from 'symbol-observable'
import createEagerFactory from './createEagerFactory'
import { componentFromStreamWithConfig } from './componentFromStream'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import { config as globalConfig } from './setObservableConfig'

/**
 * @description A higher-order component version of [componentFromStream()](http://www.bitsrc.io/recompose/recompose/components/component-from-stream) — accepts a function that maps an observable stream of owner props to a stream of child props, rather than directly to a stream of React nodes. The child props are then passed to a base component.
 * You may want to use this version to interoperate with other Recompose higher-order component helpers.
 * 
 */

const identity = t => t

export const mapPropsStreamWithConfig = config => {
  const componentFromStream = componentFromStreamWithConfig({
    fromESObservable: identity,
    toESObservable: identity,
  })
  return transform => BaseComponent => {
    const factory = createEagerFactory(BaseComponent)
    const { fromESObservable, toESObservable } = config
    return componentFromStream(props$ => ({
      subscribe(observer) {
        const subscription = toESObservable(
          transform(fromESObservable(props$))
        ).subscribe({
          next: childProps => observer.next(factory(childProps)),
        })
        return {
          unsubscribe: () => subscription.unsubscribe(),
        }
      },
      [$$observable]() {
        return this
      },
    }))
  }
}

const mapPropsStream = transform => {
  const hoc = mapPropsStreamWithConfig(globalConfig)(transform)

  if (process.env.NODE_ENV !== 'production') {
    return BaseComponent =>
      setDisplayName(wrapDisplayName(BaseComponent, 'mapPropsStream'))(
        hoc(BaseComponent)
      )
  }
  return hoc
}

export default mapPropsStream
