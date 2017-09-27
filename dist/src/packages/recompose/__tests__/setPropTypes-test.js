const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _propTypes = require('prop-types')

const _propTypes2 = _interopRequireDefault(_propTypes)

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('setPropTypes sets a static property on the base component', () => {
  const BaseComponent = function BaseComponent() {
    return _react2.default.createElement('div', null)
  }
  const NewComponent = (0, _.setPropTypes)({ foo: _propTypes2.default.object })(
    BaseComponent
  )

  expect(NewComponent.propTypes).toEqual({
    foo: _propTypes2.default.object,
  })
})

// # sourceMappingURL=setPropTypes-test.js.map
