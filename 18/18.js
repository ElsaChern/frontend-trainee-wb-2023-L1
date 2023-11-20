// Задача 18:
// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

// Решение:
const button = document.querySelector("#button");
const answer = document.querySelector(".answer");

const maximumVolume = () => {
  // Если имеется какое-либо значение в localStorage - очищаем его
  localStorage.clear();
};
