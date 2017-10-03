'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrapDisplayName = require('../wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

test('wrapDisplayName wraps the display name of a React component with the name of an HoC, Relay-style', function () {
  var SomeComponent = function (_React$Component) {
    _inherits(SomeComponent, _React$Component);

    function SomeComponent() {
      _classCallCheck(this, SomeComponent);

      return _possibleConstructorReturn(this, (SomeComponent.__proto__ || Object.getPrototypeOf(SomeComponent)).apply(this, arguments));
    }

    _createClass(SomeComponent, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement('div', null);
      }
    }]);

    return SomeComponent;
  }(_react2.default.Component);

  expect((0, _wrapDisplayName2.default)(SomeComponent, 'someHoC')).toBe('someHoC(SomeComponent)');
});

//# sourceMappingURL=wrapDisplayName-test.js.map