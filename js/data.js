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

  var sendRequest = function (url, method, data, onLoad, onError) {
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
    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    sendRequest(HTTPMethods.GET, 'GET', null, onLoad, onError);
  };

  var upload = function (data, onLoad, onError) {
    sendRequest(HTTPMethods.POST, 'POST', data, onLoad, onError);
  };

  window.data = {
    load: load,
    upload: upload,
  };
})();
