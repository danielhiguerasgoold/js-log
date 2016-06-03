/**
* JS Log
* Author: Daniel Higueras Goold
* License: MIT
*/
(function() {
  'use strict';

  var logContainer;
  var logBuffer = '';

  ready(init);

  var originalLog = console.log;
  var originalDebug = console.debug;
  var originalWarn = console.warn;
  var originalError = console.error;

  console.log = function(msg) {
    logAndScroll(msg, 'l');
    originalLog.apply(this, arguments);
  }

  console.debug = function(msg) {
    logAndScroll(msg, 'd');
    originalDebug.apply(this, arguments);
  }

  console.warn = function(msg) {
    logAndScroll(msg, 'w');
    originalWarn.apply(this, arguments);
  }

  console.error = function(msg) {
    logAndScroll(msg, 'e');
    originalError.apply(this, arguments);
  }

  var logAndScroll = function(msg, type) {
    var output = '<span contenteditable="false" class="crt"><br />&gt;&nbsp;</span><span class="'+type+'">'+msg+'</span>';

    if(typeof logContainer !== 'undefined') {
      logContainer.insertAdjacentHTML('beforeend', output);
      logContainer.scrollTop = logContainer.scrollHeight;
    } else {
      logBuffer += output;
    }
  }

  function init() {
    logContainer = document.getElementById('log');

    logContainer.setAttribute('contenteditable', true);
    logContainer.setAttribute('spellcheck', false);

    logContainer.insertAdjacentHTML('beforeend', logBuffer);
  }

  function ready(fn) { document.readyState != 'loading'? fn() : document.addEventListener('DOMContentLoaded', fn) };
})();
