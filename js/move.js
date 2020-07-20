'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 84;
  var PIN_LOCATION_X_MIN = 0;
  var PIN_LOCATION_X_MAX = 1200;
  var PIN_LOCATION_Y_MIN = 130;
  var PIN_LOCATION_Y_MAX = 630;
  var pin = document.querySelector('.map__pin--main');

  pin.addEventListener('mousedown', function (evt) {
    var startCoord = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoord.x - moveEvt.clientX,
        y: startCoord.y - moveEvt.clientY,
      };
      if (pin.offsetLeft - shift.x + Math.round(PIN_WIDTH / 2) < PIN_LOCATION_X_MIN) {
        shift.x = pin.offsetLeft - PIN_LOCATION_X_MIN + Math.round(PIN_WIDTH / 2);
      }
      if (pin.offsetLeft - shift.x + Math.round(PIN_WIDTH / 2) > PIN_LOCATION_X_MAX) {
        shift.x = pin.offsetLeft - PIN_LOCATION_X_MAX + Math.round(PIN_WIDTH / 2);
      }
      if (pin.offsetTop - shift.y + Math.round(PIN_HEIGHT) < PIN_LOCATION_Y_MIN) {
        shift.y = pin.offsetTop - PIN_LOCATION_Y_MIN + Math.round(PIN_HEIGHT);
      }
      if (pin.offsetTop - shift.y + Math.round(PIN_HEIGHT) > PIN_LOCATION_Y_MAX) {
        shift.y = pin.offsetTop - PIN_LOCATION_Y_MAX + Math.round(PIN_HEIGHT);
      }
      startCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };
      pin.style.top = pin.offsetTop - shift.y + 'px';
      pin.style.left = pin.offsetLeft - shift.x + 'px';
      window.form.changeAddress();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
