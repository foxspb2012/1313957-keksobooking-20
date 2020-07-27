'use strict';

(function () {
  var PIN_X = 570;
  var PIN_Y = 375;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('[name]');
  var filter = document.querySelector('.map__filters');
  var filterControls = filter.querySelectorAll('[name]');
  var formReset = form.querySelector('.ad-form__reset');
  var formSubmit = form.querySelector('.ad-form__submit');
  var filterForm = document.querySelector('.map__filters');

  var pins = [];

  var onLoadSuccess = function (data) {
    pins = data;
    renderPins();
    filterControls.forEach(function (control) {
      control.disabled = false;
    });
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
    formSubmit.blur();
    formSubmit.disabled = true;
    formReset.disabled = true;
    mainPin.style.top = PIN_Y + 'px';
    mainPin.style.left = PIN_X + 'px';
    window.form.setAddress();
    window.form.setFormCapacity();
    mainPin.addEventListener('mousedown', onMainPinMousedown);
    mainPin.addEventListener('keydown', onMainPinEnterPress);
    map.classList.add('map--faded');
    window.photoloader.remove();
  };

  var unlockPage = function () {
    map.classList.remove('map--faded');
    window.data.load(onLoadSuccess, onLoadError);
    window.form.changeAddress();
    form.classList.remove('ad-form--disabled');
    formControls.forEach(function (control) {
      control.disabled = false;
    });
    formSubmit.disabled = false;
    formReset.disabled = false;
    window.form.changeAddress();
    mainPin.removeEventListener('mousedown', onMainPinMousedown);
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
  };

  var renderPins = function () {
    var filteredPins = window.filter.getFilteredData(pins);
    window.pin.deletePins();
    window.pin.renderPins(filteredPins);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.upload(new FormData(form), onSaveSuccess, onSaveError);
  });

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    lockPage();
  });

  filterForm.addEventListener('change', function () {
    window.card.closeCard();
    renderPins();
  });

  lockPage();
})();
