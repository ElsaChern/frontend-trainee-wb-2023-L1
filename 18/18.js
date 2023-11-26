// Задача 18:
// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

// Решение:

const maximumVolume = () => {
  // Заведем переменные ключ, значение, которые будем добавлять в localStorage
  let key = "1";
  const value = "v";
  // Перед тем, как запустить цикл, убедимся, что localStorage пуст
  localStorage.clear();
  // Запустим бесконечный цикл
  try {
    while (true) {
      // И на каждой его итерации будем добавлять ключ, значение в localStorage
      localStorage.setItem(key, value);
      // И увеличивать количество символов в ключе на единицу
      key += 1;
    }
    // Когда localStorage переполнится возникнет ошибка
  } catch {
    // Подсчитаем длину заполненного localStorage
    const length = JSON.stringify(localStorage).length;

    localStorage.clear();

    return length;
  }
};

export default maximumVolume;
