'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapPropsStreamWithConfig = undefined;

var _symbolObservable = require('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

var _createEagerFactory = require('./createEagerFactory');

var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

var _componentFromStream = require('./componentFromStream');

var _setDisplayName = require('./setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = require('./wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _setObservableConfig = require('./setObservableConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name mapPropsStreamWithConfig
 * @description mapPropsStreamWithConfig() is an alternative to mapPropsStream() that accepts a observable config and returns a customized mapPropsStream() that uses the specified observable library. See componentFromStreamWithConfig() above.
 * @example 
 * const enhance = mapPropsStream(props$ => {
 *   const timeElapsed$ = Observable.interval(1000)
 *   return props$.combineLatest(timeElapsed$, (props, timeElapsed) => ({
 *     ...props,
 *     timeElapsed
 *   }))
 * })
 * 
 * const Timer = enhance(({ timeElapsed }) =>
 *   <div>Time elapsed: {timeElapsed}</div>
 * )
 * @param {object} config
 * 
 */

var identity = function identity(t) {
  return t;
};

var mapPropsStreamWithConfig = exports.mapPropsStreamWithConfig = function mapPropsStreamWithConfig(config) {
  var componentFromStream = (0, _componentFromStream.componentFromStreamWithConfig)({
    fromESObservable: identity,
    toESObservable: identity
  });
  return function (transform) {
    return function (BaseComponent) {
      var factory = (0, _createEagerFactory2.default)(BaseComponent);
      var fromESObservable = config.fromESObservable,
          toESObservable = config.toESObservable;

      return componentFromStream(function (props$) {
        return _defineProperty({
          subscribe: function subscribe(observer) {
            var subscription = toESObservable(transform(fromESObservable(props$))).subscribe({
              next: function next(childProps) {
                return observer.next(factory(childProps));
              }
            });
            return {
              unsubscribe: function unsubscribe() {
                return subscription.unsubscribe();
              }
            };
          }
        }, _symbolObservable2.default, function () {
          return this;
        });
      });
    };
  };
};

/**
 * @name mapPropsStream
 * @description A higher-order component version of [componentFromStream()](http://www.bitsrc.io/recompose/recompose/higher-order-components/component-from-stream) — accepts a function that maps an observable stream of owner props to a stream of child props, rather than directly to a stream of React nodes. The child props are then passed to a base component.
 * You may want to use this version to interoperate with other Recompose higher-order component helpers.
 * @param {object} transform
 * 
 */

var mapPropsStream = function mapPropsStream(transform) {
  var hoc = mapPropsStreamWithConfig(_setObservableConfig.config)(transform);

  if (process.env.NODE_ENV !== 'production') {
    return function (BaseComponent) {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'mapPropsStream'))(hoc(BaseComponent));
    };
  }
  return hoc;
};

exports.default = mapPropsStream;

//# sourceMappingURL=mapPropsStream.js.map