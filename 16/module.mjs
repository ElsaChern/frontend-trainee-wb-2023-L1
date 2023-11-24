// Импортируем библиотеку
import moment from "moment";

// Заведем функцию, которая вернет нам количество дней до Нового Года
const endOfYear = (data) => {
  // Метод moment().endOf() используется для изменения момента, чтобы он был установлен на конец заданной единицы времени.
  const endOfData = moment().endOf(data);
  // .moment() установит текущую дату. Запишем её в переменную
  const now = moment();
  // Далее, найдем разницу между текущим временем и переданной в функцию даты
  const difference = moment.duration(endOfData.diff(now));
  // Получим разницу в днях между двумя датами
  const days = difference.asDays();
  // Вернем результат количества дней, округленный в мельшую сторону (так как речь идет о кол-ве дней)
  return Math.floor(days);
};

export default endOfYear;
