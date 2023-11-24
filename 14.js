// Задача 14:
// Задача на промисы:
// напишите функцию, которая принимает URL изображения и возвращает промис, который разрешается с данными об изображении,
// когда оно загружено. Когда говорится "промис разрешается с данными об изображении", это означает,
// что промис должен быть успешно выполнен (resolved) с данными об изображении после того, как изображение будет загружено.

// Решение:

const loadImg = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Картинка не заргужена");
    }
    console.log("Картинка заргужена");
  } catch (error) {
    console.log("Возникла проблема при загрузке изображения: ", error.message);
  }
};

loadImg("https://www.imgonline.com.ua/examples/bee-on-daisy.jpg");

// fetch("https://www.imgonline.com.ua/examples/bee-on-daisy.jpg").then(
//   (response => {
//   }),
// );

// // Функция, которая принимает URL изображения
// const loadImg = (url) => {
//   // Она возвращает промис, с аргументами resolve и reject
//   return new Promise((resolve, reject) => {
//     // Конструктор Image() создаёт новый экземпляр HTMLImageElement. Аналогичен document.createElement ('img').
//     const img = new Image();
//     // Браузер позволяет отслеживать загрузку сторонних ресурсов: скриптов, ифреймов, изображений и др.
//     // Событие load срабатывает после того, как скрипт был загружен и выполнен.
//     img.onload = () => {
//       resolve(img);
//     };
//     // Ошибки, которые возникают во время загрузки, могут быть отслежены с помощью события error.
//     img.onerror = () => {
//       reject(img);
//     };
//     img.src = url;
//   });
// };
