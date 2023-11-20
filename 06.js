// Задча 6:
// Задача о сортировке объектов:
// у вас есть массив объектов вида { name: 'John', age: 25 }.
// Напишите код, который сортирует этот массив по возрастанию возраста,
// а при равных возрастах сортирует по алфавиту по полю name.

// Решение:

const sortArray = (arr) => {
  return arr.sort((a, b) => {
    if (a.age === b.age) {
      return a.name < b.name ? 1 : -1;
    }
    return a.age > b.age ? 1 : -1;
  });
};

sortArray(
  (array = [
    { name: "John", age: 25 },
    { name: "Rick", age: 13 },
    { name: "Morty", age: 46 },
    { name: "Martin", age: 63 },
    { name: "Jack", age: 46 },
    { name: "Kit", age: 11 },
  ]),
);
