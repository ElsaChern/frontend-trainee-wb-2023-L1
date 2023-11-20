// Задача 17:
// Необходимо реализовать простое поле ввода адреса с функцией геокодинга:
// пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper),
// подбирается адрес. Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.
// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

// Решение:

// Сперва находим необходимые элементы: поле ввода, кнопку поиска, варианты адресов и поле для ошибки (если ввод некорректен):
const input = document.querySelector("#address");
const searchBtn = document.querySelector("#search");
const addressOptions = document.querySelector("#options");
const noOptions = document.querySelector(".error");

// По документации dadata.ru создаем функцию getOptions, которая в качестве результата (result) вернет массив объектов с подходящими адресами
const getOptions = async (str) => {
  const url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const token = "6b0013c429d24f1f3389d8ff5bc7b5908d913080";

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({ query: str }),
  };

  return (
    fetch(url, options)
      .then((response) => response.json())
      // в качестве результата (result) нам нужен только массив объектов, поэтому берем result.suggestions
      .then((result) => result.suggestions)
      .catch((error) => console.log("error", error))
  );
};

// debounce() — это функция, которая «откладывает» вызов другой функции до того момента, когда с последнего вызова пройдёт определённое количество времени.
// В качестве аргументов передадим функцию, которую нужно «отложить» и интервал времени, спустя который функцию следует вызывать.
const debounce = (func, delay) => {
  // Как результат возвращаем другую функцию.
  //  Если функция будет вызвана снова, тайм-аут будет сброшен, и вызов функции будет отложен.
  let timeout;
  return function () {
    // Хранение контекста вызова функции
    const context = this;
    // Сохранение аргументов функции
    const args = arguments;
    // Если существует уже запущенный timeout - очищаем его...
    clearTimeout(timeout);
    // ...и устанавливаем по-новой
    // Когда время ожидания завершиться, выполнится переданная функция с сохраненным контекстом, аргументами и числовым значением таймера
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

// throttle() — это функция, которая вызывает другую функцию, «пропуская» некоторые вызовы с определённой периодичностью.
// В качестве аргументов передадим функцию, которую нужно вызвать и интервал времени, с которым следует пропускать вызовы.
const throttle = (func, timeout) => {
  // Таймер будет определять, надо ли нам пропускать текущий вызов.
  let timer = null;
  // Как результат возвращаем другую функцию.
  return function perform(...args) {
    // Если таймер есть, то функция уже была вызвана, и значит новый вызов следует пропустить.
    if (timer) return;
    // Если таймера нет, значит мы можем вызвать функцию:
    timer = setTimeout(() => {
      // Аргументы передаём неизменными в функцию-аргумент:
      func(...args);
      // По окончании очищаем таймер:
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
};

// Прописываем функцию для случая, когда пользователь вводить что-то в инпут и нам нужно получить массив подходящих адресов
const inputHandler = async () => {
  // Берем значение текущего инпута
  const inputText = input.value;
  // Обращаемся к серверу и записываем результат-массив в переменную
  const optionsList = await getOptions(inputText);
  // А затем, передаем переменную в функцию, для отрисовки пунктов списка адресов
  showOptions(optionsList);
};

// Слушатели событий для ввода в инпут
input.addEventListener("input", debounce(inputHandler, 450));
input.addEventListener("input", throttle(inputHandler, 450));

// Функция, для отрисовки пунктов списка, в которую приходит массив объектов
const showOptions = (optionsArr) => {
  // Очищаем список адресов перед каждым новым запросом
  addressOptions.innerHTML = "";
  addressOptions.style.background = "none";
  // Если массив пустой, но в поле инпута что-то введено - значит ввод некорректен
  // В таком случае, нужно сообщить об этом пользователю (отобразить подсказку)
  !optionsArr.length && input.value
    ? (noOptions.style.display = "block")
    : (noOptions.style.display = "none");

  // В ином случае, проходим циклом по каждому объекту в массиве
  for (let option of optionsArr) {
    addressOptions.style.background = "rgba(255, 255, 255)";
    // Создаем элемент списка
    const optionElement = document.createElement("li");
    // Берем для его содержания value
    optionElement.textContent = option.value;
    // И записываем каждый из них в родительский элемент ul
    addressOptions.appendChild(optionElement);
    // Добавляем обработчик события click для каждого элемента списка
    optionElement.addEventListener("click", () => {
      // Таким образом изменяем содержание инпута на текст выбраного элемента
      input.value = optionElement.textContent;
      // И скрываем список адресов
      addressOptions.innerHTML = "";
      addressOptions.style.background = "none";
    });
  }
};

// Добавляем обработчик события click на кнопку "поиск"
searchBtn.addEventListener("click", (e) => {
  // Предотвращение перезагрузки всей страницы
  e.preventDefault();
  // Вывод alert для пользователя
  input.value === ""
    ? alert(`Выберите адрес из списка`)
    : alert(`Выбран ${input.value}`);
});
