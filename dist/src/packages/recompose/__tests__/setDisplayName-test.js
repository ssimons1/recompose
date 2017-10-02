const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _setDisplayName = require('../setDisplayName')

const _setDisplayName2 = _interopRequireDefault(_setDisplayName)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('setDisplayName sets a static property on the base component', () => {
  const BaseComponent = function BaseComponent() {
    return _react2.default.createElement('div', null)
  }
  const NewComponent = (0, _setDisplayName2.default)('Foo')(BaseComponent)
  expect(NewComponent.displayName).toBe('Foo')
})

// # sourceMappingURL=setDisplayName-test.js.map
