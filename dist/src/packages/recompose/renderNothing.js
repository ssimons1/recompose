'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @name renderNothing
 * @description A higher-order component that always renders null.
 * @example
 * This is useful in combination with another helper that expects a higher-order component, like [branch()](http://www.bitsrc.io/recompose/recompose/higher-order-components/branch):
 * // `hasNoData()` is a function that returns true if the component has no data
 * const hideIfNoData = hasNoData =>
 *   branch(
 *     hasNoData,
 *     renderNothing
 *   )
 * 
 * // Now use the `hideIfNoData()` helper to hide any base component
 * const enhance = hideIfNoData(
 *   props => !(props.title && props.author && props.content)
 * )
 * const Post = enhance(({ title, author, content }) =>
 *   <article>
 *     <h1>{title}</h1>
 *     <h2>By {author.name}</h2>
 *     <div>{content}</div>
 *   </article>
 * )
 */

var Nothing = function (_Component) {
  _inherits(Nothing, _Component);

  function Nothing() {
    _classCallCheck(this, Nothing);

    return _possibleConstructorReturn(this, (Nothing.__proto__ || Object.getPrototypeOf(Nothing)).apply(this, arguments));
  }

  _createClass(Nothing, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Nothing;
}(_react.Component);

var renderNothing = function renderNothing(_) {
  return Nothing;
};

exports.default = renderNothing;

//# sourceMappingURL=renderNothing.js.map