kakao.maps.load(function () {
  const mapContainer = document.getElementById('map');

  const mapOption = {
    center: new kakao.maps.LatLng(36.8151, 127.1139),
    level: 13
  };

  const map = new kakao.maps.Map(mapContainer, mapOption);
});
