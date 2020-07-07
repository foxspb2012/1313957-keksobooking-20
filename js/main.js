'use strict';
var MAP_ADS = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

var typesRealty = {
  flat: 'Квартира',
  palace: 'Дворец',
  bungalo: 'Бунгало',
  house: 'Дом'
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


var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

var renderNewCard = function (data, cardTemp) {
  var cardElement = cardTemp.cloneNode(true);

  var popupAvatar = cardElement.querySelector('.popup__avatar');
  var popupTitle = cardElement.querySelector('.popup__title');
  var popupTextAddress = cardElement.querySelector('.popup__text--address');
  var popupTextPrice = cardElement.querySelector('.popup__text--price');
  var popupType = cardElement.querySelector('.popup__type');
  var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  var popupTextTime = cardElement.querySelector('.popup__text--time');
  var popupFeatures = cardElement.querySelector('.popup__features');
  var popupDescription = cardElement.querySelector('.popup__description');

  if (data.author.avatar !== '') {
    popupAvatar.src = data.author.avatar;
  } else {
    popupAvatar.classList.add('visually-hidden');
  }

  if (data.offer.title !== '') {
    popupTitle.textContent = data.offer.title;
  } else {
    popupTitle.classList.add('visually-hidden');
  }

  if (data.offer.address !== '') {
    popupTextAddress.textContent = data.offer.address;
  } else {
    popupTextAddress.classList.add('visually-hidden');
  }

  if (data.offer.price !== '') {
    popupTextPrice.textContent = data.offer.price + '₽/ночь';
  } else {
    popupTextPrice.classList.add('visually-hidden');
  }

  if (data.offer.type !== '') {
    popupType.textContent = typesRealty[data.offer.type];
  } else {
    popupType.classList.add('visually-hidden');
  }

  if (data.offer.rooms !== '' && data.offer.guests !== '') {
    popupTextCapacity.textContent = data.offer.rooms + ' комнат' + roomEnding(data.offer.rooms) + ' для ' + data.offer.guests + ' гост' + guestEnding(data.offer.guests);
  } else {
    popupTextCapacity.classList.add('visually-hidden');
  }

  if (data.offer.checkin !== '' && data.offer.checkout !== '') {
    popupTextTime.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  } else {
    popupTextTime.classList.add('visually-hidden');
  }

  if (data.offer.features.length > 1) {
    var featuresArray = data.offer.features;
    for (var i = 0; i < features.length; i++) {
      var targetValue = features[i];
      if (featuresArray.indexOf(targetValue) === -1) {
        cardElement.querySelector('.popup__feature--' + targetValue).remove();
      }
    }
  } else {
    popupFeatures.classList.add('visually-hidden');
  }

  if (data.offer.description !== '') {
    popupDescription.textContent = data.offer.description;
  } else {
    popupDescription.classList.add('visually-hidden');
  }

  var photosLength = data.offer.photos.length;
  var popupPhotos = cardElement.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');

  if (photosLength > 0) {
    data.offer.photos.forEach(function (item, index) {
      if (index === 0) {
        popupPhoto.src = item;
        return;
      }
      var popupPhotoTemplate = popupPhoto.cloneNode(true);
      popupPhotoTemplate.src = item;
      popupPhotos.appendChild(popupPhotoTemplate);
    });
  } else {
    popupPhotos.classList.add('visually-hidden');
  }

  return cardElement;
};

var newCard = renderNewCard(adMap[0], cardTemplate);

var fragmentMap = document.createDocumentFragment();
fragmentMap.appendChild(newCard);

var mapFilter = document.querySelector('.map__filters-container');
map.insertBefore(newCard, mapFilter);

