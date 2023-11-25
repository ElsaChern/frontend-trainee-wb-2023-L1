// // Задача 12:
// Задача на работу с объектами:
// создайте объект, представляющий собой книгу.
// Объект должен иметь свойства, такие как: название книги, автор и год издания.
// Напишите методы для получения и изменения значений свойств книги.

// Решение:

// Книга, со свойствами: название книги, автор и год издания:
const book = {
  title: "The Google story",
  author: ["David A. Vise", "Mark Malseed"],
  publishedYear: 2005,

  // Для доступа к информации внутри объекта метод использует ключевое слово this.
  // Метод для получения названия книги
  getTitle() {
    return this.title;
  },
  // Метод для изменения названия книги
  changeTitle(newTitle) {
    this.title = newTitle;
  },
  // Метод для получения автора книги
  getAuthor() {
    return this.author;
  },
  // Метод для изменения автора книги
  changeAuthor(newAuthor) {
    this.author = newAuthor;
  },
  // Метод для получения года издания книги
  getYear() {
    return this.publishedYear;
  },
  // Метод для изменения года издания книги
  changeYear(newYear) {
    this.publishedYear = newYear;
  },
};

// Комментарий:
// Технически можно получить доступ к объекту без ключевого слова this.
// К нему можно обратиться через внешнюю переменную (в которой хранится ссылка на этот объект):
// getTitle() { return(book.title) }  То есть использовать "book" вместо "this"
// Однако такой подход будет работать исключительно для объекта "book".
// Если нужно будет скопировать ссылку на другой объект, например, "magazine",
// тогда будет осуществлён доступ к неправильному объекту при вызове метода из "magazine" => приведет к ошибке.

// Проверка получения данных о книге
console.log(book.getTitle());
console.log(book.getAuthor());
console.log(book.getYear());

// Изменения данных о книге
book.changeTitle("The Witcher");
book.changeAuthor("Andrzej Sapkowski");
book.changeYear(1993);

// Проверка измененных данных о книге
console.log(book.getTitle());
console.log(book.getAuthor());
console.log(book.getYear());
