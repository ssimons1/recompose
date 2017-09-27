Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _rxjs = require('rxjs')

const _rxjs2 = _interopRequireDefault(_rxjs)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const config = {
  fromESObservable: _rxjs2.default.Observable.from,
  toESObservable: function toESObservable(stream) {
    return stream
  },
}

exports.default = config

// # sourceMappingURL=rxjsObservableConfig.js.map
