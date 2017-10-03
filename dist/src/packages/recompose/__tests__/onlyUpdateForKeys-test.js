'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _onlyUpdateForKeys = require('../onlyUpdateForKeys');

var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _withState = require('../withState');

var _withState2 = _interopRequireDefault(_withState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('onlyUpdateForKeys implements shouldComponentUpdate()', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _compose2.default)((0, _withState2.default)('counter', 'updateCounter', 0), (0, _withState2.default)('foobar', 'updateFoobar', 'foobar'), (0, _onlyUpdateForKeys2.default)(['counter']))(component);

  expect(Counter.displayName).toBe('withState(withState(onlyUpdateForKeys(component)))');

  (0, _enzyme.mount)(_react2.default.createElement(Counter, null));
  var _component$firstCall$ = component.firstCall.args[0],
      updateCounter = _component$firstCall$.updateCounter,
      updateFoobar = _component$firstCall$.updateFoobar;


  expect(component.lastCall.args[0].counter).toBe(0);
  expect(component.lastCall.args[0].foobar).toBe('foobar');

  // Does not update
  updateFoobar('barbaz');
  expect(component.calledOnce).toBe(true);

  updateCounter(42);
  expect(component.calledTwice).toBe(true);
  expect(component.lastCall.args[0].counter).toBe(42);
  expect(component.lastCall.args[0].foobar).toBe('barbaz');
});

//# sourceMappingURL=onlyUpdateForKeys-test.js.map