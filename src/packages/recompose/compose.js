/**
 * @name compose
 * @description Use to compose multiple higher-order components into a single higher-order component. This works exactly like the function of the same name in Redux, or lodash's [flowRight()](https://bitsrc.io/lodash/lodash/component/flow-right).
 * @param {array} funcs 
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
