'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _createSink = require('../createSink');

var _createSink2 = _interopRequireDefault(_createSink);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _withState = require('../withState');

var _withState2 = _interopRequireDefault(_withState);

var _mapProps = require('../mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

test('createSink creates a React component that fires a callback when receiving new props', function () {
  var spy = _sinon2.default.spy();
  var Sink = (0, _createSink2.default)(spy);
  var Counter = (0, _compose2.default)((0, _withState2.default)('counter', 'updateCounter', 0), (0, _mapProps2.default)(function (_ref) {
    var updateCounter = _ref.updateCounter,
        rest = _objectWithoutProperties(_ref, ['updateCounter']);

    return Object.assign({
      increment: function increment() {
        return updateCounter(function (n) {
          return n + 1;
        });
      }
    }, rest);
  }))(Sink);

  (0, _enzyme.mount)(_react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(Counter, null)
  ));

  var increment = spy.lastCall.args[0].increment;

  var getCounter = function getCounter() {
    return spy.lastCall.args[0].counter;
  };
  expect(getCounter()).toBe(0);
  increment();
  expect(getCounter()).toBe(1);
  increment();
  expect(getCounter()).toBe(2);
});

//# sourceMappingURL=createSink-test.js.map