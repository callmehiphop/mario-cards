'use strict';

app.controller('MainCtrl', function($scope, cards, Game) {
  $scope.game = new Game(cards);
});