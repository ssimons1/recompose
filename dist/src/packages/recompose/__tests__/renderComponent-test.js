'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _renderComponent = require('../renderComponent');

var _renderComponent2 = _interopRequireDefault(_renderComponent);

var _withState = require('../withState');

var _withState2 = _interopRequireDefault(_withState);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _branch = require('../branch');

var _branch2 = _interopRequireDefault(_branch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renderComponent always renders the given component', function () {
  var componentA = _sinon2.default.spy(function () {
    return null;
  });
  var componentB = _sinon2.default.spy(function () {
    return null;
  });

  var Foobar = (0, _compose2.default)((0, _withState2.default)('flip', 'updateFlip', false), (0, _branch2.default)(function (props) {
    return props.flip;
  }, (0, _renderComponent2.default)(componentA), (0, _renderComponent2.default)(componentB)))(null);

  (0, _enzyme.mount)(_react2.default.createElement(Foobar, null));
  var updateFlip = componentB.firstCall.args[0].updateFlip;


  expect(componentB.calledOnce).toBe(true);
  expect(componentA.notCalled).toBe(true);

  updateFlip(true);
  expect(componentB.calledOnce).toBe(true);
  expect(componentA.calledOnce).toBe(true);
});

//# sourceMappingURL=renderComponent-test.js.map