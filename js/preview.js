import {FILE_TYPES} from './contants.js';
import {adFormElement} from './form.js';
import {showAlert} from './utils.js';

const avatarChooser = adFormElement.querySelector('#avatar');
const houseChooser = adFormElement.querySelector('#images');
const avatarPreview = adFormElement.querySelector('.ad-form-header__preview img');
const housePreview = adFormElement.querySelector('.ad-form__photo');

const showPreview = (fileChooser, previewBlock) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (!matches) {
      showAlert('Кажется выбрана не картинка, попробуйте ещё раз');
    }

    if (matches && previewBlock.src) {
      previewBlock.src = URL.createObjectURL(file);
    }
    if (matches && !previewBlock.src) {
      previewBlock.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
      previewBlock.style.backgroundSize = 'cover';
    }
  });
};

showPreview(avatarChooser, avatarPreview);
showPreview(houseChooser, housePreview);

export {
  avatarPreview,
  housePreview
};
