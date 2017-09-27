const _ = require('../')

test('createEventHandler creates an event handler and a corresponding stream', () => {
  const result = []

  let _createEventHandler = (0, _.createEventHandler)(),
    stream = _createEventHandler.stream,
    handler = _createEventHandler.handler

  const subscription = stream.subscribe({
    next: function next(v) {
      return result.push(v)
    },
  })

  handler(1)
  handler(2)
  handler(3)

  subscription.unsubscribe()
  expect(result).toEqual([1, 2, 3])
})

test('handles multiple subscribers', () => {
  const result1 = []
  const result2 = []

  let _createEventHandler2 = (0, _.createEventHandler)(),
    handler = _createEventHandler2.handler,
    stream = _createEventHandler2.stream

  const subscription1 = stream.subscribe({
    next: function next(v) {
      return result1.push(v)
    },
  })
  const subscription2 = stream.subscribe({
    next: function next(v) {
      return result2.push(v)
    },
  })

  handler(1)
  handler(2)
  handler(3)

  subscription1.unsubscribe()
  subscription2.unsubscribe()

  expect(result1).toEqual([1, 2, 3])
  expect(result2).toEqual([1, 2, 3])
})

// # sourceMappingURL=createEventHandler-test.js.map
