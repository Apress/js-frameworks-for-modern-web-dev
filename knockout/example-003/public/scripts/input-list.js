'use strict';
window.InputList = (function (ko) {

  function defaultTo(object, property, defaultValue) {
    if (!object.hasOwnProperty(property)) {
      return defaultValue;
    }
    return object[property];
  }

  return {
    create: function (params) {
      var viewmodel = {};

      // properties
      viewmodel.items = params.items;
      viewmodel.newItem = ko.observable('');

      viewmodel.isOrdered = defaultTo(params, 'isOrdered', false);
      viewmodel.enableAdd = defaultTo(params, 'enableAdd', true);
      viewmodel.enableUpdate = defaultTo(params, 'enableUpdate', true);
      viewmodel.enableRemove = defaultTo(params, 'enableRemove', true);

      // methods
      viewmodel.commitNewItem = function () {
        var item = viewmodel.newItem();
        if (item === '') return;
        viewmodel.items.push(item);
        viewmodel.newItem('');
      };

      viewmodel.changeItem = function (index, newValue) {
        if (!viewmodel.enableUpdate) return;
        viewmodel.items()[index] = newValue;
      };

      viewmodel.removeItem = function (index) {
        viewmodel.items.splice(index, 1);
      };

      viewmodel.promoteItem = function (index) {
        if (index === 0) return;
        var item = viewmodel.items.splice(index, 1);
        var newIndex = index - 1;
        viewmodel.items.splice(newIndex, 0, item);
      };

      viewmodel.demoteItem = function (index) {
        var lastIndex = (viewmodel.items.length - 1);
        if (index === lastIndex) return;
        var item = viewmodel.items.splice(index, 1);
        var newIndex = index + 1;
        viewmodel.items.splice(newIndex, 0, item);
      };

      return viewmodel;
    }
  };

}(window.ko));