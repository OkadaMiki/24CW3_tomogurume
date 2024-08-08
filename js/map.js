function initMap() {
    // 地図の中心を設定
    const location = { lat: 34.707019092306, lng: 135.50543410838 }; // 東京の緯度と経度
    // 地図を表示
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: location,
        disableDefaultUI: true,
    });
    // マーカーを表示
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}
