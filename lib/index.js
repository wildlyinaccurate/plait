'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = exports.start = exports.render = exports.initializeComponent = exports.forwardDispatch = exports.h = undefined;

var _h2 = require('virtual-dom/h');

var _h3 = _interopRequireDefault(_h2);

var _App = require('./App');

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function h(tag, attrs) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return (0, _h3.default)(tag, attrs, children);
}

exports.default = {
  h: h,
  forwardDispatch: _App.forwardDispatch,
  initializeComponent: _App.initializeComponent,
  render: _App.render,
  start: _App.start,
  State: _State2.default
};
exports.h = h;
exports.forwardDispatch = _App.forwardDispatch;
exports.initializeComponent = _App.initializeComponent;
exports.render = _App.render;
exports.start = _App.start;
exports.State = _State2.default;