//GeoJSON stuff
//when we want to manipulate data from GeoJSON, you want to be looking at the "features" array (which have dictionaries/javascript objects).   
//The "geometry" javascript object in the GeoJSON, contains all the shapes (lines, rectangles, etc.) can be located.


// Links to example GeoJSONS
https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337

http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson


//Data taken directly from class  To style a GeoJSON object. use the following
 // Our style object
 var mapStyle = {
    color: "white",
    fillColor: "pink",
    fillOpacity: 0.5,
    weight: 1.5
  };
    // Then include it in the code to display the GeoJSON
    d3.json(link, function(data) {  // the link is the link to the GeoJSON.  The funtion is a callback and will run once the data has been downloaded.
        // Creating a geoJSON layer with the retrieved data
        L.geoJson(data, {
          // Passing in our style object
          style: mapStyle
        }).addTo(map);
      });
      Collapse

// Data takenm directly from class Let's say we want to change the fill color in the mapStyle depending on area
function chooseColor(borough) {   // we create a function
    switch (borough) {
    case "Brooklyn":
      return "yellow";
    case "Bronx":
      return "red";
    case "Manhattan":
      return "orange";
    case "Queens":
      return "green";
    case "Staten Island":
      return "purple";
    default:
      return "black";
    }
  }
  
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      style: function(feature) {
        return {   // this is a little different from above.  We're returning a javascript object.  What's important to realize is that this function goes through each feature, one at a time.  We do NOT use the mystyle like we did before
          color: "white",
          fillColor: chooseColor(feature.properties.borough), // and this is where we get the boroughs. notice it calls the function and we send it the information from the GeoJSON
          fillOpacity: 0.5,
          weight: 1.5
        };
      }
    }).addTo(map);
  });   // the choosecolor function is run for every single borough.


  // Taken directly from class. Let's say we want tooltips and event listeners on each neighborhood
  //  style is a keyvalue pair, and onEachFeature is a keyvalue pair, similar to style.   Then each function has more keyvalue pairs.
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      style: function(feature) {
        return {
          color: "white",
          // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
          fillColor: chooseColor(feature.properties.borough),
          fillOpacity: 0.5,
          weight: 1.5
        };
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {  // the second parameter is always the layer assigned by geoJSON.
        // Set mouse events to change map styling
        layer.on({
          // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
          click: function(event) {
            map.fitBounds(event.target.getBounds());
          }
        });
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
  
      }
    }).addTo(map);
  });