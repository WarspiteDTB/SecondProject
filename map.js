var map = L.map("map").setView([47.2095, 38.9359], 13); // Координаты Таганрога
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

var popup = L.popup();

function onMapRightClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent(
      '<form id="markerForm"><label for="issue">Информация о проблеме:</label><br><textarea id="issue" name="issue" rows="4" cols="50"></textarea><br><input type="file" id="fileUpload" name="fileUpload"><br><button type="button" onclick="saveMarker()">Сохранить</button></form>'
    )
    .openOn(map);
}

map.on("contextmenu", onMapRightClick);

var markers = L.layerGroup().addTo(map);

function saveMarker() {
  var formData = new FormData(document.getElementById("markerForm"));
  var lat = popup.getLatLng().lat;
  var lng = popup.getLatLng().lng;

  // Создаем маркер
  var marker = L.marker([lat, lng]).addTo(markers);

  // Добавляем информацию о проблеме к маркеру
  var issueInfo = formData.get("issue");
  var file = formData.get("fileUpload");

  var popupContent = "<p>" + issueInfo + "</p>";
  if (file) {
    popupContent += '<img src="' + URL.createObjectURL(file) + '" width="100">';
  }

  marker.bindPopup(popupContent);

  // Сохраняем данные в localStorage
  var data = {
    lat: lat,
    lng: lng,
    issue: issueInfo,
    file: file ? URL.createObjectURL(file) : null,
    name: "Иван Иванов", // Имя пользователя
  };
  sessionStorage.setItem("markerData", JSON.stringify(data));

  // Закрываем всплывающее окно и очищаем форму
  map.closePopup();
  document.getElementById("markerForm").reset();
}

function renderCard(data) {
  var card = document.createElement("div");
  card.classList.add("card");

  var cardHeader = document.createElement("div");
  cardHeader.classList.add("card_header");

  var cardTitle = document.createElement("h2");
  cardTitle.classList.add("card_title");
  cardTitle.textContent = data.name;

  cardHeader.appendChild(cardTitle);

  var cardBody = document.createElement("div");
  cardBody.classList.add("card_body");

  var cardMessage = document.createElement("p");
  cardMessage.classList.add("card_message");
  cardMessage.textContent = data.issue;

  var cardImage = document.createElement("img");
  cardImage.classList.add("card_image");
  if (data.file) {
    cardImage.src = data.file;
  }

  cardBody.appendChild(cardMessage);
  cardBody.appendChild(cardImage);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);

  document.querySelector(".content").appendChild(card);
}

/*function saveMarker() {
                var formData = new FormData(document.getElementById("markerForm"));
                formData.append("latitude", popup.getLatLng().lat);
                formData.append("longitude", popup.getLatLng().lng);
    
                console.log("Form data:", formData);
                
                map.closePopup();
            }*/
