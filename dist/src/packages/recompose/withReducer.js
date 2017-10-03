'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _setDisplayName = require('./setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = require('./wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _createEagerFactory = require('./createEagerFactory');

var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @name withReducer
 * @description Similar to [withState()](http://www.bitsrc.io/recompose/recompose/higher-order-components/with-state), but state updates are applied using a reducer function. A reducer is a function that receives a state and an action, and returns a new state.
 * Passes two additional props to the base component: a state value, and a dispatch method. The dispatch method sends an action to the reducer, and the new state is applied.
 * @param {string} stateName 
 * @param {string} dispatchName 
 * @param {function} reducer 
 * @param {custom | function} initialState 
 */

var withReducer = function withReducer(stateName, dispatchName, reducer, initialState) {
  return function (BaseComponent) {
    var factory = (0, _createEagerFactory2.default)(BaseComponent);

    var WithReducer = function (_Component) {
      _inherits(WithReducer, _Component);

      function WithReducer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, WithReducer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WithReducer.__proto__ || Object.getPrototypeOf(WithReducer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          stateValue: _this.initializeStateValue()
        }, _this.dispatch = function (action) {
          return _this.setState(function (_ref2) {
            var stateValue = _ref2.stateValue;
            return {
              stateValue: reducer(stateValue, action)
            };
          });
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(WithReducer, [{
        key: 'initializeStateValue',
        value: function initializeStateValue() {
          if (initialState !== undefined) {
            return typeof initialState === 'function' ? initialState(this.props) : initialState;
          }
          return reducer(undefined, { type: '@@recompose/INIT' });
        }
      }, {
        key: 'render',
        value: function render() {
          var _Object$assign;

          return factory(Object.assign({}, this.props, (_Object$assign = {}, _defineProperty(_Object$assign, stateName, this.state.stateValue), _defineProperty(_Object$assign, dispatchName, this.dispatch), _Object$assign)));
        }
      }]);

      return WithReducer;
    }(_react.Component);

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'withReducer'))(WithReducer);
    }
    return WithReducer;
  };
};

exports.default = withReducer;

//# sourceMappingURL=withReducer.js.map