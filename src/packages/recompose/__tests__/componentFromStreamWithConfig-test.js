import React from 'react'
import { mount } from 'enzyme'
import { Observable } from 'rxjs'
import { Stream as MostStream } from 'most'
import mostConfig from '../mostObservableConfig'
import rxjsConfig from '../rxjsObservableConfig'
import { componentFromStreamWithConfig } from '../componentFromStream'

/**
 * @description Alternative to [componentFromStream()](http://www.bitsrc.io/recompose/recompose/components/component-from-stream) that accepts an observable config and returns a customized [componentFromStream()](http://www.bitsrc.io/recompose/recompose/components/component-from-stream) which uses the specified observable library. This option is recommended if you want to avoid global state with [setObservableConfig()](http://www.bitsrc.io/recompose/recompose/components/set-observable-config).
 */

test('componentFromStreamWithConfig creates a stream with the correct stream type.', () => {
  const MostComponent = componentFromStreamWithConfig(mostConfig)(props$ => {
    expect(props$ instanceof MostStream).toBe(true)
    return props$.map(v =>
      <div>
        {String(v)}
      </div>
    )
  })

  mount(<MostComponent />)

  const RXJSComponent = componentFromStreamWithConfig(rxjsConfig)(props$ => {
    expect(props$ instanceof Observable).toBe(true)
    return props$.map(v =>
      <div>
        {String(v)}
      </div>
    )
  })

  mount(<RXJSComponent />)
})
