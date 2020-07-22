'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('[name]');
  var formButtons = form.querySelectorAll('.ad-form__element--submit button');
  var filter = document.querySelector('.map__filters');
  var filterControls = filter.querySelectorAll('[name]');

  var onMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      unlockPage();
    }
  };

  var onMainPinEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      unlockPage();
    }
  };

  var lockPage = function () {
    window.form.setAddress();
    window.form.setFormCapacity();
    map.classList.add('map--faded');
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins.length) {
      pins.forEach(function (pin) {
        pin.remove();
      });
    }
    form.classList.add('ad-form--disabled');
    formControls.forEach(function (control) {
      control.disabled = true;
    });
    filterControls.forEach(function (control) {
      control.disabled = true;
    });
    formButtons.forEach(function (button) {
      button.disabled = true;
    });
    mainPin.addEventListener('mousedown', onMainPinMousedown);
    mainPin.addEventListener('keydown', onMainPinEnterPress);
  };

  var unlockPage = function () {
    window.form.changeAddress();
    map.classList.remove('map--faded');
    window.pin.renderPins();
    form.classList.remove('ad-form--disabled');
    formControls.forEach(function (control) {
      control.disabled = false;
    });
    formButtons.forEach(function (button) {
      button.disabled = false;
    });
    filterControls.forEach(function (control) {
      control.disabled = false;
    });
    mainPin.removeEventListener('mousedown', onMainPinMousedown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  lockPage();
})();
