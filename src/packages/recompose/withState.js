import { Component } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @name withState
 * @description Passes two additional props to the base component: a state value, and a function to update that state value.
 * The state updater has the following signature:
 * stateUpdater<T>((prevValue: T) => T, ?callback: Function): void
 * stateUpdater(newValue: any, ?callback: Function): void
 * @param {string} stateName 
 * @param {string} stateUpdaterName 
 * @param initialState 
 * @example
 * The first form accepts a function which maps the previous state value to a new state value. You'll likely want to use this state updater along with withHandlers() to create specific updater functions. For example, to create an HoC that adds basic counting functionality to a component:
 * 
 * const addCounting = compose(
 * withState('counter', 'setCounter', 0),
 * withHandlers({
 *   increment: ({ setCounter }) => () => setCounter(n => n + 1),
 *   decrement: ({ setCounter }) => () =>  setCounter(n => n - 1),
 *   reset: ({ setCounter }) => () => setCounter(0)
 * })
 *)
 *
 * The second form accepts a single value, which is used as the new state.
 * Both forms accept an optional second parameter, a callback function that will be executed once setState() is completed and the component is re-rendered.
 * An initial state value is required. It can be either the state value itself, or a function that returns an initial state given the initial props.
 */

const withState = (
  stateName,
  stateUpdaterName,
  initialState
) => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  class WithState extends Component {
    state = {
      stateValue:
        typeof initialState === 'function'
          ? initialState(this.props)
          : initialState,
    }

    updateStateValue = (updateFn, callback) =>
      this.setState(
        ({ stateValue }) => ({
          stateValue:
            typeof updateFn === 'function' ? updateFn(stateValue) : updateFn,
        }),
        callback
      )

    render() {
      return factory({
        ...this.props,
        [stateName]: this.state.stateValue,
        [stateUpdaterName]: this.updateStateValue,
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withState'))(
      WithState
    )
  }
  return WithState
}

export default withState
