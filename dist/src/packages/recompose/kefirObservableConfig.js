Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _kefir = require('kefir')

const _kefir2 = _interopRequireDefault(_kefir)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const config = {
  fromESObservable: _kefir2.default.fromESObservable,
  toESObservable: function toESObservable(stream) {
    return stream.toESObservable()
  },
}

exports.default = config

// # sourceMappingURL=kefirObservableConfig.js.map
