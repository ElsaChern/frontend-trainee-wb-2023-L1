// Задача 4:
// Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
// 112 сообщения
// 12 сообщений
// 1 сообщение
// 1024 пользователя
// 1026 пользователей
// 121 пользователь
// Функцию надо упаковать в модуль.

import endingOfWord from "./module.mjs";
// Примечание: файл с расширением .mjs — это файл исходного кода JavaScript,
// который используется в качестве модуля ECMA (модуль ECMAScript) в приложениях Node.js.
// Импортируем функцию и проверяем результат работы

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

// проверим правильность работы на 130 числах
for (let i = 0; i <= 130; i++) {
  console.log(endingOfWord(i, ["сообщение", "сообщения", "сообщений"]));
}
