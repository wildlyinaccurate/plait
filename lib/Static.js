'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _App = require('./App');

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentWithState = function componentWithState(component, state) {
  return Object.assign({}, component, {
    init: function init() {
      return state.toObject();
    }
  });
};

var componentToString = function componentToString(component) {
  var node = (0, _App.start)(component, _raf2.default);

  if (node.outerHTML) {
    return node.outerHTML;
  }

  return node.toString();
};

function render(component, update) {
  return new Promise(function (resolve) {
    if (typeof update === 'function') {
      var initialState = new _State2.default(component.init());

      update(initialState, function (newState) {
        var newComponent = componentWithState(component, newState);

        resolve(componentToString(newComponent));
      });
    } else {
      resolve(componentToString(component));
    }
  });
}