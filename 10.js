// Задача 10:
// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

// Решение:
// В функцию будет приходить строка
function JSONParser(jstring) {
  // определяем тип для значения по первому символу пришедшей строки
  if (jstring[0] === '"') return jstring.slice(1, jstring.length - 1);
  if (jstring[0] === "t") return true;
  if (jstring[0] === "f") return false;
  if (jstring[0] === "n") return null;
  // Числа могут быть отрицательными, поэтому есть проверка на минус
  if (
    jstring[0] === "-" ||
    (jstring.charCodeAt() >= 48 && jstring.charCodeAt() <= 57)
  )
    return Number(jstring);
  if (jstring[0] === "[" || jstring[0] === "{")
    return parseArrayAndObject(jstring);
}

// Стэк, куда мы будем складывать объекты выше и понимать, закончился ли массив/объект/строка или нет
const stack = [];

// Функция для обработки массивов и объектов
function parseArrayAndObject(jstring) {
  // По первому символу проверяем, в строке лежит объект или массив и определяем начальное значение для результата
  const output = jstring[0] === "{" ? {} : [];
  let key, val;
  // Если длина пришедшей строки меньше 3 (равна 2), то значит, что мы получили пустой массив/объект
  if (jstring.length < 3) return output;

  // Убираем из нашей строки крайние скобки, так как обрабатывать будем только содержимое
  const valueStr = jstring.slice(1, jstring.length - 1);

  // Вспомогательный индекс для обрезания пришедшей строки на подстроки
  let startIndex = 0;

  for (let i = 0; i <= valueStr.length; i++) {
    // Если мы встречаем экранированные кавычки, то мы их пропускаем, чтобы не пушить в стек лишнее
    if (valueStr[i] === "\\" && valueStr[i + 1] === '"') {
      i++;
      continue;
    }
    // тут происходит обработка "хитрых" случаев с вложением скобок и кавычек типа '[["a","b"],["["],[]]'
    // Если последний символ в стеке - открывающая скобка, а текущий символ - парная ему закрывающаяся скобка
    if (
      (valueStr[i] === "]" && stack[stack.length - 1] === "[") ||
      (valueStr[i] === "}" && stack[stack.length - 1] === "{") ||
      // или последний символ в стеке и текущий символ - кавычки
      (valueStr[i] === '"' && stack[stack.length - 1] === valueStr[i])
    ) {
      // мы выбрасываем последний символ из стэка
      stack.pop();
    }
    // Если текущий символ - кавычки, или открывающаяся скобка и последний символ в стэке не кавычка
    else if (
      (valueStr[i] === "[" || valueStr[i] === "{" || valueStr[i] === '"') &&
      stack[stack.length - 1] !== '"'
    ) {
      // Мы пушим символ в стэк
      stack.push(valueStr[i]);
    }
    // Объект
    if (jstring[0] === "{") {
      // Если у нас нет незакрытых скобок и кавычек
      if (!stack.length) {
        // Если текущий символ - двоеточие, то мы нашли ключ
        if (valueStr[i] === ":") {
          key = JSONParser(valueStr.slice(startIndex, i));
          startIndex = i + 1;
        }
        // Если текущий символ - запятая или мы дошли до конца строки, то мы нашли значение
        if (valueStr[i] === "," || i === valueStr.length) {
          val = JSONParser(valueStr.slice(startIndex, i));
          startIndex = i + 1;
          // Записываем найденную пару в итоговый объект
          output[key] = val;
        }
      }
      // Массив
    } else {
      // Если у нас нет незакрытых скобок и кавычек И текущий символ - запятая, либо мы дошли до конца строки
      if ((!stack.length && valueStr[i] === ",") || i === valueStr.length) {
        // Парсим полученный символ массива
        const curVal = JSONParser(valueStr.slice(startIndex, i));
        // Добавляем его в итоговый массив
        output.push(curVal);
        // Переходим к следующему символу
        startIndex = i + 1;
      }
    }
  }
  return output;
}

// Пример:
const example =
  '{"number":53,"string":"hello","boolean":true,"null":null,"object":{"foo":"bar"},"array":[53,"hello",null,true,null,null,{"foo":"bar"},"1995-12-17T00:24:00.000Z"],"date":"1995-12-17T00:24:00.000Z"}';
console.log(JSONParser(example));
