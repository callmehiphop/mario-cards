'use strict';

app.service('Deck', function(Card) {

  return {

    cards: [],


    /**
     * Loops through all cards and creates the
     * specified number of sets
     *
     * @param {array} Card models
     * @return {void}
     */
    makeCards: function(models) {
      this.cards.length = 0;

      angular.forEach(models, function(model) {
        for (var i = 0; i < model.sets; i++) {
          this.cards.push(new Card(model.name));
          this.cards.push(new Card(model.name));
        }
      }, this);

      this.shuffle();
    },


    /**
     * Randomizes the order of all cards in
     * the deck
     *
     * @param {array} Deck of cards
     * @return {void}
     */
    shuffle: function() {
      var shuffled = []
        , deck = this.cards.slice(0)
        , i = deck.length
        , index;

      for (; i > 0; i--) {
        index = Math.floor(Math.random() * i);
        shuffled.push(deck.splice(index, 1)[0]);
      }

      this.cards = shuffled;
    },


    /**
     * Flips all cards to default state
     *
     * @return {void}
     */
    flipAll: function() {
      angular.forEach(this.cards, function(card) {
        card.flipped = false;
      });
    }

  };

});