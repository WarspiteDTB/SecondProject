function createNewsItem(inputText) {
  const searchInput = document.getElementById("search");
  const submitButton = document.getElementById("submit-button");

  searchInput.addEventListener("input", function () {
    if (searchInput.value.length > 0) {
      submitButton.removeAttribute("disabled");
      submitButton.style.backgroundColor = "";
      submitButton.style.cursor = "";
      submitButton.style.opacity = "";
    } else {
      submitButton.setAttribute("disabled", "disabled");
      submitButton.style.backgroundColor = "gray";
      submitButton.style.cursor = "not-allowed";
      submitButton.style.opacity = "0.6";
    }
  });
  // Получаем текущую дату и время
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} в ${currentDate.toLocaleTimeString()}`;

  // Создаем новый div-объект
  const newNewsItem = document.createElement("div");
  newNewsItem.classList.add("news_num");

  // Создаем элементы для новости
  const newsItem = document.createElement("div");
  newsItem.classList.add("news_t");

  const newsImage = document.createElement("img");
  newsImage.src = "/img/photo.png";
  newsImage.alt = "";

  const newsTitle = document.createElement("h1");
  newsTitle.classList.add("text");
  newsTitle.textContent = "Городская Среда";

  const newsDate = document.createElement("span");
  newsDate.classList.add("text");
  newsDate.textContent = formattedDate;

  const newsText = document.createElement("div");
  newsText.classList.add("news_tittle", "text");
  newsText.textContent = inputText;

  // Добавляем элементы в новость
  newsItem.appendChild(newsImage);
  newsItem.appendChild(newsTitle);
  newsItem.appendChild(newsDate);
  newNewsItem.appendChild(newsItem);
  newNewsItem.appendChild(newsText);

  // Добавляем новость в контейнер
  const content = document.querySelector(".content");
  content.appendChild(newNewsItem);

  // Очищаем поле ввода
  document.getElementById("search").value = "";
}

// Добавляем обработчик события для кнопки "Поиск"
document
  .querySelector('button[type="submit"]')
  .addEventListener("click", function () {
    const inputText = document.getElementById("search").value;
    createNewsItem(inputText);
  });
