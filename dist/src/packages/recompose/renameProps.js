Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _omit = require('./utils/omit')

const _omit2 = _interopRequireDefault(_omit)

const _pick = require('./utils/pick')

const _pick2 = _interopRequireDefault(_pick)

const _mapProps = require('./mapProps')

const _mapProps2 = _interopRequireDefault(_mapProps)

const _setDisplayName = require('./setDisplayName')

const _setDisplayName2 = _interopRequireDefault(_setDisplayName)

const _wrapDisplayName = require('./wrapDisplayName')

const _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @name renameProps
 * @description Renames multiple props, using a map of old prop names to new prop names.
 * @param {object} nameMap
 */

const keys = Object.keys

const mapKeys = function mapKeys(obj, func) {
  return keys(obj).reduce((result, key) => {
    const val = obj[key]
    /* eslint-disable no-param-reassign */
    result[func(val, key)] = val
    /* eslint-enable no-param-reassign */
    return result
  }, {})
}

const renameProps = function renameProps(nameMap) {
  const hoc = (0, _mapProps2.default)(props =>
    Object.assign(
      {},
      (0, _omit2.default)(props, keys(nameMap)),
      mapKeys(
        (0, _pick2.default)(props, keys(nameMap)),
        (_, oldName) => nameMap[oldName]
      )
    )
  )
  if (process.env.NODE_ENV !== 'production') {
    return function(BaseComponent) {
      return (0, _setDisplayName2.default)(
        (0, _wrapDisplayName2.default)(BaseComponent, 'renameProps')
      )(hoc(BaseComponent))
    }
  }
  return hoc
}

exports.default = renameProps

// # sourceMappingURL=renameProps.js.map
