'use strict';

var _redux = require('redux');

var _diff = require('virtual-dom/diff');

var _diff2 = _interopRequireDefault(_diff);

var _patch = require('virtual-dom/patch');

var _patch2 = _interopRequireDefault(_patch);

var _createElement = require('virtual-dom/create-element');

var _createElement2 = _interopRequireDefault(_createElement);

var _domDelegator = require('dom-delegator');

var _domDelegator2 = _interopRequireDefault(_domDelegator);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.start = function (_ref) {
  var init = _ref.init;
  var update = _ref.update;
  var view = _ref.view;

  var delegator = (0, _domDelegator2.default)();

  var initialState = new _Map2.default(init());
  var store = (0, _redux.createStore)(function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    return update(state, action);
  });

  var dispatch = function dispatch(action) {
    return function () {
      store.dispatch(action);
    };
  };

  var tree = view(initialState, dispatch);
  var rootNode = (0, _createElement2.default)(tree);

  store.subscribe(function () {
    var newTree = view(store.getState(), dispatch);
    var patches = (0, _diff2.default)(tree, newTree);

    (0, _patch2.default)(rootNode, patches);

    tree = newTree;
  });

  return rootNode;
};