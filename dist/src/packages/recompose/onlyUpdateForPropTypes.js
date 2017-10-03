'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _onlyUpdateForKeys = require('./onlyUpdateForKeys');

var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);

var _setDisplayName = require('./setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = require('./wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name onlyUpdateForPropTypes
 * @description Works like [onlyUpdateForKeys()](http://www.bitsrc.io/recompose/recompose/higher-order-components/only-update-for-keys), but prop keys are inferred from the propTypes of the base component. Useful in conjunction with [setPropTypes()](http://www.bitsrc.io/recompose/recompose/components/set-prop-types).
 * If the base component does not have any propTypes, the component will never receive any updates. This probably isn't the expected behavior, so a warning is printed to the console.
 * @example
 * import PropTypes from 'prop-types'; // You need to import prop-types. See https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * 
 * const enhance = compose(
 *   onlyUpdateForPropTypes,
 *   setPropTypes({
 *     title: PropTypes.string.isRequired,
 *     content: PropTypes.string.isRequired,
 *     author: PropTypes.object.isRequired
 *   })
 * )
 * 
 * const Post = enhance(({ title, content, author }) =>
 *   <article>
 *     <h1>{title}</h1>
 *     <h2>By {author.name}</h2>
 *     <div>{content}</div>
 *   </article>
 * )
 */

var onlyUpdateForPropTypes = function onlyUpdateForPropTypes(BaseComponent) {
  var propTypes = BaseComponent.propTypes;

  if (process.env.NODE_ENV !== 'production') {
    if (!propTypes) {
      /* eslint-disable */
      console.error('A component without any `propTypes` was passed to ' + '`onlyUpdateForPropTypes()`. Check the implementation of the ' + ('component with display name "' + (0, _getDisplayName2.default)(BaseComponent) + '".'));
      /* eslint-enable */
    }
  }

  var propKeys = Object.keys(propTypes || {});
  var OnlyUpdateForPropTypes = (0, _onlyUpdateForKeys2.default)(propKeys)(BaseComponent);

  if (process.env.NODE_ENV !== 'production') {
    return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'onlyUpdateForPropTypes'))(OnlyUpdateForPropTypes);
  }
  return OnlyUpdateForPropTypes;
};

exports.default = onlyUpdateForPropTypes;

//# sourceMappingURL=onlyUpdateForPropTypes.js.map