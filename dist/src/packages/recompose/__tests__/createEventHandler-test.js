'use strict';

var _createEventHandler3 = require('../createEventHandler');

var _createEventHandler4 = _interopRequireDefault(_createEventHandler3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('createEventHandler creates an event handler and a corresponding stream', function () {
  var result = [];

  var _createEventHandler = (0, _createEventHandler4.default)(),
      stream = _createEventHandler.stream,
      handler = _createEventHandler.handler;

  var subscription = stream.subscribe({ next: function next(v) {
      return result.push(v);
    } });

  handler(1);
  handler(2);
  handler(3);

  subscription.unsubscribe();
  expect(result).toEqual([1, 2, 3]);
});

test('handles multiple subscribers', function () {
  var result1 = [];
  var result2 = [];

  var _createEventHandler2 = (0, _createEventHandler4.default)(),
      handler = _createEventHandler2.handler,
      stream = _createEventHandler2.stream;

  var subscription1 = stream.subscribe({ next: function next(v) {
      return result1.push(v);
    } });
  var subscription2 = stream.subscribe({ next: function next(v) {
      return result2.push(v);
    } });

  handler(1);
  handler(2);
  handler(3);

  subscription1.unsubscribe();
  subscription2.unsubscribe();

  expect(result1).toEqual([1, 2, 3]);
  expect(result2).toEqual([1, 2, 3]);
});

//# sourceMappingURL=createEventHandler-test.js.map