'use strict';

(function () {

  var createPin = function (pin) {
    var PIN_HEIGHT = 70;
    var PIN_WIDTH = 50;
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

  var onLoad = function (data) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    data.forEach(function (pin) {
      if (pin.hasOwnProperty('offer')) {
        fragment.appendChild(createPin(pin));
      }
    });
    mapPins.appendChild(fragment);
  };

  var onError = function (errorText) {
    var node = window.util.createElement('div', null, errorText);
    node.style = 'position: absolute; top: 0; right: 0; left: 0; z-index: 50; padding: 5px; font-size: 14px; line-height: 14px; text-align: center; background-color: #ff7647; color: #ffffff';
    document.querySelector('.map').prepend(node);
  };

  var renderPins = function () {
    window.data.load(onLoad, onError);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
