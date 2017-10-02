import React from 'react'
import { mount } from 'enzyme'
import renameProps from '../renameProps'
import withProps from '../withProps'
import compose from '../compose'

test('renameProps renames props', () => {
  const StringConcat = compose(
    withProps({ 'data-so': 123, 'data-la': 456 }),
    renameProps({ 'data-so': 'data-do', 'data-la': 'data-fa' })
  )('div')

  expect(StringConcat.displayName).toBe('withProps(renameProps(div))')

  const div = mount(<StringConcat />).find('div')

  expect(div.prop('data-do')).toBe(123)
  expect(div.prop('data-fa')).toBe(456)
})
