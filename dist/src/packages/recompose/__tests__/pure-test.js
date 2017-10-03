'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _pure = require('../pure');

var _pure2 = _interopRequireDefault(_pure);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _withState = require('../withState');

var _withState2 = _interopRequireDefault(_withState);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('pure implements shouldComponentUpdate() using shallowEqual()', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var initialTodos = ['eat', 'drink', 'sleep'];
  var Todos = (0, _compose2.default)((0, _withState2.default)('todos', 'updateTodos', initialTodos), _pure2.default, _utils.countRenders)(component);

  expect(Todos.displayName).toBe('withState(pure(countRenders(component)))');

  (0, _enzyme.mount)(_react2.default.createElement(Todos, null));
  var updateTodos = component.firstCall.args[0].updateTodos;


  expect(component.lastCall.args[0].todos).toBe(initialTodos);
  expect(component.lastCall.args[0].renderCount).toBe(1);

  // Does not re-render
  updateTodos(initialTodos);
  expect(component.calledOnce).toBe(true);

  updateTodos(function (todos) {
    return todos.slice(0, -1);
  });
  expect(component.calledTwice).toBe(true);
  expect(component.lastCall.args[0].todos).toEqual(['eat', 'drink']);
  expect(component.lastCall.args[0].renderCount).toBe(2);
});

//# sourceMappingURL=pure-test.js.map