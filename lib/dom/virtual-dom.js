'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VirtualDom;

var _createElement = require('virtual-dom/create-element');

var _createElement2 = _interopRequireDefault(_createElement);

var _diff = require('virtual-dom/diff');

var _diff2 = _interopRequireDefault(_diff);

var _patch = require('virtual-dom/patch');

var _patch2 = _interopRequireDefault(_patch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function VirtualDom(state, render, raf) {
  var renderScheduled = false;
  var latestState = null;
  var tree = render(state);
  var rootNode = (0, _createElement2.default)(tree);

  var update = function update(newState) {
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

  return { rootNode: rootNode, update: update };
}
module.exports = exports['default'];