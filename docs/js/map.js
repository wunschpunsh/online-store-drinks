const createMap=()=>{const t=L.map("map").setView({lat:59.96844,lng:30.31732},17);L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(t);const o=L.icon({iconUrl:"./img/custom-marker-icon.svg",iconSize:[38,50],iconAnchor:[19,52]}),e=L.marker({lat:59.96831,lng:30.31748},{icon:o});e.addTo(t),e.bindPopup("Приветики"),e.on("moveend",(t=>{console.log(t.target.getLatLng())}))};export{createMap};