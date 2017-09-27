const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _enzyme = require('enzyme')

const _sinon = require('sinon')

const _sinon2 = _interopRequireDefault(_sinon)

const _ = require('../')

const _utils = require('./utils')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

test('shouldUpdate implements shouldComponentUpdate', () => {
  const component = _sinon2.default.spy(() => null)
  component.displayName = 'component'

  const initialTodos = ['eat', 'drink', 'sleep']
  const Todos = (0, _.compose)(
    (0, _.withState)('todos', 'updateTodos', initialTodos),
    (0, _.shouldUpdate)((props, nextProps) => props.todos !== nextProps.todos),
    _utils.countRenders
  )(component)

  expect(Todos.displayName).toBe(
    'withState(shouldUpdate(countRenders(component)))'
  )
  ;(0, _enzyme.mount)(_react2.default.createElement(Todos, null))
  const updateTodos = component.firstCall.args[0].updateTodos

  expect(component.lastCall.args[0].todos).toBe(initialTodos)
  expect(component.lastCall.args[0].renderCount).toBe(1)

  // Does not re-render
  updateTodos(initialTodos)
  expect(component.calledOnce).toBe(true)

  updateTodos(todos => todos.slice(0, -1))
  expect(component.calledTwice).toBe(true)
  expect(component.lastCall.args[0].todos).toEqual(['eat', 'drink'])
  expect(component.lastCall.args[0].renderCount).toBe(2)
})

// # sourceMappingURL=shouldUpdate-test.js.map
