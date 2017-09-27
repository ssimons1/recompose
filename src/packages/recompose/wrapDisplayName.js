import getDisplayName from './getDisplayName'

/**
 * @name wrapDisplayName
 * @description Returns a wrapped version of a React component's display name. For instance, if the display name of component is 'Post', and wrapperName is 'mapProps', the return value is 'mapProps(Post)'. Most Recompose higher-order components use wrapDisplayName().
 * @param {ReactClass | ReactFunctionalComponent} BaseComponent
 * @param {string} hocName
 */

const wrapDisplayName = (BaseComponent, hocName) =>
  `${hocName}(${getDisplayName(BaseComponent)})`

export default wrapDisplayName
