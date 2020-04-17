// https://openlayers.org/en/latest/doc/quickstart.html
window.onload = init;
let map;

function init() {
    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: [2868946.4077914595, 8125684.628010539],
            zoom: 5
        })
    });
    map.on('click', function (e) {
        let coordinates = e.coordinate;
        let transformed = ol.proj.transform([coordinates[0], coordinates[1]], 'EPSG:3857', 'EPSG:4326');
        let latitude = parseFloat(transformed[1]);
        let longitude = parseFloat(transformed[0]);
        if (longitude > 180) {
            while (longitude > 180) {
                longitude -= 180;
            }
        } else if (longitude < -180) {
            while (longitude < -180) {
                longitude += 180;
            }
        }
        coordinateFromMap(latitude, longitude);
    });
}

function moveTo(latitude, longitude) {
    map.getView().setCenter(ol.proj.fromLonLat([longitude, latitude]));
}