// Задача 11:
// Задача о замыканиях и области видимости:
// напишите функцию, которая возвращает другую функцию.
// Внутренняя функция должна иметь доступ к переменной, определенной во внешней функции, даже после того,
// как внешняя функция завершила свое выполнение.

// Решение:

function weather() {
  // переменная внешней функции
  let moscow = "rainy";
  // инициализация и возвращение внутренней функции
  return function displayWeather() {
    // здесь происходит запоминание и получение доступа к переменной внешней функции
    console.log(moscow);
  };
}

// Вызываем ф-ю weather, которая ссылается на displayWeather и выводит значение в консоль
let forecast = weather();
// Когда ф-я weather завершится, ее контекст выполнения выкинется из стека, но лексическое окружение останется в памяти,
// так как на него ссылается лексическое окружение его внутренней функции displayWeather
forecast();
