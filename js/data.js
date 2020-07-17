'use strict';

(function () {
  var PIN_LOCATION_X_MIN = 0;
  var PIN_LOCATION_X_MAX = 1200;
  var PIN_LOCATION_Y_MIN = 130;
  var PIN_LOCATION_Y_MAX = 630;

  var prices = ['1000', '1200', '1500', '2500', '3000'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var housePhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var generatePin = function (index) {
    var avatar = 'img/avatars/user0' + index + '.png';
    var title = 'Обьявление';
    var locationX = window.extension.getRandomInteger(PIN_LOCATION_X_MIN, PIN_LOCATION_X_MAX);
    var locationY = window.extension.getRandomInteger(PIN_LOCATION_Y_MIN, PIN_LOCATION_Y_MAX);
    var address = locationX + ', ' + locationY;
    var price = window.extension.getRandomItem(prices);
    var type = window.extension.getRandomItem(types);
    var rooms = window.extension.getRandomInteger(1, 100);
    var guests = window.extension.getRandomInteger(1, 3);
    var timeCheckin = window.extension.getRandomItem(checkin);
    var timeCheckout = window.extension.getRandomItem(checkout);
    var featuresArray = window.extension.getRandomItems(features);
    var description = 'Строка с описанием';
    var photos = window.extension.getRandomItems(housePhotos);
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

  window.data = {
    getPins: getPins,
    features: features
  };
})();
