/**
 * Stolen from HTML5Rocks
 * http://www.html5rocks.com/en/tutorials/webaudio/intro/
 * http://www.html5rocks.com/en/tutorials/webaudio/intro/js/buffer-loader.js
 */

'use strict';

app.factory('BufferLoader', function() {

  /**
   *
   */
  var BufferLoader = function(context, urls, callback) {
    this.context = context;
    this.urls = urls;
    this.onload = callback || angular.noop;
    this.bufferList = [];
    this.loadCount = 0;
  };


  /**
   *
   */
  BufferLoader.prototype.loadBuffer = function(url, index) {
    var request = new XMLHttpRequest()
      , loader = this;

    request.open('GET', url, true);
    request.responseType = 'arrayBuffer';

    request.onload = function() {
      loader.context.decodeAudioData(
        request.response, // response
        loader.storeBuffer.bind(loader), // success
        loader.error // failure
      );
    };

    request.onerror = function() {
      loader.error('XHR');
    };

    request.send();
  };


  /**
   *
   */
  BufferLoader.prototype.load = function() {
    var length = this.urls.length
      , i = 0;

    for (; i < length; ++i) {
      this.loadBuffer(this.urls[i], i);
    }
  };


  /**
   *
   */
  BufferLoader.prototype.storeBuffer = function(buffer) {
    if (!buffer) {
      this.error('Couldn\'t decode file data for ' + url);
      return;
    }

    this.bufferList[index] = buffer;

    if (++this.loadCount == this.urls.length) {
      this.onload(this.bufferList);
    }
  };


  /**
   *
   */
  BufferLoader.prototype.error = function(message) {
    console.error('BufferLoader error', message);
  };


  return BufferLoader;

});