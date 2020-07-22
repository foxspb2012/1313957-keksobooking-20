'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var statusCode = {
    OK: 200
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + ' секунд');
    });
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open('GET', URL);
    xhr.send();
  };

  window.data = {
    load: load,
  };
})();
