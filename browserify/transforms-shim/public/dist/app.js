(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/tim/repos/pro-javascript-frameworks/code/browserify/transforms-shim/app/index.js":[function(require,module,exports){
'use strict';

var Foo = require('./vendor/foo');
console.log('Foo', Foo);
new Foo();

},{"./vendor/foo":"/Users/tim/repos/pro-javascript-frameworks/code/browserify/transforms-shim/app/vendor/foo.js"}],"/Users/tim/repos/pro-javascript-frameworks/code/browserify/transforms-shim/app/vendor/foo.js":[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
'use strict';

function Foo() {
    console.log('Bar');
}

; browserify_shim__define__module__export__(typeof Foo != "undefined" ? Foo : window.Foo);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},["/Users/tim/repos/pro-javascript-frameworks/code/browserify/transforms-shim/app/index.js"]);
