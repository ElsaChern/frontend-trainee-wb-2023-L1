// Задача 3:
// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// вычисление N-го числа в ряду Фибоначчи
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го просто числа
// вычисление всех простых чисел до числа N

// Решение:

const MathX = {
  // Функция для вычисление N-го числа в ряду Фибоначчи

  searchFibonachiRow: (num) => {
    let f = [1, 1];
    for (let i = 2; i <= num; i++) {
      f[i] = f[i - 1] + f[i - 2];
    }
    return f;
  },

  searchFibonachiNum: (num) => {
    fibonachiRow = MathX.searchFibonachiRow(num);

    return fibonachiRow[num];
  },
};

const searchPrimeRow = (num) => {
  // Исключение: отриц. числа, 0 и 1 не является простым числом
  if (num <= 1) return false;

  let arr = [];
  for (let i = 2; i <= num; i++) {
    arr.push(i);
  }
  // Решето Эратосфена
  for (let p = 0; p <= arr.length; p++) {
    let j = 2;
    while (j * arr[p] <= num) {
      let numberToDelete = j * arr[p];
      arr = arr.filter((number) => number !== numberToDelete);
      j++;
    }
  }
  return arr;
};

const searchPrimeNum = (num) => {};

console.log(searchPrimeRow(30));
