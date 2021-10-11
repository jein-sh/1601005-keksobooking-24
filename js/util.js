//Модуль со вспомогательными функциями

//Функция, возвращающая случайное целое положительное число из переданного диапазона включительно

function getRandomFromRange(min, max) {
  if (max > min && min >= 0 && max > 0) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль');
}

export {getRandomFromRange};

//Функция, возвращающая случайное положительное число с плавающей точкой из переданного диапазона включительно с указанным количеством знаков после запятой

function getRandomFloatFromRange(min, max, numOfDecimals) {
  if (max > min && min >= 0 && max > 0) {
    const randomFloat = Math.random() * (max + 1 - min) + min;
    return randomFloat.toFixed(numOfDecimals);
  }

  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль');
}

export {getRandomFloatFromRange};

//Функция, возвращающая случайный элемент массива

const getRandomArrayElement = (elements) => elements[getRandomFromRange(0, elements.length - 1)];

export {getRandomArrayElement};

//Функция, возвращающая массив случайной длины из исходного массива

const getRandomLengthArray = (elements) => {
  const maxLength = elements.length;
  const lengthArray = getRandomFromRange(1, maxLength);
  const array = [];

  for (let i=0; i < lengthArray; i++) {
    const element = elements[getRandomFromRange(0, maxLength - 1)];

    if (!array.includes(element)) {
      array.push(element);
    }
  }
  return array;
};

export {getRandomLengthArray};
