'use strict';

(function () {
  var PIN_COUNT = 5;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var map = document.querySelector('.map');

  var createPin = function (pin) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = template.cloneNode(true);
    var left = pin.location.x - PIN_WIDTH / 2;
    var top = pin.location.y - PIN_HEIGHT;
    pinElement.setAttribute('style', 'left: ' + left + 'px; top: ' + top + 'px;');
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.addEventListener('click', function () {
      window.card.openCard(pin);
    });
    return pinElement;
  };

  var renderPins = function (pins) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var count = pins.length > PIN_COUNT ? PIN_COUNT : pins.length;
    pins.slice(0, count).forEach(function (pin) {
      fragment.appendChild(createPin(pin));
    });
    mapPins.appendChild(fragment);
  };

  var deletePins = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins.length) {
      pins.forEach(function (pin) {
        pin.remove();
      });
    }
  };

  window.pin = {
    renderPins: renderPins,
    deletePins: deletePins
  };
})();
