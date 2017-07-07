'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = exports.start = exports.render = exports.initializeComponent = exports.h = exports.forwardDispatch = undefined;

var _h = require('virtual-dom/h');

var _h2 = _interopRequireDefault(_h);

var _App = require('./App');

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  forwardDispatch: _App.forwardDispatch,
  h: _h2.default,
  initializeComponent: _App.initializeComponent,
  render: _App.render,
  start: _App.start,
  State: _State2.default
};
exports.forwardDispatch = _App.forwardDispatch;
exports.h = _h2.default;
exports.initializeComponent = _App.initializeComponent;
exports.render = _App.render;
exports.start = _App.start;
exports.State = _State2.default;