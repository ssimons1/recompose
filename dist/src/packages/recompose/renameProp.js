Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _omit = require('./utils/omit')

const _omit2 = _interopRequireDefault(_omit)

const _mapProps = require('./mapProps')

const _mapProps2 = _interopRequireDefault(_mapProps)

const _setDisplayName = require('./setDisplayName')

const _setDisplayName2 = _interopRequireDefault(_setDisplayName)

const _wrapDisplayName = require('./wrapDisplayName')

const _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

/**
 * @name renameProp
 * @description Renames a single prop.
 * @param {string} oldName 
 * @param {string} newName 
 */

const renameProp = function renameProp(oldName, newName) {
  const hoc = (0, _mapProps2.default)(props =>
    Object.assign(
      {},
      (0, _omit2.default)(props, [oldName]),
      _defineProperty({}, newName, props[oldName])
    )
  )
  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'renameProp')
      )(hoc(BaseComponent))
    }
  }
  return hoc
}

exports.default = renameProp

// # sourceMappingURL=renameProp.js.map
