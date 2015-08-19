/// <reference path="./types.d.ts" />

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require("react-motion");

var reorderKeys = _reactMotion.utils.reorderKeys;

var update = _react2["default"].addons;

var Demo = _react2["default"].createClass({
  displayName: "Demo",

  getInitialState: function getInitialState() {
    return {
      // Apparently Object.keys return keys in insertion order (except for 1,2,3).
      letters: {
        "#A": true,
        "#N": true,
        "#T": true
      }
    };
  },

  componentDidMount: function componentDidMount() {
    window.addEventListener("keyup", this.handleKeyup);
  },

  handleKeyup: function handleKeyup(e) {
    var keyCode = e.keyCode;

    if (!isAlphaNumeric(keyCode)) {
      return;
    }

    var letter = "#" + String.fromCharCode(e.keyCode);
    var letters = this.state.letters;

    var hasLetter = letters[letter];

    console.log(letter);

    var newLetters = _extends({}, letters);

    if (hasLetter) {
      delete newLetters[letter];
    } else {
      newLetters[letter] = true;
    }

    newLetters = reorderKeys(newLetters, function (keys) {
      return keys.sort();
    });

    this.setState({ letters: newLetters });
  },

  toggle: function toggle(letter) {
    var selected = this.state.letters[letter];

    this.setState({
      letters: _extends({}, this.state.letters, _defineProperty({}, letter, !selected))
    });
  },

  // TransitionSpring Methods

  getEndValue: function getEndValue() {
    var values = {};

    Object.keys(this.state.letters).forEach(function (key) {
      values[key] = {
        width: { val: 50 },
        scale: { val: 1 },
        margin: { val: 5 }
      };
    });

    console.log(values);

    return values;
  },

  willEnter: function willEnter(key) {
    return {
      width: { val: 0 },
      margin: { val: 0 },
      scale: { val: 0 }
    };
  },

  willLeave: function willLeave(key) {
    return {
      width: { val: 0 },
      margin: { val: 0 },
      scale: { val: 0 }
    };
  },

  render: function render() {
    var _this = this;

    var letters = this.state.letters;

    return _react2["default"].createElement(
      _reactMotion.TransitionSpring,
      {
        endValue: this.getEndValue(),
        willEnter: this.willEnter,
        willLeave: this.willLeave },
      function (values) {
        return _react2["default"].createElement(
          "div",
          { className: "container" },
          Object.keys(values).map(function (letter) {
            var _values$letter = values[letter];
            var scale = _values$letter.scale;
            var width = _values$letter.width;
            var margin = _values$letter.margin;

            var widthValue = Math.ceil(width.val - 0.5);
            var marginValue = Math.ceil(margin.val - 0.5);

            var styles = {
              transform: "scale(" + scale.val + ")",
              height: widthValue,
              width: widthValue,
              margin: marginValue,
              borderRadius: widthValue
            };

            return _react2["default"].createElement(
              "span",
              {
                key: letter,
                className: "letter",
                style: styles,
                onClick: _this.toggle.bind(_this, letter) },
              letter.substring(1)
            );
          })
        );
      }
    );
  }
});

function isAlphaNumeric(keyCode) {
  return 48 <= keyCode && keyCode <= 57 || 65 <= keyCode && keyCode <= 90;
}

_react2["default"].render(_react2["default"].createElement(Demo, null), document.querySelector('#content'));
