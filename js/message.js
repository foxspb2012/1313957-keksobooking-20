'use strict';

(function () {
  var onSuccessClick = function (evt) {
    if (evt.target !== document.querySelector('.success__message')) {
      closeSuccess();
    }
  };

  var onSuccessEscPress = function (evt) {
    if (evt.code === 'Escape') {
      closeSuccess();
    }
  };

  var onErrorClick = function (evt) {
    if (evt.target !== document.querySelector('.error__message') && evt.target !== document.querySelector('.error__button')) {
      closeError();
    }
  };

  var onErrorEscPress = function (evt) {
    if (evt.code === 'Escape') {
      closeError();
    }
  };

  var showSuccess = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    var message = template.cloneNode(true);
    document.querySelector('main').append(message);
    document.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var closeSuccess = function () {
    var message = document.querySelector('.success');
    if (message) {
      message.remove();
    }
    document.removeEventListener('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var showError = function () {
    var template = document.querySelector('#error').content.querySelector('.error');
    var message = template.cloneNode(true);
    var messageButton = message.querySelector('.error__button');
    messageButton.addEventListener('click', function () {
      closeError();
    });
    document.querySelector('main').append(message);
    document.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var closeError = function () {
    var message = document.querySelector('.error');
    if (message) {
      message.remove();
    }
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
