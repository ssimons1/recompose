import { Component } from 'react'

/**
 * @name createSink
 * @description Creates a component that renders nothing (null) but calls a callback when receiving new props.
 * @param {function} callback 
 */

const createSink = callback =>
  class Sink extends Component {
    componentWillMount() {
      callback(this.props)
    }

    componentWillReceiveProps(nextProps) {
      callback(nextProps)
    }

    render() {
      return null
    }
  }

export default createSink
