const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoContainer = document.querySelector('.ad-form__photo');

avatarFileChooser.addEventListener('change', () => {
  const avatarFile = avatarFileChooser.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    avatarFileName.endsWith(it);
  });

  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatarFile);
  }
});

photoFileChooser.addEventListener('change', () => {
  const photoFile = photoFileChooser.files[0];
  const photoFileName = photoFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    photoFileName.endsWith(it);
  });

  if (matches) {
    const photoPreview = document.createElement('img');
    photoPreview.setAttribute('whidth', '70');
    photoPreview.setAttribute('height', '70');
    photoContainer.append(photoPreview);
    photoPreview.src = URL.createObjectURL(photoFile);
  }
});
