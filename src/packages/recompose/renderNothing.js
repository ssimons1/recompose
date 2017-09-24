import { Component } from 'react'

/**
 * @description A higher-order component that always renders null.
 */

class Nothing extends Component {
  render() {
    return null
  }
}

const renderNothing = _ => Nothing

export default renderNothing
