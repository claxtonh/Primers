//To create a simple map
var myMap = L.map("map", { // L is for leaflet, .map is to draw a map  and "map" refers to the div in the html file where the map will be placed
    center: [40.00, -120.00],  // latitude and longitude.  - means west
    zoom: 10  // higher zoom levels are more zoomed in.  See zoom levels here: https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/

});

// To add a tile layer like streetview, or topological view, or darkview
// you must use the .addTo method to add the stuff to the map.
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 12,
  id: "mapbox.streets",  // there are different layers. See them here: https://leafletjs.com/examples/layers-control/

  accessToken: API_KEY
}).addTo(myMap);
// note, you don't have to use a tile.  you could use a floorplan as a background tile, or a picture of a treasure map you kid d


//To add a marker
var spot1 = L.marker([40.00, -120.00], {
    draggable = true, // and when you look in the console, you can see the new longitude and lattigute
    title: "place1"
}).addTo(myMap);
spot1.bindPopup("You are here");  // This is what will show when you click on it.

//To add an array of markers
var spots = [
    {
        location: [38.34, -75.00],
        name: "Secret hideaway",
        itinerary: "Day 1"
    },
    {
        location: [23.45, 84.23],
        name: "Lost city of Gold",
        itinerary: "Day 2" 
    },
    {
        location: [27.56, 79.12],
        name: "Fountain of Youth",
        itinerary: "Day 3"
    }
];

for (var i = 0; i<spots.length;  i++){
    L.marker(spot[i].location)
    .bindPopup(`${spot[i].name} seen on ${spot[i].itinerary}`)
    .addTo(myMap);

}
// We could have also written in html
//  bindPopup(`<h1>${spot[1].name}</h1><hr><h4>seen on ${spot[i].itinerary}</h4>`)



//Other things to do with leaflet  link: https://leafletjs.com/reference-1.5.0.html#map-factory
