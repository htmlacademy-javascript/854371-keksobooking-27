/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * @param minNumber {number} начало диапазона
 * @param maxNumber {number} конец диапазона
 * @return {number} рандомное число
 */
const getRandomNumber = (minNumber = 0, maxNumber = 0) => {
  if (minNumber > maxNumber) {
    const mindNumber = minNumber;
    minNumber = maxNumber;
    maxNumber = mindNumber;
  }
  return Math.floor(Math.random() * (maxNumber + 1 - minNumber)) + minNumber;
};


/**
 * Функция, возвращающая случайное нецелое число из переданного диапазона включительно
 * @param minNumber {number} начало диапазона
 * @param maxNumber {number} конец диапазона
 * @param precisionNumber {number} переменная, которая определяет количество знаков после запятой
 * @return {number} рандомное число с плавающей точкой округленное до precisionNumber
 */
const getRandomFloatNumber = (minNumber = 0, maxNumber = 0, precisionNumber = 0) => {
  if (minNumber > maxNumber) {
    const mindNumber = minNumber;
    minNumber = maxNumber;
    maxNumber = mindNumber;
  }
  const randomNumber = Math.random() * (maxNumber + 1 - minNumber) + minNumber;
  return Number(randomNumber.toFixed(precisionNumber));
};

/**
 * Возвращает случайный элемент переданного массива
 * @param array {array} массив из которого нужно вернуть случайное значк=ение
 * @return {*} случайный элемент массива
 */
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

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
  setTimeout(() => {showAlertTemplate.remove();}, 5000);
};

export {
  getRandomNumber,
  getRandomFloatNumber,
  getRandomArrayElement,
  translateWord,
  editTemplate,
  showAlert
};
