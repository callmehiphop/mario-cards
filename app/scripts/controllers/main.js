'use strict';

app.controller('MainCtrl', function($scope, $timeout, cards, Deck) {

  var firstPick, secondPick;

  Deck.makeCards(cards);

  $scope.game = {
    cards: Deck.cards,
    unmatchedPairs: Deck.cards.length / 2,
    attempts: 0
  };

  /**
   * Flips the clicked on card, checks if we made
   * a match, if not resets those two cards if
   * yes, keep them flipped and prep for next set
   *
   * @param {object} Card instance
   * @return {void}
   */
  $scope.flipCard = function(card) {
    if (card.flipped || secondPick) {
      return;
    }

    card.flip();

    if (!firstPick) {
      firstPick = card;
      $scope.game.attempts++;
      return;
    }

    if (card.name === firstPick.name) {
      $scope.game.unmatchedPairs--;
      firstPick = null;
      return;
    }

    secondPick = card;

    $timeout(function() {
      secondPick.flip();
      firstPick.flip();
      firstPick = secondPick = null;
    }, 1000);
  };


  /**
   * Flips all cards back to default state
   * resets cord values, then shuffles the deck
   *
   * @return {void}
   */
  $scope.reset = function() {
    Deck.flipAll();
    firstPick = secondPick = null;
    $scope.game.attempts = 0;

    $timeout(function() {
      $scope.game.cards = null;
      Deck.shuffle();
      $scope.game.cards = Deck.cards;
    }, 800);
  };

});