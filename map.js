var map = L.map('map').setView([47.2095, 38.9359], 13); // Координаты Таганрога
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);
    
            var popup = L.popup();
    
            function onMapRightClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent('<form id="markerForm"><label for="issue">Информация о проблеме:</label><br><textarea id="issue" name="issue" rows="4" cols="50"></textarea><br><input type="file" id="fileUpload" name="fileUpload"><br><button type="button" onclick="saveMarker()">Сохранить</button></form>')
                    .openOn(map);
            }
    
            map.on('contextmenu', onMapRightClick);
    
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
        
                var popupContent = '<p>' + issueInfo + '</p>';
                if (file) {
                    popupContent += '<img src="' + URL.createObjectURL(file) + '" width="100">';
                }
        
                marker.bindPopup(popupContent);
        
                // Закрываем всплывающее окно и очищаем форму
                map.closePopup();
                document.getElementById("markerForm").reset();
            }

            /*function saveMarker() {
                var formData = new FormData(document.getElementById("markerForm"));
                formData.append("latitude", popup.getLatLng().lat);
                formData.append("longitude", popup.getLatLng().lng);
    
                console.log("Form data:", formData);
                
                map.closePopup();
            }*/

