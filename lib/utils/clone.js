'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clone;
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