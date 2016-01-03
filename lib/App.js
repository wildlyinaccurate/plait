'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;
exports.initializeComponent = initializeComponent;
exports.forwardDispatch = forwardDispatch;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

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

var delegator = (0, _domDelegator2.default)();
var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);

// Component = {
//   init : _ -> Object
//   update : Map -> Action -> Map
//   view : Map -> (Action -> Action) -> VirtualNode
// }

// start :: Component -> Element
function start(component) {
  var init = component.init;
  var update = component.update;
  var view = component.view;

  var _handleInit = handleInit(init);

  var _handleInit2 = _slicedToArray(_handleInit, 2);

  var initialState = _handleInit2[0];
  var initialAction = _handleInit2[1];

  var store = createStoreWithMiddleware(function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    var newState = update(state, action);

    return typeof newState === 'undefined' ? state : newState;
  });

  var dispatch = function dispatch(action) {
    return function (event) {
      if (event) {
        action.event = event;
      }

      store.dispatch(action);
    };
  };

  if (initialAction) {
    store.dispatch(initialAction);
  }

  var tree = view(initialState, dispatch);
  var rootNode = (0, _createElement2.default)(tree);

  store.subscribe(function () {
    tree = patchTree(rootNode, tree, view(store.getState(), dispatch));
  });

  return rootNode;
}

// patchTree :: Element -> VirtualNode -> VirtualNode -> VirtualNode
function patchTree(rootNode, oldTree, newTree) {
  (0, _patch2.default)(rootNode, (0, _diff2.default)(oldTree, newTree));

  return newTree;
}

// initializeComponent :: Component -> Map
function initializeComponent(_ref) {
  var init = _ref.init;

  return handleInit(init)[0];
}

// handleInit :: (_ -> Object) -> [Map, Maybe Action]
function handleInit(init) {
  var _res = init();
  var res = Array.isArray(_res) ? _res : [_res];

  return [new _Map2.default(res[0]), res[1]];
}

// forwardDispatch :: Action a => (a -> (_ -> IO ())) -> a -> (a -> a -> a) -> ...
function forwardDispatch(dispatch, state, action, modifier) {
  var getState = function getState() {
    return state;
  };

  return function (forwardAction) {
    if (typeof forwardAction === 'function') {
      return dispatch(function () {
        forwardAction(forwardDispatch(dispatch, state, action, modifier), getState).then(function (dispatch) {
          return dispatch(modifier(action, forwardAction));
        });
      });
    } else {
      return dispatch(modifier(action, forwardAction));
    }
  };
}