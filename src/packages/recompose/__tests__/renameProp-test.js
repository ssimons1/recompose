import React from 'react'
import { mount } from 'enzyme'
import renameProp from '../renameProp'
import withProps from '../withProps'
import compose from '../compose'

test('renameProp renames a single prop', () => {
  const StringConcat = compose(
    withProps({ 'data-so': 123, 'data-la': 456 }),
    renameProp('data-so', 'data-do')
  )('div')

  expect(StringConcat.displayName).toBe('withProps(renameProp(div))')

  const div = mount(<StringConcat />).find('div')
  expect(div.props()).toEqual({ 'data-do': 123, 'data-la': 456 })
})
