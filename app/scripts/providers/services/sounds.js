'use strict';

app.service('Sounds', function(soundList) {
  var player = window.Audio ? new Audio() : {};


  player.autoplay = true;


  return {

    /**
     * Checks to see if track exists, if so
     * then we update the source and let autoPlay
     * handle the rest
     *
     * @param {string}
     * @return {void}
     */
    play: function(track) {
      if (!soundList[track]) {
        return;
      }

      player.src = soundList[track];
    }

  };

});