'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEventHandlerWithConfig = undefined;

var _symbolObservable = require('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

var _changeEmitter = require('change-emitter');

var _setObservableConfig = require('./setObservableConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name createEventHandlerWithConfig
 * @description createEventHandlerWithConfig is an alternative to createEventHandler() that accepts an observable config and returns a customized createEventHandler() that uses the specified observable library. See [componentFromStreamWithConfig()](http://www.bitsrc.io/recompose/recompose/observable-utilities/component-from-stream).
 * @param {object} config
 */

var createEventHandlerWithConfig = exports.createEventHandlerWithConfig = function createEventHandlerWithConfig(config) {
  return function () {
    var emitter = (0, _changeEmitter.createChangeEmitter)();
    var stream = config.fromESObservable(_defineProperty({
      subscribe: function subscribe(observer) {
        var unsubscribe = emitter.listen(function (value) {
          return observer.next(value);
        });
        return { unsubscribe: unsubscribe };
      }
    }, _symbolObservable2.default, function () {
      return this;
    }));
    return {
      handler: emitter.emit,
      stream: stream
    };
  };
};

/**
 * @name createEventHandler
 * @description Returns an object with properties handler and stream. stream is an observable sequence, and handler is a function that pushes new values onto the sequence. Useful for creating event handlers like onClick.
 * @param {object} config
 */

var createEventHandler = createEventHandlerWithConfig(_setObservableConfig.config);

exports.default = createEventHandler;

//# sourceMappingURL=createEventHandler.js.map