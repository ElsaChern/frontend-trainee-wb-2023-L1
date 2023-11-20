// Задача 23:
// Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля.
// Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах.
// Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.

// // Решение № 1:

// Сперва находим необходимые элементы: поле ввода, шкалу пароля, и поле для подсказки пользователю (если пароль некорректен):
const form = document.querySelector("#form");
const passwordInput = document.querySelector("#password");
const passwordScale = document.querySelector("#scale");
const tooltip = document.querySelector(".tooltip");
const tooltipLength = document.querySelector("#length");
const tooltipSymbol = document.querySelector("#symbol");
const tooltipUpLetter = document.querySelector("#up_letter");
const tooltipLowLetter = document.querySelector("#low_letter");
const tooltipNumber = document.querySelector("#number");
const goodPassword = document.querySelector("#good_pass");

// Создадим переменные, отвечающие за наличие символов, чисел и букв в разных регистрах:
const lowerLetters = /[a-zа-я]/; // Буквы в нижнем регистре
const upLetters = /[A-ZА-Я]/; // Буквы в верхнем регистре
const digits = /[0-9]/; // Цифры
const specials = /[$&+,:;=?@#|'<>.^*()%!-]/; // Спецсимволы

const checkPasswordHandler = (str) => {
  // Обнулим шкалу надежности пароля
  passwordScale.value = 0;
  // Наш пароль должен содержать не менее 8 символов - проверим аргумент функции на длину:
  if (str.length > 8) {
    passwordScale.value += 20;
    tooltipLength.style.display = "none";
  } else {
    tooltipLength.style.display = "block";
  }
  // Пароль должен содержать как минимум один спец символ
  if (specials.test(str)) {
    passwordScale.value += 20;
    tooltipSymbol.style.display = "none";
  } else {
    tooltipSymbol.style.display = "block";
  }
  // Пароль должен содержать как минимум одну цифру
  if (digits.test(str)) {
    passwordScale.value += 20;
    tooltipNumber.style.display = "none";
  } else {
    tooltipNumber.style.display = "block";
  }
  // Пароль должен содержать как минимум одну букву в верхнем регистре
  if (upLetters.test(str)) {
    passwordScale.value += 20;
    tooltipUpLetter.style.display = "none";
  } else {
    tooltipUpLetter.style.display = "block";
  }
  // И в нижнем регистре
  if (lowerLetters.test(str)) {
    passwordScale.value += 20;
    tooltipLowLetter.style.display = "none";
  } else {
    tooltipLowLetter.style.display = "block";
  }
  if (passwordScale.value === 100) {
    goodPassword.style.display = "block";
  } else {
    goodPassword.style.display = "none";
  }
};

// Чтобы предотвратить перезагрузку страницы при отправке формы (нажатии enter):
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Добавим обработчик события на инпут:
passwordInput.addEventListener("input", () => {
  const passwordText = passwordInput.value;
  checkPasswordHandler(passwordText);
});

// Решение № 2:

// // Чтобы предотвратить повторения в функции выше:
// const checkPasswordHandler = (str) => {
//   passwordScale.value = 0;
//   // Можно создать массив объектов, в котором мы пропишем все условия в качестве ключ = значение
//   // и добавим htmlElement, который соответсвует данному условию
//   let rules = [
//     {
//       isChecked: str.length > 8,
//       htmlElemet: document.querySelector("#length"),
//     },
//     {
//       isChecked: digits.test(str),
//       htmlElemet: document.querySelector("#number"),
//     },
//     {
//       isChecked: specials.test(str),
//       htmlElemet: document.querySelector("#symbol"),
//     },
//     {
//       isChecked: upLetters.test(str),
//       htmlElemet: document.querySelector("#up_letter"),
//     },
//     {
//       isChecked: lowerLetters.test(str),
//       htmlElemet: document.querySelector("#low_letter"),
//     },
//   ];

//   rules.forEach((rule) => {
//     if (rule.isChecked) {
//       rule.htmlElemet.style.display = "none";
//       passwordScale.value += 20;
//     } else {
//       rule.htmlElemet.style.display = "block";
//     }
//     if (passwordScale.value === 100) {
//       goodPassword.style.display = "block";
//     } else {
//       goodPassword.style.display = "none";
//     }
//   });
// };

// // Добавим обработчик события на инпут:
// passwordInput.addEventListener("input", () => {
//   const passwordText = passwordInput.value;
//   checkPasswordHandler(passwordText);
// });
