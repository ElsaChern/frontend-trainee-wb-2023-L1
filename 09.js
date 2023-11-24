// Задача 9:
// Реализовать функцию конвертации JSON в строку

// Решение:

// В данную функцию будет приходить значение
const stringifyValue = (value) => {
  // Которое изначально будет равно пустой строке
  let strValue = "";

  // Проверяем данное значение на соответствие типам:
  // Если тип - обьект:
  if (typeof value === "object") {
    // Массив, при переводе в строку отображается в квадратных скобках
    if (Array.isArray(value)) {
      strValue += "[";
      // В случае, если мы имеет более глубокую вложенность - запускаем stringifyValue рекурсивно
      newArr = value.map((arrElement) => stringifyValue(arrElement));

      strValue += newArr.join(",") + "]";
      // null при переводе в строку отображается как "null"
    } else if (value === null) {
      strValue += "null";
      // Дата при переводе в строку отображается специализированно с помощью метода .toISOString()
    } else if (value instanceof Date) {
      strValue += `"${value.toISOString()}"`;
    } else {
      strValue += convertToString(value);
    }
    // Тип строка записывается в кавычках
  } else if (typeof value === "string") {
    strValue += `"${value}"`;
    // symbol и undefined при переводе в строку отображается как "null"
  } else if (typeof value === "undefined" || typeof value === "symbol") {
    strValue += "null";
  } else {
    // Во всех иных случаех производим перевод простым String()
    strValue += String(value);
  }

  return strValue;
};

// Основная функция, куда приходит JSON объект
const convertToString = (object) => {
  // Обозначим переменную str, куда будем постепенно записывать объект
  // Обозначим первоначальное значение как "{"
  let str = "{";

  // Воспользуемся Object.entries, чтобы получить из json массив пар ключ-значение
  const entries = Object.entries(object);
  // Пройдем по каждому полученному массиву,
  entries.forEach((entry) => {
    // обозначив первый элемент массив за ключ, второй за его значение
    let key = entry[0];
    let value = entry[1];
    // Далее, проверим, являются ли значения типом undefined или symbol
    // Если да - мы не будем записывать их в строку
    if (typeof value === "undefined" || typeof value === "symbol") {
      return;
    }
    // К переменную str начнем добавлять данные,
    // Передав каждое значение функции stringifyValue() для валидации
    str += `"${key}":${stringifyValue(value)},`;
  });
  // Проверяем случай когда в обьекте нет данных (или же все данные состоят из типов undefined или symbol)
  if (str !== "{") {
    // Необходимо у последнего элемента убрать ",".
    // Проще всего обрезать строку с помощью .slice
    str = str.slice(0, -1);
  }
  //  и добавить необходимые символы в конце
  str += "}";

  return str;
};

// Пример JSON объекта
const example = {
  number: 53,
  string: "hello",
  symbol: Symbol("foo"),
  boolean: true,
  null: null,
  undefined: undefined,
  object: { foo: "bar" },
  array: [
    53,
    "hello",
    Symbol("foo"),
    true,
    null,
    undefined,
    { foo: "bar" },
    new Date("December 17, 1995 03:24:00"),
  ],
  date: new Date("December 17, 1995 03:24:00"),
};

// Проверка на соответствие методу JSON.stringify()
a = JSON.stringify(example);
b = convertToString(example);
a === b;
