import maximumVolume from "./18.js";

const button = document.querySelector("#button");
const answer = document.querySelector(".answer");

// Заведем переменную, чтобы конечный результат можно было отобразить в мегабайтах
const megaByte = 1024 * 1024;

// При нажатии на кнопку запустим функцию подсчета объема
button.addEventListener("click", () => {
  let length = maximumVolume(); // Максимальный объем данных равен 5260119 байт или 5 мегабайт (Браузер Google Chrome)
  // Запишем результат (максимальную длину localStorage) в ответ в байтах и мегабайтах
  // В кодировке UTF-8 1 символ равен 1 байту
  answer.textContent = `Максимальный объем данных равен ${length} байт или ~ ${Math.floor(
    length / megaByte,
  )} мегабайт`;
});
