// Задача 2:
// Напишите функцию, которая принимает число и возвращает true, если это число является странным, и false в противном случае.
// Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя.

// Решение:

const isNumberStrange = (num) => {
  // Исключения
  if (num <= 1) {
    return false;
  }
  let sumDivider = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sumDivider += i;
      if (i * i !== num) {
        sumDivider += num / i;
      }
    }
  }
  if (num === sumDivider) {
    return true;
  } else {
    return false;
  }
};

console.log(isNumberStrange(6));
console.log(isNumberStrange(30));
console.log(isNumberStrange(496));
