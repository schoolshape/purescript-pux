'use strict';

// module Pux.Html.Events

exports.handler = function (key, action) {
  return [key, function (input, parentAction) {
    return function (ev) {
      if ((key === 'onSubmit')
      || (key === 'onClick' && ev.currentTarget.nodeName.toLowerCase() === 'a')) {
        ev.preventDefault();
      }
      input(parentAction(action(ev)))();
    };
  }];
};

exports.onKeyHandler = function (keyName, action) {
  return ["onKeyUp", function (input, parentAction) {
    return function (ev) {
      if (ev.key.toLowerCase() === keyName.toLowerCase()) {
        input(parentAction(action(ev)))();
      }
    };
  }];
};

exports.touchHandler = function(key, action) {
  return [key, function(input, parentAction) {
    return function (ev) {
      function mkArray(tl) {
          var acc = [];
          for (var i = 0; i < tl.length; i++) {
              acc.push(tl.item(i));
          }
          return acc;
      }
      var puxEv = {
          target: ev.target,
          currentTarget: ev.currentTarget,
          altKey: ev.altKey,
          ctrlKey: ev.ctrlKey,
          metaKey: ev.metaKey,
          shiftKey: ev.shiftKey,
          touches: mkArray(ev.touches),
          changedTouches: mkArray(ev.changedTouches),
          targetTouches: mkArray(ev.targetTouches),
          preventDefault: function() {ev.preventDefault();}
      }
      input(parentAction(action(puxEv)))();
    };
  }];
};
