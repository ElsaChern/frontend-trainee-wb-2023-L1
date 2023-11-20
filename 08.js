// Задача 8:
// Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию,
// которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.

// Массив функций:
const functionArray = [
  function firstFunc() {
    return 1;
  },
  function secondFunc() {
    return 2;
  },
  function thirdFunc() {
    return 3;
  },
];

// Решение:
const returnAllFuncResults = (funcArr) => {
  return (newFunction = () => {
    const result = [];
    for (let func of funcArr) {
      result.push(func());
    }
    return result;
  });
};

// Прверка:
const test = returnAllFuncResults(functionArray);
console.log(test()); // [1,2,3]
