'use strict';

(function () {
  var HTTPMethods = {
    POST: 'https://javascript.pages.academy/keksobooking',
    GET: 'https://javascript.pages.academy/keksobooking/data',
  };

  var TIMEOUT = 10000;
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
    xhr.timeout = TIMEOUT;
    xhr.open('GET', HTTPMethods.GET);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad();
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.open('POST', HTTPMethods.POST);
    xhr.send(data);
  };

  window.data = {
    load: load,
    upload: upload,
  };
})();
