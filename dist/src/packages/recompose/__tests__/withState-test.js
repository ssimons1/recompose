'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _withState = require('../withState');

var _withState2 = _interopRequireDefault(_withState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('withState adds a stateful value and a function for updating it', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _withState2.default)('counter', 'updateCounter', 0)(component);
  expect(Counter.displayName).toBe('withState(component)');

  (0, _enzyme.mount)(_react2.default.createElement(Counter, { pass: 'through' }));
  var updateCounter = component.firstCall.args[0].updateCounter;


  expect(component.lastCall.args[0].counter).toBe(0);
  expect(component.lastCall.args[0].pass).toBe('through');

  updateCounter(function (n) {
    return n + 9;
  });
  updateCounter(function (n) {
    return n * 2;
  });

  expect(component.lastCall.args[0].counter).toBe(18);
  expect(component.lastCall.args[0].pass).toBe('through');
});

test('withState also accepts a non-function, which is passed directly to setState()', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _withState2.default)('counter', 'updateCounter', 0)(component);
  (0, _enzyme.mount)(_react2.default.createElement(Counter, null));
  var updateCounter = component.firstCall.args[0].updateCounter;


  updateCounter(18);
  expect(component.lastCall.args[0].counter).toBe(18);
});

test('withState accepts setState() callback', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _withState2.default)('counter', 'updateCounter', 0)(component);
  (0, _enzyme.mount)(_react2.default.createElement(Counter, null));
  var updateCounter = component.firstCall.args[0].updateCounter;


  var renderSpy = _sinon2.default.spy(function () {
    expect(component.lastCall.args[0].counter).toBe(18);
  });

  expect(component.lastCall.args[0].counter).toBe(0);
  updateCounter(18, renderSpy);
});

test('withState also accepts initialState as function of props', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _withState2.default)('counter', 'updateCounter', function (props) {
    return props.initialCounter;
  })(component);

  (0, _enzyme.mount)(_react2.default.createElement(Counter, { initialCounter: 1 }));
  var updateCounter = component.firstCall.args[0].updateCounter;


  expect(component.lastCall.args[0].counter).toBe(1);
  updateCounter(function (n) {
    return n * 3;
  });
  expect(component.lastCall.args[0].counter).toBe(3);
});

//# sourceMappingURL=withState-test.js.map