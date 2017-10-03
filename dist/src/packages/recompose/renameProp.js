'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _omit = require('./utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _mapProps = require('./mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

var _setDisplayName = require('./setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = require('./wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name renameProp
 * @description Renames a single prop.
 * @param {string} oldName 
 * @param {string} newName 
 */

var renameProp = function renameProp(oldName, newName) {
  var hoc = (0, _mapProps2.default)(function (props) {
    return Object.assign({}, (0, _omit2.default)(props, [oldName]), _defineProperty({}, newName, props[oldName]));
  });
  if (process.env.NODE_ENV !== 'production') {
    return function (BaseComponent) {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'renameProp'))(hoc(BaseComponent));
    };
  }
  return hoc;
};

exports.default = renameProp;

//# sourceMappingURL=renameProp.js.map