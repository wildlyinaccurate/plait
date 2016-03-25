'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _App = require('./App');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentWithState = function componentWithState(component, state) {
  return Object.assign({}, component, {
    init: function init() {
      return state;
    }
  });
};

var componentToString = function componentToString(component) {
  var node = (0, _App.start)(component, _raf2.default);

  if (node.outerHTML) {
    return node.outerHTML;
  } else {
    return node.toString();
  }
};

function render(component, update) {
  if (typeof update === 'function') {
    return new Promise(function (resolve) {
      var initialState = component.init();

      update(initialState, function (newState) {
        var newComponent = componentWithState(component, newState);

        resolve(componentToString(newComponent));
      });
    });
  } else {
    return componentToString(component);
  }
}