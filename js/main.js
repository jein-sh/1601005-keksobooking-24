//Функция, возвращающая случайное целое положительное число из переданного диапазона включительно

function getRandomFromRange(min, max) {
  if (max>min && min>=0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return 'Некорректные значения min и max';
}

//Функция, возвращающая случайное положительное число с плавающей точкой из переданного диапазона включительно с указанным количеством знаков после запятой

function getRandomFloatFromRange(min, max, numOfDecimals) {
  if (max>min && min>=0) {
    const randomFloat = Math.random() * (max - min + 1) + min;
    return Math.floor(randomFloat*10**numOfDecimals) / 10**numOfDecimals;
  }

  return 'Некорректные значения min и max';
}

getRandomFromRange(0, 10);
getRandomFloatFromRange(0, 200, 5);
