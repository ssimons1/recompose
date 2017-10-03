'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setDisplayName = require('./setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = require('./wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _createEagerFactory = require('./createEagerFactory');

var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name mapProps
 * @description Accepts a function that maps owner props to a new collection of props that are passed to the base component.
 * mapProps() pairs well with functional utility libraries like lodash/fp. For example, Recompose does not come with a omitProps() function, but you can easily build one using lodash-fp's omit():
 *
 * const omitProps = keys => mapProps(props => omit(keys, props))
 * 
 * // Because of currying in lodash-fp, this is the same as
 * const omitProps = compose(mapProps, omit)
 * @param {object} propsMapper 
 */

var mapProps = function mapProps(propsMapper) {
  return function (BaseComponent) {
    var factory = (0, _createEagerFactory2.default)(BaseComponent);
    var MapProps = function MapProps(props) {
      return factory(propsMapper(props));
    };
    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'mapProps'))(MapProps);
    }
    return MapProps;
  };
};

exports.default = mapProps;

//# sourceMappingURL=mapProps.js.map