'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.State = exports.forwardDispatch = exports.initializeComponent = exports.render = exports.start = undefined;

var _app = require('./app');

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.start = _app.start;
exports.render = _app.render;
exports.initializeComponent = _app.initializeComponent;
exports.forwardDispatch = _app.forwardDispatch;
exports.State = _state2.default;