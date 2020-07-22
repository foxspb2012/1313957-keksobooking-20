'use strict';

(function () {
  var PIN_X = 570;
  var PIN_Y = 375;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('[name]');
  var formButtons = form.querySelectorAll('.ad-form__element--submit button');
  var filter = document.querySelector('.map__filters');
  var filterControls = filter.querySelectorAll('[name]');
  var formReset = form.querySelector('.ad-form__reset');

  var onLoadSuccess = function (data) {
    window.pin.renderPins(data);
  };

  var onLoadError = function (errorText) {
    var node = window.extension.createElement('div', null, errorText);
    node.style = 'position: absolute; top: 0; right: 0; left: 0; z-index: 100; padding: 5px; font-size: 16px; line-height: 16px; text-align: center; background-color: #ff6587; color: #ffffff';
    document.querySelector('.map').prepend(node);
    setTimeout(function () {
      node.remove();
    }, 5000);
  };

  var onSaveSuccess = function () {
    window.message.showSuccess();
    lockPage();
  };

  var onSaveError = function () {
    window.message.showError();
  };

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
    window.card.closeCard();
    window.pin.deletePins();
    form.reset();
    form.classList.add('ad-form--disabled');
    formControls.forEach(function (control) {
      control.disabled = true;
    });
    filter.reset();
    filterControls.forEach(function (control) {
      control.disabled = true;
    });
    formButtons.forEach(function (button) {
      button.disabled = true;
    });
    mainPin.style.top = PIN_Y + 'px';
    mainPin.style.left = PIN_X + 'px';
    window.form.setAddress();
    window.form.setFormCapacity();
    mainPin.addEventListener('mousedown', onMainPinMousedown);
    mainPin.addEventListener('keydown', onMainPinEnterPress);
  };

  var unlockPage = function () {
    map.classList.remove('map--faded');
    window.data.load(onLoadSuccess, onLoadError);
    window.form.changeAddress();
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
    window.form.changeAddress();
    mainPin.removeEventListener('mousedown', onMainPinMousedown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.upload(new FormData(form), onSaveSuccess, onSaveError);
  });

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    lockPage();
  });

  lockPage();
})();
