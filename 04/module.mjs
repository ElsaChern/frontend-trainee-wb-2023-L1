const endingOfWord = (num, forms) => {
  // Падеж необходимо определять в зависимости от последней (последних двух) цифры пришедшего к нам числа, поэтому необходимо её найти
  // Преобразование числа в строку:
  let numToString = num.toString();
  // Определение последней цифры:
  let lastNumber = numToString.slice(-1);
  // Определение предпоследних 2 цифр (для десятков, сотен, тысяч и более):
  let twoLastNumber = numToString.slice(-2);

  // Случай, когда длина числа больше или равна двум и две последние цифры содержат любое окончание числа из массива ["11", "12", "13", "14"]
  if (
    numToString.length >= 2 &&
    ["11", "12", "13", "14"].includes(twoLastNumber)
  ) {
    // Необходимо использовать форму множественного числа родительного падежа
    return `${num} ${forms[2]}`;
  }
  // Случай, когда последняя цифра - 1
  if (lastNumber === "1") {
    // Необходимо использовать форму единственного числа именительного падежа
    return `${num} ${forms[0]}`;
  }
  // Опишем еще один случай, когда последнее число находится в диапазоне чисел: 2,3,4
  if (lastNumber >= "2" && lastNumber <= "4") {
    // Необходимо использовать форму единственного числа родительного падежа
    return `${num} ${forms[1]}`;
  }
  // Наиболее распространенный случай - это использование формы множественного числа родительного падежа
  // Поэтому если число не подходит ни под одно условие выше - оно использует данную форму
  return `${num} ${forms[2]}`;
};

// Экспортируем функцию
export default endingOfWord;
