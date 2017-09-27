Object.defineProperty(exports, '__esModule', {
  value: true,
})
const pick = function pick(obj, keys) {
  const result = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  }
  return result
}

exports.default = pick

// # sourceMappingURL=pick.js.map
