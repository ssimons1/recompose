Object.defineProperty(exports, '__esModule', {
  value: true,
})

function _objectWithoutProperties(obj, keys) {
  const target = {}
  for (const i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

const omit = function omit(obj, keys) {
  const rest = _objectWithoutProperties(obj, [])

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (rest.hasOwnProperty(key)) {
      delete rest[key]
    }
  }
  return rest
}

exports.default = omit

// # sourceMappingURL=omit.js.map
