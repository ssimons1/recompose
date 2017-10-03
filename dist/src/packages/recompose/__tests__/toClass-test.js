'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _toClass = require('../toClass');

var _toClass2 = _interopRequireDefault(_toClass);

var _withContext = require('../withContext');

var _withContext2 = _interopRequireDefault(_withContext);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

test('toClass returns the base component if it is already a class', function () {
  var BaseComponent = function (_React$Component) {
    _inherits(BaseComponent, _React$Component);

    function BaseComponent() {
      _classCallCheck(this, BaseComponent);

      return _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).apply(this, arguments));
    }

    _createClass(BaseComponent, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement('div', null);
      }
    }]);

    return BaseComponent;
  }(_react2.default.Component);

  var TestComponent = (0, _toClass2.default)(BaseComponent);
  expect(TestComponent).toBe(BaseComponent);
});

test('toClass copies propTypes, displayName, contextTypes and defaultProps from base component', function () {
  var StatelessComponent = function StatelessComponent() {
    return _react2.default.createElement('div', null);
  };

  StatelessComponent.displayName = 'Stateless';
  StatelessComponent.propTypes = { foo: _propTypes2.default.string };
  StatelessComponent.contextTypes = { bar: _propTypes2.default.object };
  StatelessComponent.defaultProps = { foo: 'bar', fizz: 'buzz' };

  var TestComponent = (0, _toClass2.default)(StatelessComponent);

  expect(TestComponent.displayName).toBe('Stateless');
  expect(TestComponent.propTypes).toEqual({ foo: _propTypes2.default.string });
  expect(TestComponent.contextTypes).toEqual({ bar: _propTypes2.default.object });
  expect(TestComponent.defaultProps).toEqual({ foo: 'bar', fizz: 'buzz' });
});

test('toClass passes defaultProps correctly', function () {
  var StatelessComponent = _sinon2.default.spy(function () {
    return null;
  });

  StatelessComponent.displayName = 'Stateless';
  StatelessComponent.propTypes = { foo: _propTypes2.default.string };
  StatelessComponent.contextTypes = { bar: _propTypes2.default.object };
  StatelessComponent.defaultProps = { foo: 'bar', fizz: 'buzz' };

  var TestComponent = (0, _toClass2.default)(StatelessComponent);

  (0, _enzyme.mount)(_react2.default.createElement(TestComponent, null));
  expect(StatelessComponent.lastCall.args[0].foo).toBe('bar');
  expect(StatelessComponent.lastCall.args[0].fizz).toBe('buzz');
});

test('toClass passes context and props correctly', function () {
  var store = {};

  var Provider = function (_React$Component2) {
    _inherits(Provider, _React$Component2);

    function Provider() {
      _classCallCheck(this, Provider);

      return _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
    }

    _createClass(Provider, [{
      key: 'render',
      value: function render() {
        return this.props.children;
      }
    }]);

    return Provider;
  }(_react2.default.Component);

  Provider.propTypes = {
    children: _propTypes2.default.node
  };


  Provider = (0, _compose2.default)((0, _withContext2.default)({ store: _propTypes2.default.object }, function (props) {
    return { store: props.store };
  }))(Provider);

  var StatelessComponent = function StatelessComponent(props, context) {
    return _react2.default.createElement('div', { 'data-props': props, 'data-context': context });
  };

  StatelessComponent.contextTypes = { store: _propTypes2.default.object };

  var TestComponent = (0, _toClass2.default)(StatelessComponent);

  var div = (0, _enzyme.mount)(_react2.default.createElement(
    Provider,
    { store: store },
    _react2.default.createElement(TestComponent, { fizz: 'fizzbuzz' })
  )).find('div');

  expect(div.prop('data-props').fizz).toBe('fizzbuzz');
  expect(div.prop('data-context').store).toBe(store);
});

test('toClass works with strings (DOM components)', function () {
  var Div = (0, _toClass2.default)('div');
  var div = (0, _enzyme.mount)(_react2.default.createElement(
    Div,
    null,
    'Hello'
  ));
  expect(div.html()).toBe('<div>Hello</div>');
});

//# sourceMappingURL=toClass-test.js.map