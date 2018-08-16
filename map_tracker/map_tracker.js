/* Sources:
  https://openlayersbook.github.io/ch10-openlayers-goes-mobile/example-02.html
*/

/* Scrolls to the location of the user */

var layer = new ol.layer.Tile({
  source: new ol.source.OSM()
});
// get start location. [lat, lon]
var home = ol.proj.transform([-73.989308, 40.741895], 'EPSG:4326', 'EPSG:3857');
var view = new ol.View({
  center: home,
  zoom: 15
});
var map = new ol.Map({
  target: 'map',
  layers: [layer],
  view: view,
  tileOptions: {crossOriginKeyword: 'anonymous'}
});

// create an Overlay using the div with id location.
var marker = new ol.Overlay({
  element: document.getElementById('location'),
  positioning: 'bottom-left',
  stopEvent: false
});
// add it to the map
map.addOverlay(marker);

// create a Geolocation object setup to track the position of the device
var geolocation = new ol.Geolocation({
  tracking: true
});
// bind the projection to the view so that positions are reported in the
// projection of the view
geolocation.bindTo('projection', view);
// bind the marker's position to the geolocation object, the marker will
// move automatically when the GeoLocation API provides position updates
marker.bindTo('position', geolocation);
// when the GeoLocation API provides a position update, center the view
// on the new position
geolocation.on('change:position', function() {
  var p = geolocation.getPosition();
  console.log(p[0] + ' : ' + p[1]);
  view.setCenter([parseFloat(p[0]), parseFloat(p[1])]);
});


/* POPUP CODE */


var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


/* Create an overlay to anchor the popup to the map.*/
var popup_overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
  popup_overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/**
 * Add a click handler to the map to render the popup.
 */
 map.on('singleclick', function(event) {
   var coordinate = event.coordinate;
   var degrees = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
   var hdms = ol.coordinate.toStringHDMS(degrees);

   content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
       '</code>';
   popup_overlay.setPosition(coordinate);
 });

map.addOverlay(popup_overlay);
