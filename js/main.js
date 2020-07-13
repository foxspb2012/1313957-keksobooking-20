'use strict';
var MAP_ADS = 8;
var PIN_HEIGHT = 22;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;

var map = document.querySelector('.map');

var template = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');

var getLocation = function () {
  var locationX = Math.floor(Math.random() * (1000 - 100) + 100);
  var locationY = Math.floor(Math.random() * (1000 - 100) + 100);
  return locationX + ', ' + locationY;
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var getRandomItems = function (items, num) {
  return items.splice(Math.floor(Math.random() * num));
};

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var housePhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getMapAd = function () {
  var pinsData = [];

  for (var i = 0; i < MAP_ADS; i++) {
    var imgNumber = i + 1;
    pinsData.push(
        {
          author: {
            avatar: 'img/avatars/user' + '0' + imgNumber + '.png',
          },
          offer: {
            title: 'Обьявление',
            address: getLocation(),
            price: getRandomInteger(1000, 10000),
            type: getRandomItem(types),
            rooms: getRandomInteger(1, 100),
            guests: getRandomInteger(1, 3),
            checkin: getRandomItem(checkin),
            checkout: getRandomItem(checkout),
            features: getRandomItems(features, 6),
            description: 'Строка с описанием',
            photos: getRandomItems(housePhotos, 3)
          },
          location: {
            x: getRandomInteger(10, 1200),
            y: getRandomInteger(130, 630),
          }
        }
    );
  }
  return pinsData;
};

var getMapPin = function (data) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < data.length; j++) {
    var elem = template.cloneNode(true);
    var img = elem.children[0];
    elem.style = 'left: ' + (data[j].location.x - 25) + 'px; top: ' + (data[j].location.y - 70) + 'px;';
    img.src = data[j].author.avatar;
    img.alt = data[j].offer.title;

    fragment.append(elem);
  }
  return fragment;
};

var adMap = getMapAd();
mapPins.append(getMapPin(adMap));

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

var priceAndNameRealty = {
  bungalo: {
    name: 'Бунгало', placeholderValue: '0', minValue: '0'
  },
  flat: {
    name: 'Квартира', placeholderValue: '1000', minValue: '1000'
  },
  house: {
    name: 'Дом', placeholderValue: '5000', minValue: '5000'
  },
  palace: {
    name: 'Дворец', placeholderValue: '10000', minValue: '10000'
  }
};

var roomEnding = function (rooms) {
  var lastDigit = rooms;
  if (rooms > 20) {
    lastDigit = rooms % 10;
  }
  var ending = {
    0: '',
    1: 'а',
    2: 'ы',
    3: 'ы',
    4: 'ы',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
  };
  var result = (rooms >= 5 && rooms <= 20) ? '' : ending[lastDigit];
  return result;
};

var guestEnding = function (guests) {
  var lastDigit = guests;
  if (guests >= 10) {
    lastDigit = guests % 10;
  }
  var result = (lastDigit === 1) ? 'я' : 'ей';
  return result;
};

var fillTextContent = function (receiver, source) {
  if (source) {
    receiver.textContent = source;
  } else {
    receiver.classList.add('visually-hidden');
  }
};

var fillFeatures = function (featuresArray, cardElement) {
  for (var i = 0; i < features.length; i++) {
    var targetValue = features[i];
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

var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

var renderNewCard = function (data, cardTemp) {
  var cardElement = cardTemp.cloneNode(true);
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

  if (data.author.avatar) {
    popupAvatar.src = data.author.avatar;
  } else {
    popupAvatar.classList.add('visually-hidden');
  }

  fillTextContent(popupTitle, data.offer.title);
  fillTextContent(popupTextAddress, data.offer.address);
  fillTextContent(popupTextPrice, data.offer.price + '₽/ночь');
  fillTextContent(popupType, priceAndNameRealty[data.offer.type].name);
  fillTextContent(popupDescription, data.offer.description);

  if (data.offer.rooms && data.offer.guests) {
    popupTextCapacity.textContent = data.offer.rooms + ' комнат' + roomEnding(data.offer.rooms) + ' для ' + data.offer.guests + ' гост' + guestEnding(data.offer.guests);
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

  return cardElement;
};

var mapFilterContainer = document.querySelector('.map__filters-container');
var mainPin = mapPins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormSelect = adForm.querySelectorAll('select');
var adFormInput = adForm.querySelectorAll('input');
var mapFilter = document.querySelector('.map__filters');
var mapFilterSelect = mapFilter.querySelectorAll('select');
var mapFilterInput = mapFilter.querySelectorAll('input');
var mainPinLocation = adForm.querySelector('#address');
var pinCenterPositionX = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
var pinCenterPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormGuestCapacity = adForm.querySelector('#capacity');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
adForm.classList.add('ad-form--disabled');
map.classList.add('map--faded');

timeIn.addEventListener('change', function (evt) {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', function (evt) {
  timeIn.value = evt.target.value;
});

var statusDisabled = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].setAttribute('disabled', 'true');
  }
};

var statusActive = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].removeAttribute('disabled');
  }
};

statusDisabled(mapFilterSelect);
statusDisabled(mapFilterInput);
statusDisabled(adFormSelect);
statusDisabled(adFormInput);

mainPinLocation.removeAttribute('disabled');

var initlPinMainPosition = function () {
  mainPinLocation.value = pinCenterPositionX + ', ' + pinCenterPositionY;
};

initlPinMainPosition();

var setupAddress = function () {
  var newPinPositionY = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_HEIGHT);
  mainPinLocation.value = pinCenterPositionX + ', ' + newPinPositionY;
};

var activationPage = function () {
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  statusActive(adFormInput);
  statusActive(adFormSelect);
  statusActive(mapFilterSelect);
  statusActive(mapFilterInput);
  setupAddress();
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activationPage();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activationPage();
  }
});

var checkRoomnAdGuest = function () {
  var roomNumber = adFormRoomNumber.value;
  var guestNumber = adFormGuestCapacity.value;
  var isValid = true;

  if (roomNumber === '1' && guestNumber !== '1') {
    isValid = false;
  } else if (roomNumber === '2' && (guestNumber === '3' || guestNumber === '0')) {
    isValid = false;
  } else if (roomNumber === '3' && guestNumber === '0') {
    isValid = false;
  } else if (roomNumber === '100' && guestNumber !== '0') {
    isValid = false;
  }
  return isValid;
};

var checkField = function (field) {
  if (!checkRoomnAdGuest()) {
    field.setCustomValidity('Выберете корректно');
  } else {
    field.setCustomValidity('');
  }
};

adFormRoomNumber.addEventListener('change', function () {
  checkField(adFormRoomNumber);
});

adFormGuestCapacity.addEventListener('change', function () {
  checkField(adFormRoomNumber);
});

var type = adForm.querySelector('#type');
var price = adForm.querySelector('#price');

type.addEventListener('change', function () {
  var priceText = priceAndNameRealty[type.value];
  price.placeholder = priceText.placeholderValue;
  price.min = priceText.minValue;
});

var newCard = renderNewCard(adMap[0], cardTemplate);

var fragmentMap = document.createDocumentFragment();
fragmentMap.appendChild(newCard);

map.insertBefore(newCard, mapFilterContainer);
