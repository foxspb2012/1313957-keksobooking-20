'use strict';

(function () {
  var PIN_COUNT = 5;
  var VALUE_DEFAULT = 'any';

  var filterForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');


  function makeFilterAds(offers) {
    return offers.filter(function (offer) {
      return filterByType(offer)
          && filterByPrice(offer)
          && filterByRooms(offer)
          && filterByGuests(offer)
          && filterByFeatures(offer);
    }).slice(0, PIN_COUNT);
  }

  function filterByType(element) {
    return housingType.value === element.offer.type || housingType.value === VALUE_DEFAULT;
  }

  function filterByPrice(item) {
    var priceValue = housingPrice.value;
    switch (priceValue) {
      case 'any':
        return true;
      case 'low':
        return item.offer.price < 10000;
      case 'middle':
        return (item.offer.price > 10000 && item.offer.price < 50000);
      case 'high':
        return item.offer.price > 50000;
      default:
        throw new Error('Неизвестный тип: ' + priceValue);
    }
  }

  function filterByRooms(item) {
    var roomsValue = housingRooms.value;
    if (roomsValue === 'any') {
      return true;
    } else {
      return item.offer.rooms === Number(roomsValue);
    }
  }

  function filterByGuests(item) {
    var guestsValue = housingGuests.value;
    if (guestsValue === 'any') {
      return true;
    } else {
      return item.offer.guests === Number(guestsValue);
    }
  }

  function filterByFeatures(item) {
    var checkedFeatures = housingFeatures.querySelectorAll('input[name="features"]:checked');
    return Array.from(checkedFeatures).every(function (checkedFeature) {
      return item.offer.features.includes(checkedFeature.value);
    });
  }

  function getFilteredData(offers) {
    return makeFilterAds(offers);
  }

  window.filter = {
    getFilteredData: getFilteredData
  };
})();


