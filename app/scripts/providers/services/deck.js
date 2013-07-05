'use strict';

app.service('Deck', function(Card, cards) {

  var deck = [];


  angular.forEach(cards, function(card) {
    for (var i = 0; i < card.sets * 2; i++) {
      deck.push(new Card(card.name));
    }
  });


  /**
   * Randomizes the order of all cards in
   * the deck
   *
   * @param {array} Deck of cards
   * @return {void}
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


  /**
   * Flips all cards to default state
   *
   * @return {void}
   */
  function flipAll(deck) {
    angular.forEach(deck, function(card) {
      card.flipped = false;
    });
  }


  return {
    cards: shuffle(deck),
    shuffle: shuffle,
    flipAll: flipAll
  };

});