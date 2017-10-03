'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _rxjs = require('rxjs');

var _rxjsObservableConfig = require('../rxjsObservableConfig');

var _rxjsObservableConfig2 = _interopRequireDefault(_rxjsObservableConfig);

var _componentFromStream = require('../componentFromStream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentFromStream = (0, _componentFromStream.componentFromStreamWithConfig)(_rxjsObservableConfig2.default);

test('componentFromStream creates a component from a prop stream transformation', function () {
  var Double = componentFromStream(function (props$) {
    return props$.map(function (_ref) {
      var n = _ref.n;
      return _react2.default.createElement(
        'div',
        null,
        n * 2
      );
    });
  });
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Double, { n: 112 }));
  var div = wrapper.find('div');
  expect(div.text()).toBe('224');
  wrapper.setProps({ n: 358 });
  expect(div.text()).toBe('716');
});

test('componentFromStream unsubscribes from stream before unmounting', function () {
  var subscriptions = 0;
  var vdom$ = new _rxjs.Observable(function (observer) {
    subscriptions += 1;
    observer.next(_react2.default.createElement('div', null));
    return {
      unsubscribe: function unsubscribe() {
        subscriptions -= 1;
      }
    };
  });
  var Div = componentFromStream(function () {
    return vdom$;
  });
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null));
  expect(subscriptions).toBe(1);
  wrapper.unmount();
  expect(subscriptions).toBe(0);
});

test('componentFromStream renders nothing until the stream emits a value', function () {
  var vdom$ = new _rxjs.Subject();
  var Div = componentFromStream(function () {
    return vdom$.mapTo(_react2.default.createElement('div', null));
  });
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null));
  expect(wrapper.find('div').length).toBe(0);
  vdom$.next();
  expect(wrapper.find('div').length).toBe(1);
});

test('handler multiple observers of props stream', function () {
  var Div = componentFromStream(function (props$) {
    return (
      // Adds three observers to props stream
      props$.combineLatest(props$, props$, function (props1) {
        return _react2.default.createElement('div', props1);
      })
    );
  });

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, { value: 1 }));
  var div = wrapper.find('div');

  expect(div.prop('value')).toBe(1);
  wrapper.setProps({ value: 2 });
  expect(div.prop('value')).toBe(2);
});

test('complete props stream before unmounting', function () {
  var counter = 0;

  var Div = componentFromStream(function (props$) {
    var first$ = props$.first().do(function () {
      counter += 1;
    });

    var last$ = props$.last().do(function () {
      counter -= 1;
    }).startWith(null);

    return props$.combineLatest(first$, last$, function (props1) {
      return _react2.default.createElement('div', props1);
    });
  });

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null));

  expect(counter).toBe(1);
  expect(wrapper.find('div').length).toBe(1);

  wrapper.unmount();
  expect(counter).toBe(0);
});

test('completed props stream should throw an exception', function () {
  var Div = componentFromStream(function (props$) {
    var first$ = props$.filter(function () {
      return false;
    }).first().startWith(null);

    return props$.combineLatest(first$, function (props1) {
      return _react2.default.createElement('div', props1);
    });
  });

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Div, null));

  expect(wrapper.find('div').length).toBe(1);

  expect(function () {
    return wrapper.unmount();
  }).toThrowError(/no elements in sequence/);
});

//# sourceMappingURL=componentFromStream-test.js.map