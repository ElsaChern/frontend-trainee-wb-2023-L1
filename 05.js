// Задача 5:
// Разработайте функцию преобразования JSON в связный список.
// На входе функция должна получать JSON, содержащий список объектов, на выходе объект,
// представляющий из себя односвязный список.

// Решение:

// Теория: Связанный список — это линейная структура данных, похожая на массив.
// Однако, в отличие от массивов, элементы не хранятся в определенном месте памяти или индексе.
// Скорее, каждый элемент представляет собой отдельный объект, содержащий указатель или ссылку на следующий объект в этом списке.

// Каждый элемент (узел) содержит два элемента: хранимые данные и ссылку на следующий узел.
// Можно реализовать узел списка в JavaScript следующим образом:
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
// Функция принимает JSON
const jsonToLinkedList = (jsonString) => {
  //  JSON.parse конвертирует json в объект
  const obj = JSON.parse(jsonString);
  console.log(obj);
  let head = null;
  // tail - конец, чтобы понимать куда добавлять новый элемент
  let tail = null;

  // Проходим циклом по ключам объекта
  for (const key in obj) {
    const newNode = new Node({ key: key, value: obj[key] });
    console.log(newNode);
    // Если head пустой, то это значит что у нас список пустой, добавляем экземпляр класса Node к head и tail
    if (!head) {
      head = newNode;
      tail = newNode;
    } else {
      // При определении tail.next = newNode, мы добавляем ссылку на след. элемент
      tail.next = newNode;
      // При tail = newNode, мы переходим к следующему элементу, то есть перешли к ссылки которую добавили
      tail = newNode;
    }
  }
  // Возвращаем head, чтобы иметь возможность от начала до конца пройти по списку
  return head;
};

const jsonString = '{"key1": "value1", "key2": "value2", "key3": "value3"}';
const linkedList = jsonToLinkedList(jsonString);

console.log(linkedList);
