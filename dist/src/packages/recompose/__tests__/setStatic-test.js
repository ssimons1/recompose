const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _propTypes = require('prop-types')

const _propTypes2 = _interopRequireDefault(_propTypes)

const _setStatic = require('../setStatic')

const _setStatic2 = _interopRequireDefault(_setStatic)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('setStatic sets a static property on the base component', () => {
  const BaseComponent = function BaseComponent() {
    return _react2.default.createElement('div', null)
  }
  const NewComponent = (0, _setStatic2.default)('propTypes', {
    foo: _propTypes2.default.object,
  })(BaseComponent)

  expect(NewComponent.propTypes).toEqual({
    foo: _propTypes2.default.object,
  })
})

// # sourceMappingURL=setStatic-test.js.map
