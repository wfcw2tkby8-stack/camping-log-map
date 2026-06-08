kakao.maps.load(function () {
  const mapContainer = document.getElementById('map');

  const mapOption = {
    center: new kakao.maps.LatLng(36.8151, 127.1139),
    level: 13
  };

  const map = new kakao.maps.Map(mapContainer, mapOption);

  const campings = [
    {
      name: '괴산 자연드림파크 캠핑장',
      lat: 36.7605,
      lng: 127.8270,
      visits: ['2026.05.03', '2026.05.17', '2026.06.01']
    }
  ];

  campings.forEach(function (camp) {
    const markerPosition = new kakao.maps.LatLng(camp.lat, camp.lng);

    const markerContent = `
      <div class="tent-marker">
        🏕️<span>${camp.visits.length}</span>
      </div>
    `;

    const marker = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content: markerContent,
      yAnchor: 1
    });

    marker.setMap(map);

    const infoContent = `
      <div class="info-window">
        <strong>${camp.name}</strong><br>
        방문횟수: ${camp.visits.length}회<br>
        방문일: ${camp.visits.join(', ')}
      </div>
    `;

    const infoWindow = new kakao.maps.InfoWindow({
      content: infoContent
    });

    kakao.maps.event.addListener(map, 'click', function () {
      infoWindow.close();
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
    });
  });
});
