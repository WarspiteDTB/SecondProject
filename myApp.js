window.onload = function () {
  var markerData = JSON.parse(sessionStorage.getItem("markerData"));

  if (markerData) {
    var app = document.createElement("div");
    app.classList.add("app");

    var appNum = document.createElement("div");
    appNum.classList.add("app_num");

    var appNumImg = document.createElement("div");
    appNumImg.classList.add("app_num_img");

    var appAvatar = document.createElement("img");
    appAvatar.classList.add("appavatar");
    appAvatar.src = "/img/avatar.png";

    appNumImg.appendChild(appAvatar);

    var appNumTittle = document.createElement("div");
    appNumTittle.classList.add("app_num_tittle");

    var appName = document.createElement("h1");
    appName.classList.add("text");
    appName.textContent = "Иван Иванов";

    var appGall = document.createElement("img");
    appGall.classList.add("appgall");
    appGall.src = "/img/appgall.png";

    appNumTittle.appendChild(appName);
    appNumTittle.appendChild(appGall);

    appNum.appendChild(appNumImg);
    appNum.appendChild(appNumTittle);

    var appNumSubtittle = document.createElement("div");
    appNumSubtittle.classList.add("app_num_subtittle");
    appNumSubtittle.classList.add("text");

    var issueText = markerData.issue ? markerData.issue : "Нет текста";
    var fileUrl = markerData.file
      ? '<img src="' + markerData.file + '" width="100">'
      : "";

    appNumSubtittle.innerHTML = "<h3>" + issueText + " " + "</h3>";

    app.appendChild(appNum);
    app.appendChild(appNumSubtittle);

    document.querySelector(".content").appendChild(app);
  }
};
