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

export {getRandomNumber, getRandomFloatNumber, getRandomArrayElement};
