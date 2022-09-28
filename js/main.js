/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * @param minNumber {number} начало диапазона
 * @param maxNumber {number} конец диапазона
 * @return {number} рандомное число
 */
const getRandomNumber = (minNumber, maxNumber) => {
  if (minNumber > maxNumber) {
    const mindNumber = minNumber;
    minNumber = maxNumber;
    maxNumber = mindNumber;
  }
  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
};
