//var map = new L.Map('map', {zoom: 10, center: new L.latLng([13.758528,100.504667]) });
//map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));	//base layer
//map.locate({setView: true, maxZoom: 16});

var osm_default = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var osm_stamen = new L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png');
var osm_transport = new L.tileLayer('http://b.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png');

var circle_layer = L.layerGroup();;

var map = L.map('map', {
    layers: [osm_default,circle_layer],
    center: [14.069282, 100.606407], //SIIT :) ,
    zoom: 12
}),drawnItems = L.featureGroup().addTo(map);

var baseMaps = {
    "Default": osm_default,
    "Stamen": osm_stamen,
    "Transport" :osm_transport
};

var overlayMaps = {
    "Position": circle_layer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);


////////// FUNCTION ////////////////

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);






