'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.State = exports.forwardDispatch = exports.initializeComponent = exports.render = exports.start = undefined;

var _App = require('./App');

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.start = _App.start;
exports.render = _App.render;
exports.initializeComponent = _App.initializeComponent;
exports.forwardDispatch = _App.forwardDispatch;
exports.State = _State2.default;