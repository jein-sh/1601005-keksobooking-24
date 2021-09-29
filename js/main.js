//Функция, возвращающая случайное целое положительное число из переданного диапазона включительно

function getRandomFromRange(min, max) {
  if (max > min && min >= 0 && max > 0) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль');
}

//Функция, возвращающая случайное положительное число с плавающей точкой из переданного диапазона включительно с указанным количеством знаков после запятой

function getRandomFloatFromRange(min, max, numOfDecimals) {
  if (max > min && min >= 0 && max > 0) {
    const randomFloat = Math.random() * (max + 1 - min) + min;
    return Math.floor(randomFloat * 10 ** numOfDecimals) / 10 ** numOfDecimals;
  }

  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль');
}

getRandomFromRange(0, 10);
getRandomFloatFromRange(0, 200, 5);
