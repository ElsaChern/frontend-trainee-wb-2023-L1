// Задача 22:
// Посчитайте сколько раз можно вызвать функцию document.write() внутри document.write(). Объясните результат.

// Решение:
// Теория: document.write вставляет HTML-код на страницу сразу после себя.
// Точнее говоря, сразу после тега <script>, внутри которого он расположен.
// И только в том случае, если документ еще не был загружен полностью.

// Так как нам нужно вызвать document.write() внутри document.write() попробуем передать в записанный у html скрипт еще одну такую же строку
// Тем самым получим рекурсию

// const repeatWrite = () => {
//   document.write(repeatWrite());
// };

// repeatWrite();

// В консоле увидим ошибку, "Uncaught RangeError: Maximum call stack size exceeded" - наш стэк переполнился
// Чтобы подсчитать через сколько вызовов он переполнился - заведем переменную count

let count = 0;

const repeatWrite = () => {
  try {
    document.write();
    count++;
    repeatWrite();
  } catch (error) {
    // Получим, что document.write() был вызван 9668 раз или 8976 ??
    document.write(`<span>document.write() был вызван ${count} раз</span>`);
  }
};

repeatWrite();

//
