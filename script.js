kakao.maps.load(function () {
  const mapContainer = document.getElementById('map');

  const mapOption = {
    center: new kakao.maps.LatLng(36.8151, 127.1139),
    level: 13
  };

  const map = new kakao.maps.Map(mapContainer, mapOption);

  let campings = JSON.parse(localStorage.getItem('campings')) || [];

  function saveCampings() {
    localStorage.setItem('campings', JSON.stringify(campings));
  }

  function drawCamping(camp) {
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
        방문일:<br>
        ${camp.visits.join('<br>')}
      </div>
    `;

    const infoWindow = new kakao.maps.InfoWindow({
      content: infoContent
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
    });
  }

  campings.forEach(drawCamping);

  kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    const latlng = mouseEvent.latLng;

    const name = prompt('캠핑장 이름을 입력해줘');
    if (!name) return;

    const visitDate = prompt('방문일을 입력해줘. 예: 2026-06-08');
    if (!visitDate) return;

    const newCamping = {
      name: name,
      lat: latlng.getLat(),
      lng: latlng.getLng(),
      visits: [visitDate]
    };

    campings.push(newCamping);
    saveCampings();
    drawCamping(newCamping);
  });
});
