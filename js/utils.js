import {POP_UP_CLOSING_TIME} from './contants.js';
/**
 * Сопостовляет слово с ключами объекта и возвращает значение совпавшего ключа
 * @param listTranslatedWords {Object} перебираемый объект
 * @param word {string} слово
 * @return {string} значение по совпавшему ключу
 */
const translateWord = (listTranslatedWords, word) => {
  for (const notTranslateWord in listTranslatedWords) {
    if (notTranslateWord === word) {
      return listTranslatedWords[word];
    }
  }
};

/**
 * Функция проверяет, не пустое ли свойство isProperty, и в завсимости от этого возращает нужное действие с шаблоном
 * @param classSearched {string} искомый класс в шаблоне
 * @param isProperty {string|number} проверяемое свойство
 * @param templateElement {Node} сам шаблон
 * @param textContent {string} текстовый ухел который будет подставляться если свойство не пустое
 * @return {string}
 */
const editTemplate = (classSearched, isProperty, templateElement, textContent) => {
  let finalActionMarkup;
  if (isProperty) {
    finalActionMarkup = `${templateElement.querySelector(`.${classSearched}`).textContent = textContent}`;
  } else {
    finalActionMarkup = `${templateElement.querySelector(`.${classSearched}`).style.display = 'none'}`;
  }
  return finalActionMarkup;
};

const showAlert = (massage) => {
  const showAlertTemplate = document.querySelector('#alert-danger').content.querySelector('.alert-danger').cloneNode(true);
  const showAlertText = showAlertTemplate.querySelector('.alert-danger__description');
  showAlertText.textContent = massage;
  document.body.insertAdjacentElement('beforeend', showAlertTemplate);
  setTimeout(() => {showAlertTemplate.remove();}, POP_UP_CLOSING_TIME);
};

/**
 * Сравнивает массивы, возращает False, если хотябы один элемент arrayB НЕ включен в массив arrayA
 * @param arrayA {array}
 * @param arrayB {array}
 * @return {boolean}
 */
const compareArrays = (arrayA, arrayB) => arrayA.length >= arrayB.length && arrayB.every((element) => arrayA.includes(element));

const isEscape = (evt) => evt.key === 'Escape';

export {
  translateWord,
  editTemplate,
  showAlert,
  isEscape,
  compareArrays
};
