'use strict';

app.factory('Card', function() {

  /**
   * Creates a new card instance
   *
   * @param {string} Card name
   * @return {void}
   */
  var Card = function(name) {
    this.name = name;
    this.flipped = false;
  };


  /**
   * Toggles flag signifying which direction
   * the card is laying
   *
   * @return {void}
   */
  Card.prototype.flip = function() {
    this.flipped = !this.flipped;
  };


  return Card;

});