'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clone;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function clone(obj) {
  var newObj = [];

  for (var i in obj) {
    var val = obj[i];

    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      if (val.hasOwnProperty('@@Plait/State')) {
        newObj[i] = val.clone();
      } else {
        newObj[i] = clone(val);
      }
    } else {
      newObj[i] = val;
    }
  }

  return newObj;
}