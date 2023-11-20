// Задача 25:
// Задача: Создать и добавить стиль для элемента:
// Напишите функцию, которая создает новый элемент, добавляет его в DOM и устанавливает для него стиль с помощью CSS.

// Решение:
// Так как элементы могут содержать текст - дадим возможность функции добавлять текст для элемента, если он есть
// Поэтому в качестве параметров будут приходить: сам элемент, объект со стилями и возможный текст
const addNewElement = (element, styles, text) => {
  // Все необходимые элементы будем помещать в родильский контейнер - обозначим его:
  const container = document.querySelector(".container");

  // Созданим новый элемент исходя из пришедшего в функцию параметра
  const newElement = document.createElement(element);
  // Так как все стили записаны в объект, а для установки стиля нам нужны пары ключ-значение воспользуемся методом Object.entries()
  // Метод вернет нам массивы типа ['backgroundColor', 'green']
  // Пройдемся по каждому элементу массива. В качестве key получим стили, а в качестве value - их значение.
  Object.entries(styles).forEach(([key, value]) => {
    // Установим нашему элементу все стили из объекта
    newElement.style[key] = value;
  }),
    // Если в функцию пришел еще и текст - установим его с помощью метода textContent
    text ? (newElement.textContent = text) : "";
  // Добавим элемент в DOM
  container.appendChild(newElement);
};

// Найдем кнопку, при нажатии на которую будем добавлять и отображать новый элемент
const addElemBtn = document.querySelector("#button");
addElemBtn.addEventListener("click", () => {
  // Пропишем все желаемые стили для необходимого элемента
  addNewElement(
    "span",
    {
      backgroundColor: "green",
      border: "3px solid black",
      margin: "15px",
      padding: "10px",
    },
    "Я - новый зеленый элемент",
  );
});
