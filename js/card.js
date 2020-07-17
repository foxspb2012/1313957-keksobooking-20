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

  var renderNewCard = function (data) {
    var mapFilters = document.querySelector('.map__filters-container');
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = template.cloneNode(true);
    var closeCardButton = cardElement.querySelector('.popup__close');
    closeCardButton.addEventListener('click', function () {
      closeCard();
    });
    var popupClose = cardElement.querySelector('.popup__close');
    var popupAvatar = cardElement.querySelector('.popup__avatar');
    var popupTitle = cardElement.querySelector('.popup__title');
    var popupTextAddress = cardElement.querySelector('.popup__text--address');
    var popupTextPrice = cardElement.querySelector('.popup__text--price');
    var popupType = cardElement.querySelector('.popup__type');
    var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    var popupTextTime = cardElement.querySelector('.popup__text--time');
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupDescription = cardElement.querySelector('.popup__description');
    var popupPhotos = cardElement.querySelector('.popup__photos');

    fillTextContent(popupTitle, data.offer.title);
    fillTextContent(popupTextAddress, data.offer.address);
    fillTextContent(popupTextPrice, data.offer.price + '₽/ночь');
    fillTextContent(popupType, nameRealty[data.offer.type]);
    fillTextContent(popupDescription, data.offer.description);

    if (data.author.avatar) {
      popupAvatar.src = data.author.avatar;
    } else {
      popupAvatar.classList.add('visually-hidden');
    }

    if (data.offer.rooms && data.offer.guests) {
      popupTextCapacity.textContent = data.offer.rooms + ' комнат' + window.extension.roomEnding(data.offer.rooms) + ' для ' + data.offer.guests + ' гост' + window.extension.guestEnding(data.offer.guests);
    } else {
      popupTextCapacity.classList.add('visually-hidden');
    }

    if (data.offer.checkin && data.offer.checkout) {
      popupTextTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    } else {
      popupTextTime.classList.add('visually-hidden');
    }

    if (data.offer.features.length > 0) {
      fillFeatures(data.offer.features, cardElement);
    } else {
      popupFeatures.classList.add('visually-hidden');
    }

    if (data.offer.photos.length > 0) {
      popupPhotos.innerHTML = fillPhoto(data.offer.photos);
    } else {
      popupPhotos.classList.add('visually-hidden');
    }

    popupClose.addEventListener('click', function () {
      closePopup();
    });

    popupClose.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        closePopup();
      }
    });

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
