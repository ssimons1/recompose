'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _withReducer = require('../withReducer');

var _withReducer2 = _interopRequireDefault(_withReducer);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _flattenProp = require('../flattenProp');

var _flattenProp2 = _interopRequireDefault(_flattenProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SET_COUNTER = 'SET_COUNTER';

test('adds a stateful value and a function for updating it', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var initialState = { counter: 0 };

  var reducer = function reducer(state, action) {
    return action.type === SET_COUNTER ? { counter: action.payload } : state;
  };

  var Counter = (0, _compose2.default)((0, _withReducer2.default)('state', 'dispatch', reducer, initialState), (0, _flattenProp2.default)('state'))(component);

  expect(Counter.displayName).toBe('withReducer(flattenProp(component))');

  (0, _enzyme.mount)(_react2.default.createElement(Counter, null));
  var dispatch = component.firstCall.args[0].dispatch;


  expect(component.lastCall.args[0].counter).toBe(0);

  dispatch({ type: SET_COUNTER, payload: 18 });
  expect(component.lastCall.args[0].counter).toBe(18);
});

test('calls initialState when it is a function', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var initialState = function initialState(_ref) {
    var initialCount = _ref.initialCount;
    return { counter: initialCount };
  };

  var reducer = function reducer(state, action) {
    return action.type === SET_COUNTER ? { counter: action.payload } : state;
  };

  var Counter = (0, _compose2.default)((0, _withReducer2.default)('state', 'dispatch', reducer, initialState), (0, _flattenProp2.default)('state'))(component);

  (0, _enzyme.mount)(_react2.default.createElement(Counter, { initialCount: 10 }));

  expect(component.lastCall.args[0].counter).toBe(10);
});

test('receives state from reducer when initialState is not provided', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var initialState = { counter: 0 };

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];
    return action.type === SET_COUNTER ? { counter: action.payload } : state;
  };

  var Counter = (0, _compose2.default)((0, _withReducer2.default)('state', 'dispatch', reducer), (0, _flattenProp2.default)('state'))(component);

  (0, _enzyme.mount)(_react2.default.createElement(Counter, null));

  expect(component.lastCall.args[0].counter).toBe(0);
});

//# sourceMappingURL=withReducer-test.js.map