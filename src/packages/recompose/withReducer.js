import { Component } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @description Similar to [withState()](http://www.bitsrc.io/recompose/recompose/components/with-state), but state updates are applied using a reducer function. A reducer is a function that receives a state and an action, and returns a new state.
 * Passes two additional props to the base component: a state value, and a dispatch method. The dispatch method sends an action to the reducer, and the new state is applied.
 * @param {string} stateName 
 * @param {string} dispatchName 
 * @param {*} reducer 
 * @param {*} initialState 
 */

const withReducer = (
  stateName,
  dispatchName,
  reducer,
  initialState
) => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)
  class WithReducer extends Component {
    state = {
      stateValue: this.initializeStateValue(),
    }

    initializeStateValue() {
      if (initialState !== undefined) {
        return typeof initialState === 'function'
          ? initialState(this.props)
          : initialState
      }
      return reducer(undefined, { type: '@@recompose/INIT' })
    }

    dispatch = action =>
      this.setState(({ stateValue }) => ({
        stateValue: reducer(stateValue, action),
      }))

    render() {
      return factory({
        ...this.props,
        [stateName]: this.state.stateValue,
        [dispatchName]: this.dispatch,
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withReducer'))(
      WithReducer
    )
  }
  return WithReducer
}

export default withReducer
