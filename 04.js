// Задача 4:
// Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
// 112 сообщения
// 12 сообщений
// 1 сообщение
// 1024 пользователя
// 1026 пользователей
// 121 пользователь
// Функцию надо упаковать в модуль.

// Решение:

const endingOfWord = (num, forms) => {
  // Падеж необходимо определять в зависимости от последней цифры пришедшего к нам числа, поэтому необходимо её найти
  // Преобразование числа в строку:
  let numToString = num.toString();
  // Определение последней цифры:
  let lastNumber = numToString.slice(-1);
  // Определение предпоследних 2 цифр (для десятков, сотен и более):
  let twoLastNumber = numToString.slice(-2);

  if (
    numToString.length >= 2 &&
    ["11", "12", "13", "14"].includes(twoLastNumber)
  ) {
    return `${num} ${forms[2]}`;
  }
  if (lastNumber === "1") {
    return `${num} ${forms[0]}`;
  }
  if (lastNumber >= "2" && lastNumber <= "4") {
    return `${num} ${forms[1]}`;
  }
  return `${num} ${forms[2]}`;
};

console.log(endingOfWord(112, ["сообщение", "сообщения", "сообщений"]));
console.log(endingOfWord(12, ["сообщение", "сообщения", "сообщений"]));
console.log(endingOfWord(1, ["сообщение", "сообщения", "сообщений"]));
console.log(
  endingOfWord(1024, ["пользователь", "пользователя", "пользователей"]),
);
console.log(
  endingOfWord(1026, ["пользователь", "пользователя", "пользователей"]),
);
console.log(
  endingOfWord(121, ["пользователь", "пользователя", "пользователей"]),
);
console.log(endingOfWord(5, ["солнце", "солнца", "солнц"]));

for (let i = 0; i <= 130; i++) {
  console.log(endingOfWord(i, ["сообщение", "сообщения", "сообщений"]));
}
