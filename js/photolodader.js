'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var AVATAR_WIDTH = 40;
  var AVATAR_HEIGHT = 40;
  var HOUSING_WIDTH = 70;
  var HOUSING_HEIGHT = 70;

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var avatarPreviewImg = document.querySelector('.ad-form-header__preview img');
  var housingFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housingPreview = document.querySelector('.ad-form__photo');
  var avatarDefault = 'img/muffin-grey.svg';

  var fileReader = function (fileChooser, preview, imgWidth, imgHeight) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photo = document.createElement('img');
        photo.src = reader.result;
        photo.width = imgWidth;
        photo.height = imgHeight;
        preview.innerHTML = '';
        preview.appendChild(photo);
      });

      reader.readAsDataURL(file);
    }
  };

  var remove = function () {
    avatarPreviewImg.src = avatarDefault;
    avatarPreviewImg.width = AVATAR_WIDTH;
    avatarPreviewImg.height = AVATAR_HEIGHT;
    avatarPreview.innerHTML = '';
    avatarPreview.appendChild(avatarPreviewImg);

    housingPreview.innerHTML = '';
  };

  avatarFileChooser.addEventListener('change', function () {
    fileReader(avatarFileChooser, avatarPreview, AVATAR_WIDTH, AVATAR_HEIGHT);
  });

  housingFileChooser.addEventListener('change', function () {
    fileReader(housingFileChooser, housingPreview, HOUSING_WIDTH, HOUSING_HEIGHT);
  });

  window.photoloader = {
    remove: remove
  };

})();
