'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _pick = require('./utils/pick');

var _pick2 = _interopRequireDefault(_pick);

var _shallowEqual = require('./shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _setDisplayName = require('./setDisplayName');

var _setDisplayName2 = _interopRequireDefault(_setDisplayName);

var _wrapDisplayName = require('./wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _createEagerFactory = require('./createEagerFactory');

var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @name withPropsOnChange
 * @description Like [withProps()](http://www.bitsrc.io/recompose/recompose/higher-order-components/with-props), except the new props are only created when one of the owner props specified by shouldMapOrKeys changes. This helps ensure that expensive computations inside [createProps()](http://www.bitsrc.io/recompose/recompose/higher-order-components/create-props) are only executed when necessary.
 * Instead of an array of prop keys, the first parameter can also be a function that returns a boolean, given the current props and the next props. This allows you to customize when [createProps()](http://www.bitsrc.io/recompose/recompose/higher-order-components/create-props) should be called.
 * @param {Array<string> | {object, object}} shouldMapOrKeys
 * @param {object} propsMapper
 */

var withPropsOnChange = function withPropsOnChange(shouldMapOrKeys, propsMapper) {
  return function (BaseComponent) {
    var factory = (0, _createEagerFactory2.default)(BaseComponent);
    var shouldMap = typeof shouldMapOrKeys === 'function' ? shouldMapOrKeys : function (props, nextProps) {
      return !(0, _shallowEqual2.default)((0, _pick2.default)(props, shouldMapOrKeys), (0, _pick2.default)(nextProps, shouldMapOrKeys));
    };

    var WithPropsOnChange = function (_Component) {
      _inherits(WithPropsOnChange, _Component);

      function WithPropsOnChange() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, WithPropsOnChange);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WithPropsOnChange.__proto__ || Object.getPrototypeOf(WithPropsOnChange)).call.apply(_ref, [this].concat(args))), _this), _this.computedProps = propsMapper(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(WithPropsOnChange, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (shouldMap(this.props, nextProps)) {
            this.computedProps = propsMapper(nextProps);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return factory(Object.assign({}, this.props, this.computedProps));
        }
      }]);

      return WithPropsOnChange;
    }(_react.Component);

    if (process.env.NODE_ENV !== 'production') {
      return (0, _setDisplayName2.default)((0, _wrapDisplayName2.default)(BaseComponent, 'withPropsOnChange'))(WithPropsOnChange);
    }
    return WithPropsOnChange;
  };
};

exports.default = withPropsOnChange;

//# sourceMappingURL=withPropsOnChange.js.map