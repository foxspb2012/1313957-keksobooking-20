'use strict';

(function () {

  var map = document.querySelector('.map');

  var onMapCardEscPress = function (evt) {
    if (evt.code === window.extension.keyCode['escape']) {
      close();
    }
  };

  var fillFeatures = function (cardElement, featuresArray) {
    for (var i = 0; i < featuresArray.length; i++) {
      var targetValue = window.extension.features[i];
      if (featuresArray.indexOf(targetValue) === -1) {
        cardElement.querySelector('.popup__feature--' + targetValue).remove();
      }
    }
  };

  var fillPhoto = function (photos) {
    var img = '';
    for (var i = 0; i < photos.length; i++) {
      img += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }
    return img;
  };

  var removePopup = function () {
    var popupWindow = document.querySelector('.popup');
    if (popupWindow) {
      popupWindow.remove();
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === window.extension.keyCode['escape']) {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    removePopup();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var createPopupAvatar = function (avatar, cardElement) {
    if (avatar) {
      cardElement.querySelector('.popup__avatar').src = avatar;
    } else {
      cardElement.querySelector('.popup__avatar').classList.add('visually-hidden');
    }
  };

  var checkingDataAndCreateElement = function (elem, data, option, insertText) {
    if (!data) {
      elem.classList.add('visually-hidden');
      return;
    } else {
      if (option) {
        elem.textContent = insertText;
      } else {
        elem.innerHTML = insertText;
      }
    }
  };

  var renderNewCard = function (data) {
    var mapFilters = document.querySelector('.map__filters-container');
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = template.cloneNode(true);
    var closeCardButton = cardElement.querySelector('.popup__close');
    closeCardButton.addEventListener('click', function () {
      close();
      closePopup();
    });

    closeCardButton.addEventListener('keydown', function (evt) {
      if (evt.key === window.extension.keyCode['enter']) {
        closePopup();
      }
    });

    var newCard = data.offer;
    createPopupAvatar(data.author.avatar, cardElement);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__title'), newCard.title, true, newCard.title);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__text--address'), newCard.address, true, newCard.address);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__text--price'), newCard.price + '₽/ночь', false, newCard.price + '₽/ночь');
    checkingDataAndCreateElement(cardElement.querySelector('.popup__type'), window.extension.nameRealty[newCard.type], true, window.extension.nameRealty[newCard.type]);
    var textCapacity = newCard.rooms + ' комнат' + window.extension.roomEnding(newCard.rooms) + ' для ' + newCard.guests + ' гост' + window.extension.guestEnding(newCard.guests);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__text--capacity'), newCard.rooms, true, textCapacity);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__text--time'), newCard.checkin, true, 'Заезд после ' + newCard.checkin + ', выезд до ' + newCard.checkout);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__description'), newCard.description, true, newCard.description);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__photos'), newCard.photos, false, fillPhoto(newCard.photos));
    fillFeatures(cardElement, newCard.features);

    map.insertBefore(cardElement, mapFilters);
  };

  var open = function (pin) {
    close();
    renderNewCard(pin);
    document.addEventListener('keydown', onMapCardEscPress);
  };

  var close = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }

    var pinActive = map.querySelector('.map__pin--active');
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }

    document.removeEventListener('keydown', onMapCardEscPress);
  };

  window.card = {
    open: open,
    close: close
  };
})();
