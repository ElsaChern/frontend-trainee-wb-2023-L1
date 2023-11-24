// Задача 19:
// Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много).
// Виджет должен иметь фиксированные размеры и возможность прокрутки.
// При прокрутке содержимого виджета до конца должны подгружаться новые посты.
// Необходимо реализовать возможность кэширования уже загруженных данных: если пользователь закрыл страницу,
// а потом снова открыл ее, виджет должен отображать все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).
// При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.

// Решение:
// Примечание: обход CORS в данном задании реализован через расширение Allow CORS: Access-Control-Allow-Origin в браузере
// Найдем контейнер для постов, контейнер виджета и сообщение о загрузке на странице:
const mainContauner = document.querySelector(".container");
const postsContainer = document.querySelector(".content");
const loading = document.querySelector(".loading");

// Заведем необходымые переменные для работы с vk api
const token =
  "6a8515606a8515606a85156024699370cc66a856a8515600fdb61c31ecd16c5fc22a0dd";
const domain = "we_use_js";
const groupID = 66084425;
let offset = 1;
const count = 5;
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let postsToRender = [];
let group = JSON.parse(localStorage.getItem("group")) || {};

// Функция для получения информации о группе:
const getGroup = async () => {
  const url =
    `https://api.vk.com/method/groups.getById?` +
    `access_token=${token}&` +
    `group_id=${groupID}&` +
    `v=5.199`;

  if (Object.keys(group).length !== 0) {
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    group = data.response.groups[0];
    localStorage.setItem("group", JSON.stringify(group));
  } catch (error) {
    (error) => console.log("error", error);
  }
};

// Функция для получения информации о постах группы:
const getPosts = async () => {
  const url =
    `https://api.vk.com/method/wall.get?` +
    `access_token=${token}&` +
    `domain=${domain}&` +
    `offset=${offset}&` +
    `count=${count}&` +
    `v=5.199`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    postsToRender = data.response.items;
    posts.push(...postsToRender);
    offset += 5;
    localStorage.setItem("posts", JSON.stringify(posts));
  } catch (error) {
    (error) => console.log("error", error);
  }
};

// Чтобы предотвратить отправку нескольких запросов на сервер подряд при скролле, воспользуемся debounce
// Скопировала уже написанную функцию debounce из задания 17
const debounce = (func, delay = 500) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

// По скролу рассчитывается расстояние до нижней границы виджета
mainContauner.addEventListener(
  "scroll",
  debounce(async () => {
    // Формула: (вся высота) минус (часть, прокрученная сверху) минус (видимая часть) – результат соответствует размеру прокрутки снизу (learn.javascript.ru).
    let scrollBottom =
      mainContauner.scrollHeight -
      mainContauner.scrollTop -
      mainContauner.clientHeight;
    if (scrollBottom < 5) {
      await getGroup();
      await getPosts();
      renderPosts();
    }
  }),
);

// Функция по отрисовке постов
const renderPosts = async () => {
  postsToRender.forEach((item) => {
    const post = document.createElement("div");
    post.classList.add("post");
    const description = document.createElement("div"); // контейнер где картинка, заголовок и дата
    description.classList.add("description");
    const groupImgBox = document.createElement("div"); // контейнер для картинки группы
    groupImgBox.classList.add("img-container");
    const groupImg = document.createElement("img"); // сама картинка
    const titleBox = document.createElement("div"); // контейнер для заголовка
    titleBox.classList.add("title");
    const groupTitle = document.createElement("p"); // здесь заголовок
    groupTitle.classList.add("group-title");
    const data = document.createElement("p"); // а тут дата поста
    data.classList.add("data");
    const postText = document.createElement("p");
    postText.classList.add("post-text");
    const imgGroup = document.createElement("div");
    imgGroup.classList.add("img-group");

    groupTitle.innerHTML = group.name;
    titleBox.appendChild(groupTitle);
    groupImg.src = group.photo_50;
    description.appendChild(titleBox);
    groupImgBox.appendChild(groupImg);
    description.appendChild(groupImgBox);
    post.appendChild(description);

    // Данные времени переданы в формате unix timestamp
    // Чтобы конвертировать их в читаемую дату, c помощью встроенного объекта Date можно легко конвертировать Unix-время в формат даты и времени.
    // Для этого unix умножается на 1000, чтобы преобразовать время из секунд в миллисекунды
    // Далее, используем метод toLocaleDateString(), чтобы локализировать дату
    let dataDate = new Date(item.date * 1000).toLocaleDateString("ru", {
      day: "numeric",
      month: "long",
    });
    // А также, локализировать время
    let dataTime = new Date(item.date * 1000).toLocaleTimeString("ru", {
      hour: "numeric",
      minute: "numeric",
    });
    data.innerHTML = `${dataDate} в ${dataTime}`;
    titleBox.appendChild(data);
    description.appendChild(titleBox);
    postText.innerHTML = item.text;
    post.append(postText);

    item.attachments.forEach((attachment) => {
      if (attachment.type === "photo") {
        const newImg = document.createElement("img");
        newImg.src = attachment?.photo?.sizes[2].url;
        imgGroup.appendChild(newImg);
        post.appendChild(imgGroup);
      }
    });
    postsContainer.append(post);
  });
};

const initialize = async () => {
  loading.style.display = "block";

  await getGroup();

  if (posts.length === 0) {
    await getPosts();
  } else {
    postsToRender = posts;
  }

  renderPosts();

  loading.style.display = "none";
};

initialize();
