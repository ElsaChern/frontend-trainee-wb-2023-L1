// Задача 1:
// напишите функцию, которая проверяет, является ли заданная строка палиндромом.
// Палиндром — это строка, которая читается одинаково в обоих направлениях
// (например, «аргентина манит негра»)

// Вариант решения № 1:

// Функция, принимающая строку
const isStrPalindrom = (str) => {
  // Если строка приходит с заглавной буквы и/или имеет знаки пунктуации - изменяем буквы на строчные и удаляет всё, кроме букв
  let solidLowerSrt = str.toLowerCase().replace(/[^a-zа-яё]/gi, "");
  // Здесь будет хранится перевернутая строка
  let result = "";
  // Проходимся по каждой букве строки с конца и записываем их в result
  for (let i = solidLowerSrt.length - 1; i >= 0; i--) {
    result += solidLowerSrt[i];
  }
  // Проверяем является ли заданная строка палиндромом также удалив у параментра функции пробелы и иные символы
  if (result === str.toLowerCase().replace(/[^a-zа-яё]/gi, "")) {
    return true;
  } else {
    return false;
  }
};

console.log(isStrPalindrom("аргентина манит негра"));
console.log(isStrPalindrom("Уж редко рукою я окурок держу"));
console.log(isStrPalindrom("Муха! О, муха! Велика аки лев! Ах, ум! О ах, ум!"));

// Вариант решения № 2: (с reverse())

// Функция, принимающая строку
const isStrPalindromV2 = (str) => {
  // Чтобы избежать случаев, когда строка приходит с заглавной буквы - изменяем все буквы на строчные
  let lowerStr = str.toLowerCase();
  // Создаем из строки массив всех букв, переворачиваем порядок их следования и возвращем строку
  let reverseStr = lowerStr.split("").reverse().join("");
  // Для проверки строки из нескольких слов, следует удалить всё,  кроме букв
  let solidStr = reverseStr.replace(/[^a-zа-яё]/gi, "");
  // Проверяем является ли заданная строка палиндромом также удалив у параментра функции пробелы и иные символы
  if (solidStr === str.toLowerCase().replace(/[^a-zа-яё]/gi, "")) {
    return true;
  } else {
    return false;
  }
};

console.log(isStrPalindromV2("аргентина манит негра"));
console.log(isStrPalindromV2("Уж редко рукою я окурок держу"));
console.log(
  isStrPalindromV2("Муха! О, муха! Велика аки лев! Ах, ум! О ах, ум!"),
);

// Вариант решения № 3:

// Функция, принимающая строку
const isStrPalindromV3 = (str) => {
  // Если строка приходит с заглавной буквы и/или имеет знаки пунктуации - изменяем буквы на строчные и удаляет всё, кроме букв
  // создаем массив
  let solidLowerSrt = str
    .toLowerCase()
    .replace(/[^a-zа-яё]/gi, "")
    .split("");
  // Чтобы проверить строку на палиндром,
  // достаточно проверить лишь половину строки и сравнить первую и последнюю букву, вторую и предпоследнюю  и т.д.
  for (let i = 0; i <= solidLowerSrt.length / 2; i++) {
    if (solidLowerSrt[i] !== solidLowerSrt[solidLowerSrt.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

console.log(isStrPalindromV3("аргентина манит негра"));
console.log(isStrPalindromV3("Уж редко рукою я окурок держу"));
console.log(
  isStrPalindromV3("Муха! О, муха! Велика аки лев! Ах, ум! О ах, ум!"),
);
