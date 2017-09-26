import { Component } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'
import shallowEqual from './shallowEqual'
import mapValues from './utils/mapValues'

/**
 * @description Passes state object properties and immutable updater functions in a form of (...payload: any[]) => Object to the base component.
 * Every state updater function accepts state, props and payload and must return a new state or undefined. The new state is shallowly merged with the previous state. Returning undefined does not cause a component rerender.
 * @param {object | function} initialState 
 * @param {object} stateUpdaters 
 * @example
 *  const Counter = withStateHandlers(
 *    ({ initialCounter = 0 }) => ({
 *      counter: initialCounter,
 *    }),
 *    {
 *      incrementOn: ({ counter }) => (value) => ({
 *        counter: counter + value,
 *      }),
 *      decrementOn: ({ counter }) => (value) => ({
 *        counter: counter - value,
 *      }),
 *      resetCounter: (_, { initialCounter = 0 }) => () => ({
 *        counter: initialCounter,
 *      }),
 *    }
 *  )(
 *    ({ counter, incrementOn, decrementOn, resetCounter }) =>
 *      <div>
 *        <Button onClick={() => incrementOn(2)}>Inc</Button>
 *        <Button onClick={() => decrementOn(3)}>Dec</Button>
 *        <Button onClick={resetCounter}>Dec</Button>
 *      </div>
 *  )
 */

const withStateHandlers = (initialState, stateUpdaters) => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)

  class WithStateHandlers extends Component {
    state = typeof initialState === 'function'
      ? initialState(this.props)
      : initialState

    stateUpdaters = mapValues(
      stateUpdaters,
      handler => (mayBeEvent, ...args) => {
        // Having that functional form of setState can be called async
        // we need to persist SyntheticEvent
        if (mayBeEvent && typeof mayBeEvent.persist === 'function') {
          mayBeEvent.persist()
        }

        this.setState((state, props) =>
          handler(state, props)(mayBeEvent, ...args)
        )
      }
    )

    shouldComponentUpdate(nextProps, nextState) {
      const propsChanged = nextProps !== this.props
      // the idea is to skip render if stateUpdater handler return undefined
      // this allows to create no state update handlers with access to state and props
      const stateChanged = !shallowEqual(nextState, this.state)
      return propsChanged || stateChanged
    }

    render() {
      return factory({
        ...this.props,
        ...this.state,
        ...this.stateUpdaters,
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withStateHandlers'))(
      WithStateHandlers
    )
  }
  return WithStateHandlers
}

export default withStateHandlers
