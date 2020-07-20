'use strict';

(function () {
  var map = document.querySelector('.map');

  var nameRealty = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var onMapCardEscPress = function (evt) {
    if (evt.code === 'Escape') {
      closeCard();
    }
  };

  var fillFeatures = function (featuresArray, cardElement) {
    for (var i = 0; i < window.data.features.length; i++) {
      var targetValue = window.data.features[i];
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
    if (evt.key === 'Escape') {
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
      closeCard();
      closePopup();
    });

    closeCardButton.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        closePopup();
      }
    });

    var newCard = data.offer;
    createPopupAvatar(data.author.avatar, cardElement);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__title'), newCard.title, true, newCard.title);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__text--address'), newCard.address, true, newCard.address);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__text--price'), newCard.price + '₽/ночь', false, newCard.price + '₽/ночь');
    checkingDataAndCreateElement(cardElement.querySelector('.popup__type'), nameRealty[newCard.type], true, nameRealty[newCard.type]);
    var textCapacity = newCard.rooms + ' комнат' + window.extension.roomEnding(newCard.rooms) + ' для ' + newCard.guests + ' гост' + window.extension.guestEnding(newCard.guests);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__text--capacity'), newCard.rooms, true, textCapacity);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__text--time'), newCard.checkin, true, 'Заезд после ' + newCard.checkin + ', выезд до ' + newCard.checkout);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__description'), newCard.description, true, newCard.description);
    checkingDataAndCreateElement(cardElement.querySelector('.popup__photos'), newCard.photos, false, fillPhoto(newCard.photos));
    fillFeatures(newCard.features, cardElement);

    map.insertBefore(cardElement, mapFilters);
  };

  var openCard = function (pin) {
    closeCard();
    renderNewCard(pin);
    document.addEventListener('keydown', onMapCardEscPress);
  };

  var closeCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    document.removeEventListener('keydown', onMapCardEscPress);
  };

  window.card = {
    openCard: openCard
  };
})();
