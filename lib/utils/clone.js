'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clone;
function clone(obj) {
  var newObj = Array.isArray(obj) ? [] : {};

  Object.keys(obj).map(function (k) {
    var val = obj[k];

    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      if (val.hasOwnProperty('@@Plait/State')) {
        newObj[k] = val.clone();
      } else {
        newObj[k] = clone(val);
      }
    } else {
      newObj[k] = val;
    }
  });

  return newObj;
}