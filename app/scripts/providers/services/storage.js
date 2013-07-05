'use strict';

app.service('Storage', function(STORAGE_KEY) {

  var data = JSON.parse((localStorage.getItem(KEY) || '{}'));

  function save() {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  return {

    get: function(key) {
      return data[key];
    },

    set: function(key, value) {
      data[key] = value;
      save();
    },

    remove: function(key) {
      delete data[key];
      save();
    }

  };

});