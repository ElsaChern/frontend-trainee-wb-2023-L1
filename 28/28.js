// Задача 28:
// Задача: Создать и добавить элемент с использованием шаблонов:
// Напишите функцию, которая создает новый элемент с использованием шаблонов (например, с помощью тега <template>)
// и добавляет его в DOM.

// Решение:
// Найдем все необходимые элементы на странице: тело таблицы, шаблон template и кнопку для отображения нового элемента
const tbody = document.querySelector("tbody");
const template = document.querySelector("#price_list_row");
const button = document.querySelector("#btn");

// Создадим функцию, которая будет принимать массив с данными
const createElement = ([number, serviceName, master, price]) => {
  // Склонируем содержимое шаблона, которое доступно по его свойству .content
  const clone = template.content.cloneNode(true);
  // Далее найдем все элементы шаблона
  const td = clone.querySelectorAll("td");
  // И для каждого из них обозначим textContent по порядку элементов массива
  td[0].textContent = number;
  td[1].textContent = serviceName;
  td[2].textContent = master;
  td[3].textContent = price;
  // Добавим шаблон в тело таблицы
  tbody.appendChild(clone);
};

// При нажатии на кнопку вызывае функцию createElement и передаем значения, необходимые ей
button.addEventListener("click", () => {
  createElement(["2", "Заточка когтей", "Грумер", "300 руб."]);
});
