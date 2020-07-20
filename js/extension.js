'use strict';

(function () {

  var roomEnding = function (rooms) {
    var lastDigit = rooms;
    if (rooms > 20) {
      lastDigit = rooms % 10;
    }
    var ending = {
      0: '',
      1: 'а',
      2: 'ы',
      3: 'ы',
      4: 'ы',
      5: '',
      6: '',
      7: '',
      8: '',
      9: '',
    };
    var result = (rooms >= 5 && rooms <= 20) ? '' : ending[lastDigit];
    return result;
  };

  var guestEnding = function (guests) {
    var lastDigit = guests;
    if (guests >= 10) {
      lastDigit = guests % 10;
    }
    var result = (lastDigit === 1) ? 'я' : 'ей';
    return result;
  };

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItem = function (items) {
    return items[Math.floor(Math.random() * items.length)];
  };

  var getRandomItems = function (items) {
    var randomElements = items.slice();
    for (var i = randomElements.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * randomElements.length);
      var swap = randomElements[j];
      randomElements[j] = randomElements[i];
      randomElements[i] = swap;
    }
    randomElements = randomElements.slice(0, getRandomInteger(1, randomElements.length));
    return randomElements;
  };

  window.extension = {
    roomEnding: roomEnding,
    guestEnding: guestEnding,
    getRandomInteger: getRandomInteger,
    getRandomItem: getRandomItem,
    getRandomItems: getRandomItems
  };

})();
