// Задача 7:
// У вас есть массив функций, напишите код, который вызовет каждую функцию в этом массиве и выведет их порядковый номер.
// Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.
// Другими словами, нужно выполнить следующие шаги:
// Вызвать первую функцию из массива.
// После завершения работы первой функции вызвать вторую функцию.
// После завершения работы второй функции вызвать третью функцию.
// И так далее, пока все функции в массиве не будут вызваны по порядку.

// Решение:

const callingFunctionsInOrder = async (funcArr) => {
  for (const func of funcArr) {
    await func();
  }
};

// Массив функций:
const functions = [
  function () {
    console.log("first function");
  },
  function () {
    Promise.resolve().then(() => console.log("second function"));
  },
  function () {
    setTimeout(() => console.log("third function"), 1000);
  },
  function () {
    console.log("fourth function");
  },
];

// Вызов функций:
callingFunctionsInOrder(functions);
