'use strict';

app.controller('MainCtrl', function($scope, $timeout, cards, Deck, Storage, Sounds) {

  var flipTime = 800
    , firstPick, secondPick;

  Deck.makeCards(cards);

  $scope.game = {
    cards: Deck.cards,
    unmatchedPairs: Deck.cards.length / 2,
    highScore: Storage.get('highScore') || 0,
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
    var track = 'match';

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

      if (!$scope.game.unmatchedPairs) {
        checkHighScore();
        track = 'win';
      }

      $timeout(function() {
        Sounds.play(track);
      }, flipTime);

      return;
    }

    secondPick = card;

    $timeout(function() {
      Sounds.play('noMatch');
      secondPick.flip();
      firstPick.flip();
      firstPick = secondPick = null;
    }, flipTime);
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
    }, flipTime);
  };


  /**
   * Checks to see if the number of attempts is less
   * than the users current high score, if it is then
   * we store it and update the UI
   *
   * @return {void}
   */
  function checkHighScore() {
    var current = $scope.game.highScore;

    if (!current || $scope.game.attempts < current) {
      Storage.set('highScore', $scope.game.attempts);
      $scope.game.highScore = $scope.game.attempts;
    }
  }

});
