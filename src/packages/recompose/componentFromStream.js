import { Component } from 'react'
import { createChangeEmitter } from 'change-emitter'
import $$observable from 'symbol-observable'
import { config as globalConfig } from './setObservableConfig'

/**
 * @name componentFromStreamWithConfig
 * @description componentFromStreamWithConfig is an alternative to componentFromStream() that accepts an observable config and returns a customized componentFromStream() which uses the specified observable library. This option is recommended if you want to avoid global state with [setObservableConfig()](http://www.bitsrc.io/recompose/recompose/observable-utilities/set-observable-config).
 * @param {object} config
 */

export const componentFromStreamWithConfig = config => propsToVdom =>
  class ComponentFromStream extends Component {
    state = { vdom: null }

    propsEmitter = createChangeEmitter()

    // Stream of props
    props$ = config.fromESObservable({
      subscribe: observer => {
        const unsubscribe = this.propsEmitter.listen(props => {
          if (props) {
            observer.next(props)
          } else {
            observer.complete()
          }
        })
        return { unsubscribe }
      },
      [$$observable]() {
        return this
      },
    })

    // Stream of vdom
    vdom$ = config.toESObservable(propsToVdom(this.props$))

    componentWillMount() {
      // Subscribe to child prop changes so we know when to re-render
      this.subscription = this.vdom$.subscribe({
        next: vdom => {
          this.setState({ vdom })
        },
      })
      this.propsEmitter.emit(this.props)
    }

    componentWillReceiveProps(nextProps) {
      // Receive new props from the owner
      this.propsEmitter.emit(nextProps)
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextState.vdom !== this.state.vdom
    }

    componentWillUnmount() {
      // Call without arguments to complete stream
      this.propsEmitter.emit()

      // Clean-up subscription before un-mounting
      this.subscription.unsubscribe()
    }

    render() {
      return this.state.vdom
    }
  }

/**
 * @name componentFromStream
 * @description Creates a React component by mapping an observable stream of props to a stream of React nodes (vdom).
 * You can think of propsToReactNode as a function f such that
 *
 * const vdom$ = f(props$)
 * 
 * where props$ is a stream of props and vdom$ is a stream of React nodes. This formulation similar to the popular notion of React views as a function, often communicated as
 * 
 * v = f(d)
 * @example
 * const Counter = componentFromStream(props$ => {
 *   const { handler: increment, stream: increment$ } = createEventHandler()
 *   const { handler: decrement, stream: decrement$ } = createEventHandler()
 *   const count$ = Observable.merge(
 *       increment$.mapTo(1),
 *       decrement$.mapTo(-1)
 *     )
 *     .startWith(0)
 *     .scan((count, n) => count + n, 0)
 * 
 *   return props$.combineLatest(
 *     count$,
 *     (props, count) =>
 *       <div {...props}>
 *         Count: {count}
 *         <button onClick={increment}>+</button>
 *         <button onClick={decrement}>-</button>
 *       </div>
 *   )
 * })
 * @param {object} propsToVdom
 */

const componentFromStream = propsToVdom =>
  componentFromStreamWithConfig(globalConfig)(propsToVdom)

export default componentFromStream
