//var map = new L.Map('map', {zoom: 10, center: new L.latLng([13.758528,100.504667]) });
//map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));	//base layer
//map.locate({setView: true, maxZoom: 16});

var API_KEY = 'b53b3acef8808a2c0e5fea3c69912e4b';

var osm_default = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?highway=path');
var osm_stamen = new L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png');
var osm_transport = new L.tileLayer('http://b.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png');
var osm_skobbler = new L.tileLayer('http://tiles2-b53b3acef8808a2c0e5fea3c69912e4b.skobblermaps.com/TileService/tiles/2.0/010011101/0/{z}/{x}/{y}.png');

var circle_layer = L.layerGroup();
var route_layer = L.layerGroup();
var badRoute_layer = L.layerGroup();
var turningPoint_layer = L.layerGroup();


var map = L.map('map', {
    layers: [osm_default,circle_layer,route_layer,badRoute_layer,turningPoint_layer],
    center: [14.069282, 100.606407], //SIIT :) ,
    zoom: 15
}),drawnItems = L.featureGroup().addTo(map);

var baseMaps = {
    "Default": osm_default,
    "Stamen": osm_stamen,
    "Transport" :osm_transport,
    "Skobbler" : osm_skobbler,
};

var overlayMaps = {
    "Position": circle_layer,
    "ROUTE" : route_layer,
    "Truning Point" : turningPoint_layer,
    "Caution" : badRoute_layer
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


//////  ROUTING  /////////
//http://b53b3acef8808a2c0e5fea3c69912e4b.tor.skobbler.net/tor/RSngx/calcroute/json/20_5/en/b53b3acef8808a2c0e5fea3c69912e4b?start=46.5472,24.5615&dest=46.5447,24.5607&profile=pedestrian&advice=yes



