'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _withStateHandlers = require('../withStateHandlers');

var _withStateHandlers2 = _interopRequireDefault(_withStateHandlers);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('withStateHandlers should persist events passed as argument', function () {
  var component = function component(_ref) {
    var value = _ref.value,
        onChange = _ref.onChange;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', { type: 'text', value: value, onChange: onChange }),
      _react2.default.createElement(
        'p',
        null,
        value
      )
    );
  };

  var InputComponent = (0, _withStateHandlers2.default)({ value: '' }, {
    onChange: function onChange() {
      return function (e) {
        return {
          value: e.target.value
        };
      };
    }
  })(component);

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(InputComponent, null));
  var input = wrapper.find('input');
  var output = wrapper.find('p');
  // having that enzyme simulate does not simulate real situation
  // emulate persist
  input.simulate('change', {
    persist: function persist() {
      this.target = { value: 'Yay' };
    }
  });
  expect(output.text()).toBe('Yay');

  input.simulate('change', { target: { value: 'empty' } });
  expect(output.text()).toBe('empty');
});

test('withStateHandlers adds a stateful value and a function for updating it', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _withStateHandlers2.default)({ counter: 0 }, {
    updateCounter: function updateCounter(_ref2) {
      var counter = _ref2.counter;
      return function (increment) {
        return {
          counter: counter + increment
        };
      };
    }
  })(component);
  expect(Counter.displayName).toBe('withStateHandlers(component)');

  (0, _enzyme.mount)(_react2.default.createElement(Counter, { pass: 'through' }));
  var updateCounter = component.firstCall.args[0].updateCounter;


  expect(component.lastCall.args[0].counter).toBe(0);
  expect(component.lastCall.args[0].pass).toBe('through');

  updateCounter(9);
  expect(component.lastCall.args[0].counter).toBe(9);
  updateCounter(1);
  updateCounter(10);

  expect(component.lastCall.args[0].counter).toBe(20);
  expect(component.lastCall.args[0].pass).toBe('through');
});

test('withStateHandlers accepts initialState as function of props', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _withStateHandlers2.default)(function (_ref3) {
    var initialCounter = _ref3.initialCounter;
    return {
      counter: initialCounter
    };
  }, {
    updateCounter: function updateCounter(_ref4) {
      var counter = _ref4.counter;
      return function (increment) {
        return {
          counter: counter + increment
        };
      };
    }
  })(component);

  var initialCounter = 101;

  (0, _enzyme.mount)(_react2.default.createElement(Counter, { initialCounter: initialCounter }));
  expect(component.lastCall.args[0].counter).toBe(initialCounter);
});

test('withStateHandlers initial state must be function or object or null or undefined', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _withStateHandlers2.default)(1, {})(component);
  // React throws an error
  expect(function () {
    return (0, _enzyme.mount)(_react2.default.createElement(Counter, null));
  }).toThrow();
});

test('withStateHandlers have access to props', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _withStateHandlers2.default)(function (_ref5) {
    var initialCounter = _ref5.initialCounter;
    return {
      counter: initialCounter
    };
  }, {
    increment: function increment(_ref6, _ref7) {
      var counter = _ref6.counter;
      var incrementValue = _ref7.incrementValue;
      return function () {
        return {
          counter: counter + incrementValue
        };
      };
    }
  })(component);

  var initialCounter = 101;
  var incrementValue = 37;

  (0, _enzyme.mount)(_react2.default.createElement(Counter, { initialCounter: initialCounter, incrementValue: incrementValue }));

  var increment = component.firstCall.args[0].increment;


  increment();
  expect(component.lastCall.args[0].counter).toBe(initialCounter + incrementValue);
});

test('withStateHandlers passes immutable state updaters', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _withStateHandlers2.default)(function (_ref8) {
    var initialCounter = _ref8.initialCounter;
    return {
      counter: initialCounter
    };
  }, {
    increment: function increment(_ref9, _ref10) {
      var counter = _ref9.counter;
      var incrementValue = _ref10.incrementValue;
      return function () {
        return {
          counter: counter + incrementValue
        };
      };
    }
  })(component);

  var initialCounter = 101;
  var incrementValue = 37;

  (0, _enzyme.mount)(_react2.default.createElement(Counter, { initialCounter: initialCounter, incrementValue: incrementValue }));

  var increment = component.firstCall.args[0].increment;


  increment();
  expect(component.lastCall.args[0].counter).toBe(initialCounter + incrementValue);
});

test('withStateHandlers does not rerender if state updater returns undefined', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _withStateHandlers2.default)(function (_ref11) {
    var initialCounter = _ref11.initialCounter;
    return {
      counter: initialCounter
    };
  }, {
    updateCounter: function updateCounter(_ref12) {
      var counter = _ref12.counter;
      return function (increment) {
        return increment === 0 ? undefined : {
          counter: counter + increment
        };
      };
    }
  })(component);

  var initialCounter = 101;

  (0, _enzyme.mount)(_react2.default.createElement(Counter, { initialCounter: initialCounter }));
  expect(component.callCount).toBe(1);

  var updateCounter = component.firstCall.args[0].updateCounter;


  updateCounter(1);
  expect(component.callCount).toBe(2);

  updateCounter(0);
  expect(component.callCount).toBe(2);
});

test('withStateHandlers rerenders if parent props changed', function () {
  var component = _sinon2.default.spy(function () {
    return null;
  });
  component.displayName = 'component';

  var Counter = (0, _compose2.default)((0, _withStateHandlers2.default)(function (_ref13) {
    var initialCounter = _ref13.initialCounter;
    return {
      counter: initialCounter
    };
  }, {
    increment: function increment(_ref14) {
      var counter = _ref14.counter;
      return function (incrementValue) {
        return {
          counter: counter + incrementValue
        };
      };
    }
  }), (0, _withStateHandlers2.default)({ incrementValue: 1 }, {
    // updates parent state and return undefined
    updateParentIncrement: function updateParentIncrement(_ref15, _ref16) {
      var incrementValue = _ref15.incrementValue;
      var increment = _ref16.increment;
      return function () {
        increment(incrementValue);
        return undefined;
      };
    }
  }))(component);

  var initialCounter = 101;

  (0, _enzyme.mount)(_react2.default.createElement(Counter, { initialCounter: initialCounter }));

  var updateParentIncrement = component.firstCall.args[0].updateParentIncrement;


  updateParentIncrement();
  expect(component.lastCall.args[0].counter).toBe(initialCounter + 1);
});

//# sourceMappingURL=withStateHandlers-test.js.map