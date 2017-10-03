'use strict';

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _branch = require('../branch');

var _branch2 = _interopRequireDefault(_branch);

var _compose = require('../compose');

var _compose2 = _interopRequireDefault(_compose);

var _withState = require('../withState');

var _withState2 = _interopRequireDefault(_withState);

var _withProps = require('../withProps');

var _withProps2 = _interopRequireDefault(_withProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('branch tests props and applies one of two HoCs, for true and false', function () {
  var SayMyName = (0, _compose2.default)((0, _withState2.default)('isBad', 'updateIsBad', false), (0, _branch2.default)(function (props) {
    return props.isBad;
  }, (0, _withProps2.default)({ name: 'Heisenberg' }), (0, _withProps2.default)({ name: 'Walter' })))(function (_ref) {
    var isBad = _ref.isBad,
        name = _ref.name,
        updateIsBad = _ref.updateIsBad;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'isBad' },
        isBad ? 'true' : 'false'
      ),
      _react2.default.createElement(
        'div',
        { className: 'name' },
        name
      ),
      _react2.default.createElement(
        'button',
        { onClick: function onClick() {
            return updateIsBad(function (b) {
              return !b;
            });
          } },
        'Toggle'
      )
    );
  });

  expect(SayMyName.displayName).toBe('withState(branch(Component))');

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(SayMyName, null));
  var getIsBad = function getIsBad() {
    return wrapper.find('.isBad').text();
  };
  var getName = function getName() {
    return wrapper.find('.name').text();
  };
  var toggle = wrapper.find('button');

  expect(getIsBad()).toBe('false');
  expect(getName()).toBe('Walter');

  toggle.simulate('click');

  expect(getIsBad()).toBe('true');
  expect(getName()).toBe('Heisenberg');
});

test('branch defaults third argument to identity function', function () {
  var Left = function Left() {
    return _react2.default.createElement(
      'div',
      { className: 'left' },
      'Left'
    );
  };
  var Right = function Right() {
    return _react2.default.createElement(
      'div',
      { className: 'right' },
      'Right'
    );
  };

  var BranchedComponent = (0, _branch2.default)(function () {
    return false;
  }, function () {
    return function (props) {
      return _react2.default.createElement(Left, props);
    };
  })(Right);

  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(BranchedComponent, null));
  var right = wrapper.find('.right').text();

  expect(right).toBe('Right');
});

test('branch third argument should not cause console error', function () {
  var error = _sinon2.default.stub(console, 'error');
  var Component = function Component() {
    return _react2.default.createElement(
      'div',
      { className: 'right' },
      'Component'
    );
  };

  var BranchedComponent = (0, _branch2.default)(function () {
    return false;
  }, function (v) {
    return v;
  }, function (v) {
    return v;
  })(Component);

  (0, _enzyme.mount)(_react2.default.createElement(BranchedComponent, null));

  expect(error.called).toBe(false);

  /* eslint-disable */
  error.restore();
  /* eslint-enable */
});

//# sourceMappingURL=branch-test.js.map