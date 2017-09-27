import omit from './utils/omit'
import mapProps from './mapProps'
import setDisplayName from './setDisplayName'
import wrapDisplayName from './wrapDisplayName'

/**
 * @name renameProp
 * @description Renames a single prop.
 * @param {string} oldName 
 * @param {string} newName 
 */

const renameProp = (oldName, newName) => {
  const hoc = mapProps(props => ({
    ...omit(props, [oldName]),
    [newName]: props[oldName],
  }))
  if (process.env.NODE_ENV !== 'production') {
    return BaseComponent =>
      setDisplayName(wrapDisplayName(BaseComponent, 'renameProp'))(
        hoc(BaseComponent)
      )
  }
  return hoc
}

export default renameProp
