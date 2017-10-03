'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _withContext = require('../withContext');

var _withContext2 = _interopRequireDefault(_withContext);

var _getContext = require('../getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _mapProps = require('../mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/require-default-props */


test('withContext + getContext adds to and grabs from context', function () {
  // Mini React Redux clone
  var store = {
    getState: function getState() {
      return {
        todos: ['eat', 'drink', 'sleep'],
        counter: 12
      };
    }
  };

  var BaseProvider = function (_Component) {
    _inherits(BaseProvider, _Component);

    function BaseProvider() {
      _classCallCheck(this, BaseProvider);

      return _possibleConstructorReturn(this, (BaseProvider.__proto__ || Object.getPrototypeOf(BaseProvider)).apply(this, arguments));
    }

    _createClass(BaseProvider, [{
      key: 'render',
      value: function render() {
        return this.props.children;
      }
    }]);

    return BaseProvider;
  }(_react.Component);

  BaseProvider.propTypes = {
    children: _propTypes2.default.node
  };


  var Provider = (0, _compose2.default)((0, _withContext2.default)({ store: _propTypes2.default.object }, function (props) {
    return { store: props.store };
  }))(BaseProvider);

  expect(Provider.displayName).toBe('withContext(BaseProvider)');

  var connect = function connect(selector) {
    return (0, _compose2.default)((0, _getContext2.default)({ store: _propTypes2.default.object }), (0, _mapProps2.default)(function (props) {
      return selector(props.store.getState());
    }));
  };

  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var TodoList = connect(function (_ref) {
    var todos = _ref.todos;
    return { todos: todos };
  })(component);

  expect(TodoList.displayName).toBe('getContext(mapProps(component))');

  (0, _enzyme.mount)(_react2.default.createElement(
    Provider,
    { store: store },
    _react2.default.createElement(TodoList, null)
  ));

  expect(component.lastCall.args[0].todos).toEqual(['eat', 'drink', 'sleep']);
});

//# sourceMappingURL=withContext-test.js.map