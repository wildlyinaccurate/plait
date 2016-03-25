'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forwardDispatch = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.start = start;
exports.initializeComponent = initializeComponent;

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _virtualDom = require('./dom/virtual-dom');

var _virtualDom2 = _interopRequireDefault(_virtualDom);

var _delegator = require('./dom/delegator');

var delegator = _interopRequireWildcard(_delegator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

delegator.listen();

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);

function start(component) {
  var raf = arguments.length <= 1 || arguments[1] === undefined ? window.requestAnimationFrame : arguments[1];
  var init = component.init;
  var update = component.update;
  var view = component.view;

  var _handleInit = handleInit(init);

  var _handleInit2 = _slicedToArray(_handleInit, 2);

  var initialState = _handleInit2[0];
  var initialAction = _handleInit2[1];

  // Initial call to update() will be @@redux/INIT so bogus dispatch() is okay

  var dispatch = function dispatch(x) {
    return x;
  };

  var store = createStoreWithMiddleware(function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    var newState = update(state, action, dispatch);

    return typeof newState === 'undefined' ? state : newState;
  });

  dispatch = makeDispatcher(store);

  if (initialAction) {
    store.dispatch(initialAction);
  }

  var render = function render(state) {
    return view(state, dispatch);
  };

  var _vdom = (0, _virtualDom2.default)(initialState, render, raf);

  var rootNode = _vdom.rootNode;
  var updateTree = _vdom.update;


  store.subscribe(function () {
    updateTree(store.getState());
  });

  return rootNode;
}

// Create a dispatcher function for the given store. Dispatchers act as a curried
// interface to store.dispatch, allowing views to express the _intent to dispatch_
// without immediately triggering a dispatch.
function makeDispatcher(store) {
  return function (action) {
    return function (event) {
      if (event) {
        action.$event = event;

        if (action.$fwdAction) {
          action.$fwdAction.$event = event;
        }
      }

      store.dispatch(action);
    };
  };
}

function initializeComponent(_ref, dispatch) {
  var init = _ref.init;

  var _handleInit3 = handleInit(init);

  var _handleInit4 = _slicedToArray(_handleInit3, 2);

  var initialState = _handleInit4[0];
  var initialAction = _handleInit4[1];


  if (dispatch && initialAction) {
    dispatch(initialState)(initialAction)();
  }

  return initialState;
}

function handleInit(init) {
  var _res = init();

  return Array.isArray(_res) ? _res : [_res];
}

// Wrap a dispatcher, forwarding any actions onto the specified action by attaching
// them to the $fwdAction property.
//
// Usually used by parent components to capture actions from child components.
var forwardDispatch = exports.forwardDispatch = (0, _curry2.default)(function (action, dispatch, state) {
  return function (forwardAction) {
    if (typeof forwardAction === 'function') {
      // In order to forward thunks, an intermediate thunk needs to be returned
      // to gain access to the raw `action => <dispatch>` dispatcher rather than
      // the application's wrapped `action => event => <dispatch>` dispatcher.
      return dispatch(function (rawDispatch) {
        var getState = function getState() {
          return state;
        };
        var fwd = forwardDispatch(action, rawDispatch, state);

        forwardAction(fwd, getState);
      });
    }

    // Annotate and dispatch a simple action object
    return dispatch(Object.assign({}, action, { $fwdAction: forwardAction }));
  };
});