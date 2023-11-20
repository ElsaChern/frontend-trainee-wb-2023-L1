// Задача 27:
// Задача: Добавить анимацию для элемента:
// Напишите функцию, которая добавляет анимацию для элемента на веб-странице,
// например, плавное изменение его положения или размера.

// Решение:

const elem = document.querySelector(".animate");
const startBtn = document.querySelector("#btn");

function moveElement(duration, transform, delay) {
  elem.style.transitionDelay = delay;
  elem.style.transitionDuration = duration;
  elem.style.transform = transform;
}

startBtn.addEventListener("click", () => {
  moveElement("3s", "scale(3.4)", "1s");
});
