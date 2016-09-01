'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = domToVdom;

var _vnode = require('virtual-dom/vnode/vnode');

var _vnode2 = _interopRequireDefault(_vnode);

var _vtext = require('virtual-dom/vnode/vtext');

var _vtext2 = _interopRequireDefault(_vtext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function domToVdom(node) {
  return new _vnode2.default(node.name, attributes(node), children(node));
}

function attributes(node) {
  return {
    node: node
  };
}

function children(node) {
  var children = [];

  if (node.hasChildNodes()) {}

  return children;
}