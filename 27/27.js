// Задача 27:
// Задача: Добавить анимацию для элемента:
// Напишите функцию, которая добавляет анимацию для элемента на веб-странице,
// например, плавное изменение его положения или размера.

// Решение:

// Найдем необходимые элементы на странице: кнопку, при нажатии на которую начнется анимация и сам элемент
const elem = document.querySelector(".animate");
const startBtn = document.querySelector("#btn");

// В функцию передадим необходимые параметры
function moveElement(duration, transform, delay) {
  // И установим их для анимированного элемента
  elem.style.transitionDuration = duration;
  elem.style.transitionDelay = delay;
  elem.style.transform = transform;
}

// Добавим обработчик события на кнопку и запустим функцию для анимации
startBtn.addEventListener("click", moveElement("3s", "scale(3.4)", "1s"));
