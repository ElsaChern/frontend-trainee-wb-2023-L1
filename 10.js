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
  // числа могут быть отрицательными, поэтому есть проверка на минус
  if (
    jstring[0] === "-" ||
    (jstring.charCodeAt() >= 48 && jstring.charCodeAt() <= 57)
  )
    return Number(jstring);
  if (jstring[0] === "[" || jstring[0] === "{")
    return parseArrayAndObject(jstring);
}

// стэк, куда мы будем складывать объекты выше и понимать, закончился ли массив/объект/строка или нет
const stack = [];

// функция для обработки массивов и объектов
function parseArrayAndObject(jstring) {
  // по первому символу проверяем, в строке лежит объект или массив и определяем начальное значение для результата
  const output = jstring[0] === "{" ? {} : [];

  // если длина пришедшей строки меньше 3 (равна 2), то значит, что мы получили пустой массив/объект
  if (jstring.length < 3) return output;

  // убираем из нашей строки крайние скобки, так как обрабатывать будем только содержимое
  const valueStr = jstring.slice(1, jstring.length - 1);

  // вспомогательный индекс для обрезания пришедшей строки на подстроки
  let startIndex = 0;

  for (let i = 0; i <= valueStr.length; i++) {
    //  если мы встречаем экранированные кавычки, то мы их пропускаем, чтобы не пушить в стек лишнее
    if (valueStr[i] === "\\" && valueStr[i + 1] === '"') {
      i++;
      continue;
    }
    // тут происходит обработка "хитрых" случаев с вложением скобок и кавычек типа '[["a","b"],["["],[]]'
    // если последний символ в стеке - открывающая скобка, а текущий символ - парная ему закрывающаяся скобка
    if (
      (valueStr[i] === "]" && stack[stack.length - 1] === "[") ||
      (valueStr[i] === "}" && stack[stack.length - 1] === "{") ||
      // или последний символ в стеке и текущий символ - кавычки
      (valueStr[i] === '"' && stack[stack.length - 1] === valueStr[i])
    ) {
      // мы выбрасываем последний символ из стэка
      stack.pop();
    }
    // а если текущий символ - кавычки, или открывающаяся скобка и последний символ в стэке не кавычка
    else if (
      (valueStr[i] === "[" || valueStr[i] === "{" || valueStr[i] === '"') &&
      stack[stack.length - 1] !== '"'
    ) {
      // мы пушим символ в стэк
      stack.push(valueStr[i]);
    }
    // объект
    if (jstring[0] === "{") {
      // если у нас нет незакрытых скобок и кавычек
      if (!stack.length) {
        // если текущий символ - двоеточие, то мы нашли ключ
        if (valueStr[i] === ":") {
          key = JSONParser(valueStr.slice(startIndex, i));
          startIndex = i + 1;
        }
        // если текущий символ - запятая или мы дошли до конца строки, то мы нашли значение
        if (valueStr[i] === "," || i === valueStr.length) {
          val = JSONParser(valueStr.slice(startIndex, i));
          startIndex = i + 1;
          output[key] = val;
        }
      }
      // массив
    } else {
      // если у нас нет незакрытых скобок и кавычек И текущий символ - запятая, либо мы дошли до конца строки
      if ((!stack.length && valueStr[i] === ",") || i === valueStr.length) {
        // парсим полученный символ массива
        const curVal = JSONParser(valueStr.slice(startIndex, i));
        // добавляем его в итоговый массив
        output.push(curVal);
        // переходим к следующему символу
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
// console.log(JSON.parse(example));
// console.log(JSONParser(example) == JSON.parse(example));
