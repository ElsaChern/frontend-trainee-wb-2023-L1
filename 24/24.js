// Задача 24:
// Разработайте страницу, отображающую таблицу с данными.
// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)

// Решение:

// Сперва находим необходимые элементы: тело таблицы (куда помещать инф-ию) и контейнер пагинации таблицы
const table = document.querySelector(".table");
const tableBody = document.querySelector(".table-body");
const pagination = document.querySelector(".pagination-wrapper");
const loading = document.querySelector(".loading");
const nextPage = document.querySelector(".next-page");
const prevPage = document.querySelector(".prev-page");
const rowsPerPage = 50;
let currentPage = 1;
let maxPage = 1;

// Создадим переменную, в которой мы будем хранить все данные полученные с сервера:
let tableData = []; // (1000) [{…}, {…}, {…}, {…}, …]
let sortedData = [];

// Запишем в переменную ссылку по которой будем извлекать данные
const url =
  "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true";

// И созданим функцию для получения данных таблицы
const featchTableData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    tableData = data;
    sortedData = tableData;
  } catch (error) {
    (error) => console.log("error", error);
  }
};

const goToPage = (page) => {
  nextPage.disabled = page === maxPage ? true : false;
  prevPage.disabled = page === 1 ? true : false;

  currentPage = page;
  addDataToTable();
};

prevPage.addEventListener("click", () => goToPage(currentPage - 1));
nextPage.addEventListener("click", () => goToPage(currentPage + 1));

const headers = document.querySelectorAll("th");
headers.forEach((header) => {
  let upBtn = header.querySelector(".ascendingOrder");
  let downBtn = header.querySelector(".descendingOrder");
  let rowToSort = header.dataset.sort;

  upBtn.addEventListener("click", () => sortData(1));
  downBtn.addEventListener("click", () => sortData(-1));

  const sortData = (coef) => {
    sortedData = tableData.sort((a, b) => {
      return a[rowToSort] > b[rowToSort] ? 1 * coef : -1 * coef;
    });

    goToPage(1);
  };
});

// Добавим данные в таблицу
const addDataToTable = () => {
  tableBody.innerHTML = "";
  let startIndex = (currentPage - 1) * rowsPerPage;
  let paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);
  // Проходим по каждому элементу массива с данными
  paginatedData.forEach((row) => {
    // создаем новую строку для каждого элемента
    const newRow = document.createElement("tr");
    // в каждую строку добавляем ячейку с данными
    newRow.innerHTML = `
        <td>${row.fname}</td>
        <td>${row.lname}</td>
        <td>${row.tel}</td>
        <td>${row.address}</td>
        <td>${row.city}</td>
        <td>${row.state}</td>
        <td>${row.zip}</td>
    `;
    // помещаем все строки в тело таблицы
    tableBody.appendChild(newRow);
  });
};

// Чтобы вызвать функцию при загрузке страницы, нужно объекту window добавить событие load.
// Событие сработает, когда браузер загрузит HTML-код, построит DOM-дерево и подгрузит все внешние ресурсы.
window.addEventListener("load", async () => {
  loading.style.display = "block";
  await featchTableData();
  maxPage = Math.ceil(tableData.length / rowsPerPage);
  goToPage(1);
  loading.style.display = "none";
  table.style.display = "block";
  pagination.style.display = "flex";
});
