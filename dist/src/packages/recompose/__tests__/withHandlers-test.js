'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _withHandlers = require('../withHandlers');

var _withHandlers2 = _interopRequireDefault(_withHandlers);

var _withState = require('../withState');

var _withState2 = _interopRequireDefault(_withState);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('withHandlers passes handlers to base component', function () {
  var submittedFormValue = void 0;
  var enhanceForm = (0, _compose2.default)((0, _withState2.default)('value', 'updateValue', ''), (0, _withHandlers2.default)({
    onChange: function onChange(props) {
      return function (event) {
        props.updateValue(event.target.value);
      };
    },
    onSubmit: function onSubmit(props) {
      return function () {
        submittedFormValue = props.value;
      };
    }
  }));

  var Form = enhanceForm(function (_ref) {
    var value = _ref.value,
        onChange = _ref.onChange,
        onSubmit = _ref.onSubmit;
    return _react2.default.createElement(
      'form',
      { onSubmit: onSubmit },
      _react2.default.createElement(
        'label',
        null,
        'Value',
        _react2.default.createElement('input', { type: 'text', value: value, onChange: onChange })
      ),
      _react2.default.createElement(
        'p',
        null,
        value
      )
    );
  });

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Form, null));
  var input = wrapper.find('input');
  var output = wrapper.find('p');
  var form = wrapper.find('form');

  input.simulate('change', { target: { value: 'Yay' } });
  expect(output.text()).toBe('Yay');

  input.simulate('change', { target: { value: 'Yay!!' } });
  expect(output.text()).toBe('Yay!!');

  form.simulate('submit');
  expect(submittedFormValue).toBe('Yay!!');
});

test('withHandlers passes immutable handlers', function () {
  var enhance = (0, _withHandlers2.default)({
    handler: function handler() {
      return function () {
        return null;
      };
    }
  });
  var component = _sinon2.default.spy(function () {
    return null;
  });
  var Div = enhance(component);

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null));
  wrapper.setProps({ foo: 'bar' });

  expect(component.calledTwice).toBe(true);
  expect(component.firstCall.args[0].handler).toBe(component.secondCall.args[0].handler);
});

test('withHandlers caches handlers properly', function () {
  var handlerCreationSpy = _sinon2.default.spy();
  var handlerCallSpy = _sinon2.default.spy();

  var enhance = (0, _withHandlers2.default)({
    handler: function handler(props) {
      handlerCreationSpy(props);
      return function (val) {
        handlerCallSpy(val);
      };
    }
  });

  var component = _sinon2.default.spy(function () {
    return null;
  });
  var Div = enhance(component);

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, { foo: 'bar' }));
  var handler = component.firstCall.args[0].handler;

  // Don't create handler until it is called

  expect(handlerCreationSpy.callCount).toBe(0);
  expect(handlerCallSpy.callCount).toBe(0);

  handler(1);
  expect(handlerCreationSpy.callCount).toBe(1);
  expect(handlerCreationSpy.args[0]).toEqual([{ foo: 'bar' }]);
  expect(handlerCallSpy.callCount).toBe(1);
  expect(handlerCallSpy.args[0]).toEqual([1]);

  // Props haven't changed; should use cached handler
  handler(2);
  expect(handlerCreationSpy.callCount).toBe(1);
  expect(handlerCallSpy.callCount).toBe(2);
  expect(handlerCallSpy.args[1]).toEqual([2]);

  wrapper.setProps({ foo: 'baz' });
  handler(3);
  // Props did change; handler should be recreated
  expect(handlerCreationSpy.callCount).toBe(2);
  expect(handlerCreationSpy.args[1]).toEqual([{ foo: 'baz' }]);
  expect(handlerCallSpy.callCount).toBe(3);
  expect(handlerCallSpy.args[2]).toEqual([3]);
});

test('withHandlers warns if handler is not a higher-order function', function () {
  var error = _sinon2.default.stub(console, 'error');

  var Button = (0, _withHandlers2.default)({
    onClick: function onClick() {}
  })('button');

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Button, null));
  var button = wrapper.find('button');

  expect(function () {
    return button.simulate('click');
  }).toThrowError(/undefined/);

  expect(error.firstCall.args[0]).toBe('withHandlers(): Expected a map of higher-order functions. Refer to ' + 'the docs for more info.');

  /* eslint-disable */
  console.error.restore();
  /* eslint-enable */
});

test('withHandlers allow handers to be a factory', function () {
  var enhance = (0, _withHandlers2.default)(function (initialProps) {
    var cache_ = void 0;

    return {
      handler: function handler() {
        return function () {
          if (cache_) {
            return cache_;
          }
          cache_ = Object.assign({}, initialProps);

          return cache_;
        };
      }
    };
  });

  var componentHandlers = [];
  var componentHandlers2 = [];

  var Component = enhance(function (_ref2) {
    var handler = _ref2.handler;

    componentHandlers.push(handler());
    return null;
  });

  var Component2 = enhance(function (_ref3) {
    var handler = _ref3.handler;

    componentHandlers2.push(handler());
    return null;
  });

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Component, { hello: 'foo' }));
  wrapper.setProps({ hello: 'bar' });
  expect(componentHandlers[0]).toBe(componentHandlers[1]);

  // check that cache is not shared
  (0, _enzyme.mount)(_react2.default.createElement(Component2, { hello: 'foo' }));
  expect(componentHandlers[0]).toEqual(componentHandlers2[0]);
  expect(componentHandlers[0]).not.toBe(componentHandlers2[0]);
});

//# sourceMappingURL=withHandlers-test.js.map