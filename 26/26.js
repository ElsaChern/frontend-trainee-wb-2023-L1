// Задача 26:
// Задача: Рекурсивный обход дерева DOM::
// Напишите функцию, которая рекурсивно обходит дерево DOM, начиная с указанного элемента,
// и выполняет определенное действие с каждым узлом (например, выводить информацию о теге в консоль).

// Решение:
// Функция принимает указанный элемент
const recursiveTraversal = (element) => {
  // И выводит информацию о нем в консоль
  console.log(
    "Тег элемента - ",
    element.tagName,
    "Класс элемента - ",
    element.className ? element.className : "отсутствует",
  );
  // Далее, записываем все дочерние элементы в переменную
  // Примечание: при попытке выбрать дочерние элементы с помощью метода .childNodes мы получим лишние текстовые элементы разметки
  // #text - поэтому ниже использован метод .children
  const childrens = element.children;
  // Проходим по каждому дочернему элементу циклом
  for (let children of childrens) {
    // И вызываем функцию recursiveTraversal уже для кадого их них
    recursiveTraversal(children);
  }
};

const element = document.querySelector("body");
recursiveTraversal(element);
