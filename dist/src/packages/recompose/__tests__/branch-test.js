const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _ = require('../')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('branch tests props and applies one of two HoCs, for true and false', () => {
  const SayMyName = (0, _.compose)(
    (0, _.withState)('isBad', 'updateIsBad', false),
    (0, _.branch)(
      props => props.isBad,
      (0, _.withProps)({ name: 'Heisenberg' }),
      (0, _.withProps)({ name: 'Walter' })
    )
  )(_ref => {
    let isBad = _ref.isBad,
      name = _ref.name,
      updateIsBad = _ref.updateIsBad
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'isBad' },
        isBad ? 'true' : 'false'
      ),
      _react2.default.createElement('div', { className: 'name' }, name),
      _react2.default.createElement(
        'button',
        {
          onClick: function onClick() {
            return updateIsBad(b => !b)
          },
        },
        'Toggle'
      )
    )
  })

  expect(SayMyName.displayName).toBe('withState(branch(Component))')

  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(SayMyName, null)
  )
  const getIsBad = function getIsBad() {
    return wrapper.find('.isBad').text()
  }
  const getName = function getName() {
    return wrapper.find('.name').text()
  }
  const toggle = wrapper.find('button')

  expect(getIsBad()).toBe('false')
  expect(getName()).toBe('Walter')

  toggle.simulate('click')

  expect(getIsBad()).toBe('true')
  expect(getName()).toBe('Heisenberg')
})

test('branch defaults third argument to identity function', () => {
  const Left = function Left() {
    return _react2.default.createElement('div', { className: 'left' }, 'Left')
  }
  const Right = function Right() {
    return _react2.default.createElement('div', { className: 'right' }, 'Right')
  }

  const BranchedComponent = (0, _.branch)(
    () => false,
    () =>
      function(props) {
        return _react2.default.createElement(Left, props)
      }
  )(Right)

  const wrapper = (0, _enzyme.mount)(
    _react2.default.createElement(BranchedComponent, null)
  )
  const right = wrapper.find('.right').text()

  expect(right).toBe('Right')
})

test('branch third argument should not cause console error', () => {
  const error = _sinon2.default.stub(console, 'error')
  const Component = function Component() {
    return _react2.default.createElement(
      'div',
      { className: 'right' },
      'Component'
    )
  }

  const BranchedComponent = (0, _.branch)(() => false, v => v, v => v)(
    Component
  )
  ;(0, _enzyme.mount)(_react2.default.createElement(BranchedComponent, null))

  expect(error.called).toBe(false)

  /* eslint-disable */
  error.restore()
  /* eslint-enable */
})

// # sourceMappingURL=branch-test.js.map
