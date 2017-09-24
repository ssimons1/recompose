import { Component } from 'react'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'
import createEagerFactory from './createEagerFactory'

/**
 * @description Passes two additional props to the base component: a state value, and a function to update that state value.
 * @param {string} stateName 
 * @param {string} stateUpdaterName 
 * @param initialState 
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
