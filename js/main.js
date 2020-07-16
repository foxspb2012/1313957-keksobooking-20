'use strict';
var MAP_ADS = 8;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 84;
var ROUND_MAIN_PIN_HEIGHT = 65;

var PIN_LOCATION_X_MIN = 0;
var PIN_LOCATION_X_MAX = 1200;
var PIN_LOCATION_Y_MIN = 130;
var PIN_LOCATION_Y_MAX = 630;

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var formControls = form.querySelectorAll('[name]');
var formAddress = form.querySelector('#address');
var formType = form.querySelector('#type');
var formPrice = form.querySelector('#price');
var formTimein = form.querySelector('#timein');
var formTimeout = form.querySelector('#timeout');
var formRoom = form.querySelector('#room_number');
var formCapacity = form.querySelector('#capacity');
var formButtons = form.querySelectorAll('.ad-form__element--submit button');
var filter = document.querySelector('.map__filters');
var filterControls = filter.querySelectorAll('[name]');

var prices = ['1000', '1200', '1500', '2500', '3000'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var housePhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var nameRealty = {
  bungalo: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец'
};

var priceRealty = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};

var capacityValidValues = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
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

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var getRandomItems = function (items) {
  var randomElements = items.slice();
  for (var i = randomElements.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * randomElements.length);
    var swap = randomElements[j];
    randomElements[j] = randomElements[i];
    randomElements[i] = swap;
  }
  randomElements = randomElements.slice(0, getRandomInteger(1, randomElements.length));
  return randomElements;
};

var generatePin = function (index) {
  var avatar = 'img/avatars/user0' + index + '.png';
  var title = 'Обьявление';
  var locationX = getRandomInteger(PIN_LOCATION_X_MIN, PIN_LOCATION_X_MAX);
  var locationY = getRandomInteger(PIN_LOCATION_Y_MIN, PIN_LOCATION_Y_MAX);
  var address = locationX + ', ' + locationY;
  var price = getRandomItem(prices);
  var type = getRandomItem(types);
  var rooms = getRandomInteger(1, 100);
  var guests = getRandomInteger(1, 3);
  var timeCheckin = getRandomItem(checkin);
  var timeCheckout = getRandomItem(checkout);
  var featuresArray = getRandomItems(features);
  var description = 'Строка с описанием';
  var photos = getRandomItems(housePhotos);
  var pin = {
    'author': {
      'avatar': avatar,
    },
    'offer': {
      'title': title,
      'address': address,
      'price': price,
      'type': type,
      'rooms': rooms,
      'guests': guests,
      'checkin': timeCheckin,
      'checkout': timeCheckout,
      'features': featuresArray,
      'description': description,
      'photos': photos
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };
  return pin;
};

var getPins = function (count) {
  var pins = [];
  for (var i = 1; i <= count; i++) {
    pins.push(generatePin(i));
  }
  return pins;
};

var createPin = function (pin) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = template.cloneNode(true);
  var left = pin.location.x - PIN_WIDTH / 2;
  var top = pin.location.y - PIN_HEIGHT;
  pinElement.setAttribute('style', 'left: ' + left + 'px; top: ' + top + 'px;');
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.addEventListener('click', function () {
    openCard(pin);
  });
  return pinElement;
};

var renderPins = function (pins) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  pins.forEach(function (pin) {
    fragment.appendChild(createPin(pin));
  });
  mapPins.appendChild(fragment);
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

  map.insertBefore(cardElement, mapFilters);
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

var onMapCardEscPress = function (evt) {
  if (evt.code === 'Escape') {
    closeCard();
  }
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

var lockPage = function () {
  setAddress();
  setFormCapacity();
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
  changeAddress();
  map.classList.remove('map--faded');
  var pins = getPins(MAP_ADS);
  renderPins(pins);
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

formType.addEventListener('change', function () {
  setFormPrice();
});

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

lockPage();
