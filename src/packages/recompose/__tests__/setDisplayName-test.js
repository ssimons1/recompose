import React from 'react'
import { setDisplayName } from '../setDisplayName'

test('setDisplayName sets a static property on the base component', () => {
  const BaseComponent = () => <div />
  const NewComponent = setDisplayName('Foo')(BaseComponent)
  expect(NewComponent.displayName).toBe('Foo')
})
