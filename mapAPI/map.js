
var ourLoc;
var view;
var map;

// Initialize variables, setup everything
function init() {
	// ourLoc: location of our SIP classroom, based on longitude and latitude
	ourLoc = ol.proj.fromLonLat([-73.985715, 40.693364]);

  // view: an object that enables us to view a map
	view = new ol.View({
		center: ourLoc, // the center of the initial map view
		zoom: 6         // how zoomed in the view is. You can change this number as you like
	});

  // map: an object that enables us to display a map on the screen
	map = new ol.Map({
		target: 'map',    // The "Target" is our <div> name. Where in the HTML is the map being rendered.
		layers: [
		  new ol.layer.Tile({
		    source: new ol.source.OSM() // Explain: this is a required variable. Basically tells us what kind of layer we want.
		  })
		  // Explain: Open Layer offers different types of layers. Layers are like different brushes used to make the same image. They look different. Some might lag more than others or have different levels of detail.
		],
		// Note from the View Animation website:
		// Improve user experience by loading tiles while animating. Will make
		// animations stutter on mobile or slow devices.
		loadTilesWhileAnimating: true,
		view: view
	});
}

// Button that moves the viewport to the given location over the given duration
function panHome() {
	view.animate({
		center: ourLoc, // "Home" Location
		duration: 2000  // Two seconds
	});
}

function makeCountryRequest() {
  // Get the inputted country name
	var countryName = document.getElementById("country-name").value;

  // Check that something was actually inputted
	if(countryName === "") {
	 	alert("You didn't enter a country name!");
	 	return;
	}

  // To get the coordinate associated with the country, submit a query to the REST Countries API
	var query = "https://restcountries.eu/rest/v2/name/"+countryName+"?fullText=true";

  // Replace all the spaces in the country name with '%20'. We need to do this because URLs can't have spaces in them
	query = query.replace(/ /g, "%20");

  // Open the GET request to get info from the API
	countryRequest = new XMLHttpRequest();
	// The 'true' parameter changes the call from synchronous to an asynchronous call.
  // Note: synchronous requests block the client until the first operation finishes (i.e. won't let any operations through), which can cause delays. But asynchonous requests don't block the client.
	countryRequest.open('GET', query, true);

	// Add an onload function to process what happens when we send the HTTP Request.
	countryRequest.onload = processCountryRequest;

  // Send the actual GET request
	countryRequest.send();
}

function processCountryRequest() {
	// In the onload function, we wait until the request is complete.
	if(countryRequest.readyState != 4) {
		return;
	}

	// Once the request is completed, We look for errors.
	if (countryRequest.status != 200 || countryRequest.responseText === "") {
	 	alert("We were unable to find your requested country!");
	 	return;
	}


	// If the request succeeds (i.e. no prior returns), we parse the information that was sent back.
  // First: convert the JSON into a list.
  var countryInformation = JSON.parse(countryRequest.responseText);
	var lon = countryInformation[0].latlng[1];   // longitude
	var lat = countryInformation[0].latlng[0];   // latitude

	// Note: If you run into an error like the map disappearing, check that you have your longtidue and latitude variables mapped to the right indexes. The lon and lat are switched in the JSON and OpenLayers
	//window.console.log("lon " + lon + " & lat " + lat);

  // Finally, convert the lon/lat to a location!
	var location = ol.proj.fromLonLat([lon, lat]);

	// Note: If you run into an error like window
	// not loading, check that you declared VAR before the location variable.
	//window.console.log("location " + location);

  // move the viewport to the specified location
	view.animate({
		center: location, // Location
		duration: 2000    // Two seconds
	});
}

// run init() function when window loads
window.onload = init;
