// Задача 29:
// Задача: Взаимодействие с формами:
// Напишите функцию, которая получает данные из формы на веб-странице и выполняет определенные действия с этими данными,
// например, отправляет их на сервер или отображает всплывающее окно с результатами.

// Решение:

// Найдем элемент формы на странице:
const form = document.querySelector(".feedback-form");

// Создадим функцию, которая внутри себя получает данные из формы и отображает окно alert с результатами
const getFormData = () => {
  let fullnameValue = form.fullname.value;
  let phoneValue = form.phone.value;
  let emailValue = form.email.value;
  if (fullnameValue && phoneValue && emailValue) {
    alert(
      `Имя: ${fullnameValue},
      Номер телефона: ${phoneValue},
      E-mail: ${emailValue}`,
    );
  } else {
    alert("Пожалуйста, заполните форму");
  }
};

form.addEventListener("submit", (e) => {
  // Отменяем перезагрузку страницы
  e.preventDefault();
  getFormData();
});
