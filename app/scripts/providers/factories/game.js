'use strict';

app.factory('Game', function(Card, $timeout) {

  /**
   * Game constructor
   * Creates a new deck of cards based off
   * cards json
   *
   * @param {array} list of card models
   * @return {void}
   */
  var Game = function(cards) {
    this.cards = shuffle(makeDeck(cards));
    this.unmatchedPairs = this.cards.length / 2;
    this.attempts = 0;
  };


  /**
   * Flips the clicked on card, checks if we made
   * a match, if not resets those two cards if
   * yes, keep them flipped and prep for next set
   *
   * @param {object} Card instance
   * @return {void}
   */
  Game.prototype.flipCard = function(card) {
    if (card.flipped || this.secondPick) {
      return;
    }

    card.flip();

    if (!this.firstPick) {
      this.firstPick = card;
      this.attempts++;
      return;
    }

    if (card.name === this.firstPick.name) {
      this.unmatchedPairs--;
      this.firstPick = null;
      return;
    }

    this.secondPick = card;

    $timeout(function() {
      this.secondPick.flip();
      this.firstPick.flip();
      this.firstPick = this.secondPick = null;
    }.bind(this), 1000);
  };


  /**
   * Loops through all cards and creates the
   * specified number of sets
   *
   * @param {array} Card models
   * @return {array} Deck of all cards
   */
  function makeDeck(cards) {
    var deck = [];

    cards.forEach(function(card) {
      for (var i = 0; i < card.sets; i++) {
        deck.push(new Card(card.name));
        deck.push(new Card(card.name));
      }
    });

    return deck;
  }


  /**
   * Randomizes the order of all cards in
   * the deck
   *
   * @param {array} Deck of cards
   * @return {array} Shuffled Deck
   */
  function shuffle(deck) {
    var shuffled = []
      , i = deck.length
      , index;

    for (; i > 0; i--) {
      index = Math.floor(Math.random() * i);
      shuffled.push(deck.splice(index, 1)[0]);
    }

    return shuffled;
  }


  return Game;

});