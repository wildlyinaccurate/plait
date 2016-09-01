'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoot = undefined;
exports.patchDomNode = patchDomNode;
exports.createRenderCycle = createRenderCycle;

var _createElement = require('virtual-dom/create-element');

var _createElement2 = _interopRequireDefault(_createElement);

var _diff = require('virtual-dom/diff');

var _diff2 = _interopRequireDefault(_diff);

var _patch = require('virtual-dom/patch');

var _patch2 = _interopRequireDefault(_patch);

var _domToVdom = require('./dom-to-vdom');

var _domToVdom2 = _interopRequireDefault(_domToVdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRoot = exports.createRoot = function createRoot(tree) {
  return (0, _createElement2.default)(tree);
};

function patchDomNode(oldNode, newNode) {
  var oldVNode = (0, _domToVdom2.default)(oldNode);
  var newVNode = (0, _domToVdom2.default)(newNode);
  var patches = (0, _diff2.default)(oldVNode, newVNode);

  return (0, _patch2.default)(oldVNode, patches);
}

function createRenderCycle(rootNode, tree, render, raf) {
  var renderScheduled = false;
  var latestState = null;

  return function (newState) {
    if (latestState === null && renderScheduled === false) {
      renderScheduled = true;

      raf(function () {
        renderScheduled = false;

        if (latestState === null) return;

        var newTree = render(latestState);
        var patches = (0, _diff2.default)(tree, newTree);

        (0, _patch2.default)(rootNode, patches);

        tree = newTree;
        latestState = null;
      });
    }

    latestState = newState;
  };
}