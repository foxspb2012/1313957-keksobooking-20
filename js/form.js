'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;
  var ROUND_MAIN_PIN_HEIGHT = 65;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formAddress = form.querySelector('#address');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');
  var formTimein = form.querySelector('#timein');
  var formTimeout = form.querySelector('#timeout');
  var formRoom = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');

  var priceRealty = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var capacityValidValues = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var setAddress = function () {
    var locationX = mainPin.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
    var locationY = mainPin.offsetTop + Math.round(ROUND_MAIN_PIN_HEIGHT / 2);
    formAddress.value = locationX + ', ' + locationY;
  };

  var changeAddress = function () {
    var locationX = mainPin.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
    var locationY = mainPin.offsetTop + Math.round(MAIN_PIN_HEIGHT);
    formAddress.value = locationX + ', ' + locationY;
  };

  var setFormPrice = function () {
    var type = formType.value;
    formPrice.value = '';
    formPrice.min = priceRealty[type];
    formPrice.placeholder = priceRealty[type];
    validFormPrice();
  };

  var validFormPrice = function () {
    if (formPrice.validity.rangeUnderflow) {
      formPrice.setCustomValidity('Минимальная цена за ночь ' + formPrice.min);
    } else {
      formPrice.setCustomValidity('');
    }
  };

  var setFormTimeout = function () {
    formTimeout.value = formTimein.value;
  };

  var setFormTimein = function () {
    formTimein.value = formTimeout.value;
  };

  var setFormCapacity = function () {
    var rooms = formRoom.value;
    var options = formCapacity.querySelectorAll('option');
    options.forEach(function (option) {
      if (capacityValidValues[rooms].indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    });
    if (options[formCapacity.selectedIndex].disabled) {
      formCapacity.querySelector('option:not([disabled])').selected = true;
    }
  };

  formPrice.addEventListener('input', function () {
    validFormPrice();
  });

  formTimein.addEventListener('change', function () {
    setFormTimeout();
  });

  formTimeout.addEventListener('change', function () {
    setFormTimein();
  });

  formRoom.addEventListener('change', function () {
    setFormCapacity();
  });

  window.form = {
    setAddress: setAddress,
    changeAddress: changeAddress,
    setFormCapacity: setFormCapacity
  };
})();
