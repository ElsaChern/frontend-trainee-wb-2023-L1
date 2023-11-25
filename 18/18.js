// Задача 18:
// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

// Решение:
const button = document.querySelector("#button");
const answer = document.querySelector(".answer");

const megaByte = 1024 * 1024;

const maximumVolume = () => {
  const key = 1;
  const value = "v";
  localStorage.clear();
  try {
    if (true) {
      localStorage.setItem(key, value);
      key += 1;
    }
  } catch {
    console.log("localStorage переполнен");
    //распарсим в строку данные из localStorage
    const string = JSON.stringify(localStorage);
    //вернем длину строки
    answer.textContent = `Максимальный объем данных равен ${
      string.length
    } или ${string.length / megaByte} мегабайт`;
  }
};

button.addEventListener("click", () => {
  maximumVolume();
});
