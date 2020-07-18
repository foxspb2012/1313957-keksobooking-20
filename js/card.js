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

  var fillTextContent = function (receiver, source) {
    if (source) {
      receiver.textContent = source;
    } else {
      receiver.classList.add('visually-hidden');
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

  var checkingData = function (data, cardElement) {
    if (data.author.avatar) {
      cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    } else {
      cardElement.querySelector('.popup__avatar').classList.add('visually-hidden');
    }

    if (data.offer.rooms && data.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнат' + window.extension.roomEnding(data.offer.rooms)
        + ' для ' + data.offer.guests + ' гост' + window.extension.guestEnding(data.offer.guests);
    } else {
      cardElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
    }

    if (data.offer.checkin && data.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    } else {
      cardElement.querySelector('.popup__text--time').classList.add('visually-hidden');
    }

    if (data.offer.photos.length > 0) {
      cardElement.querySelector('.popup__photos').innerHTML = fillPhoto(data.offer.photos);
    } else {
      cardElement.querySelector('.popup__photos').classList.add('visually-hidden');
    }

    if (data.offer.features.length > 0) {
      fillFeatures(data.offer.features, cardElement);
    } else {
      cardElement.querySelector('.popup__features').classList.add('visually-hidden');
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

    fillTextContent(cardElement.querySelector('.popup__title'), data.offer.title);
    fillTextContent(cardElement.querySelector('.popup__text--address'), data.offer.address);
    fillTextContent(cardElement.querySelector('.popup__text--price'), data.offer.price + '₽/ночь');
    fillTextContent(cardElement.querySelector('.popup__type'), nameRealty[data.offer.type]);
    fillTextContent(cardElement.querySelector('.popup__description'), data.offer.description);
    checkingData(data, cardElement);

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
    openCard: openCard,
  };
})();
