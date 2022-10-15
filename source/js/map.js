const createMap = () => {
  const map = L.map("map").setView(
    {
      lat: 59.96844,
      lng: 30.31732,
    },
    17
  );

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const customMarker = L.icon({
    iconUrl: "./img/custom-marker-icon.svg",
    iconSize: [38, 50],
    iconAnchor: [19, 52],
  });

  const marker = L.marker(
    {
      lat: 59.96831,
      lng: 30.31748,
    },
    {
      icon: customMarker,
    }
  );

  marker.addTo(map);

  marker.bindPopup("Приветики");
  marker.on("moveend", (evt) => {
    console.log(evt.target.getLatLng());
  });
};

export { createMap };
