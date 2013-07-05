'use strict';

app.service('Storage', function(STORAGE_KEY) {

  var data = JSON.parse((localStorage.getItem(STORAGE_KEY) || '{}'));


  /**
   * Saves current session data into localStorage
   *
   * @return {void}
   */
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }


  return {

    /**
     * Retrieves current users stored data
     * specified by a key
     *
     * @param {string} data key
     * @return {mixed}
     */
    get: function(key) {
      return data[key];
    },


    /**
     * Adds an additional item to the users
     * stored data, then saves to localStorage
     *
     * @param {string} data key
     * @param {mixed} data
     * @return {void}
     */
    set: function(key, value) {
      data[key] = value;
      save();
    },


    /**
     * Deletes a piece of data from the users
     * stored information specified by a key, then
     * updates localStorage
     *
     * @param {string}
     * @return {void}
     */
    remove: function(key) {
      delete data[key];
      save();
    }

  };

});