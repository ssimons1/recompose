'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _setObservableConfig = require('../setObservableConfig');

var _setObservableConfig2 = _interopRequireDefault(_setObservableConfig);

var _rxjs4ObservableConfig = require('../rxjs4ObservableConfig');

var _rxjs4ObservableConfig2 = _interopRequireDefault(_rxjs4ObservableConfig);

var _mapPropsStream = require('../mapPropsStream');

var _mapPropsStream2 = _interopRequireDefault(_mapPropsStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _setObservableConfig2.default)(_rxjs4ObservableConfig2.default);

// Most of mapPropsStream's functionality is covered by componentFromStream
test('mapPropsStream creates a higher-order component from a stream', function () {
  var Double = (0, _mapPropsStream2.default)(function (props$) {
    return props$.map(function (_ref) {
      var n = _ref.n;
      return { children: n * 2 };
    });
  })('div');
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Double, { n: 112 }));
  var div = wrapper.find('div');
  expect(div.text()).toBe('224');
  wrapper.setProps({ n: 358 });
  expect(div.text()).toBe('716');
});

//# sourceMappingURL=mapPropsStream-test.js.map