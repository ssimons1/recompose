Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _most = require('most')

const config = {
  fromESObservable: _most.from || _most.Stream.from,
  toESObservable: function toESObservable(stream) {
    return stream
  },
}

exports.default = config

// # sourceMappingURL=mostObservableConfig.js.map
