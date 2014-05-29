var geocoder;          // object that will turn addresses into coordinates
var map;               // the actual google map 
var cityCircle;        // circle that is placed on map
var radius;            // range user is looking for hospital in
var markersArray = []; // will hold all markers currently on map
var infowindow = null; // initialize infowindow that will show hospital details

// Define hospitals
var hospital1 = {
  name: "NY Eye And Ear Infirmary",
  address: "310 East 14th Street, New York, NY 10003",
  phone: "2129794000",
  type: "Acute Care Hospitals",
  ownership: "Voluntary Non-Profit - Private"
};
var hospital2 = {
  name: "Beth Israel Medical Center", 
  address: "First Avenue at 16th Street, New York, NY 10003",
  phone: "2124202000",
  type: "Acute Care Hospitals",
  ownership: "Voluntary Non-Profit - Private"
};
var hospital3 = {
  name: "VA New York Harbor Healthcare System - NY Div.",
  address: "423 East 23rd Street, New York, NY 10010",
  phone: "2126867500",
  type: "Acute Care - Veteran's Administration",
  ownership: "Government Federal"
};

// put all hospitals in array 
var hospitals = [hospital1, hospital2, hospital3];

// initialize the map and Geocoder
function initialize() {
  geocoder = new google.maps.Geocoder();
  // start over Beantown
  var latlng = new google.maps.LatLng(42.365579, -71.037598);
  var mapOptions = {
    zoom: 14,
    zoomControl: true,
    zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    panControl: false,
    mapTypeControl: false,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  // object holding configuration of circle
  var populationOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.35,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: latlng,
    radius: 1000
  };
  // create circle
  cityCircle = new google.maps.Circle(populationOptions);
  // keep from chowing circle too early
  cityCircle.setMap(null);
}

// set map where user specified and return latlng of that location
function codeAddress() {
  // clear any markers currently on map
  console.log(markersArray)
  clearOverlays();
  // get user input
  var address = document.getElementById('address').value;
  radius = parseInt(document.getElementById('radius').value) * 1609.34;
  // geocodes user input location and moves map here
  geocoder.geocode( { 'address': address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      
      // save coordinates of user location
      center = results[0].geometry.location;
      
      // set map at user location
      map.setCenter(center);
      
      // place circle on map indicating range 
      cityCircle.setCenter(center);
      cityCircle.setRadius(radius);
      cityCircle.setMap(map);
      
      // find all nearby hospitals and place their location on map
      for (var i = 0; i < hospitals.length; i++) {
        computeLatLng(center, hospitals[i]);
      }

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

  
// computes distance and checks if it is within threshold defined by user
function determineIfNear(center, pos) {
  console.log(center);
  var dist = google.maps.geometry.spherical.computeDistanceBetween(center, pos);
  console.log(dist);
  if (dist <= radius) {
    return true;
  } else {
    return false;
  }
};
  
// geocodes address of hospital
function computeLatLng(center, hospital){
  geocoder.geocode( { 'address': hospital.address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      hloc = results[0].geometry.location; // location of hospital
      var near_huh = determineIfNear(center, hloc);
      if (near_huh) {
        var marker = createMarker(hloc, hospital)
        markersArray.push(marker);
      }
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// clears map of markers
function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    console.log(markersArray[i])
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

// generates marker based on hospital location
function createMarker(pos, hospital) {
  var marker = new google.maps.Marker({       
    position: pos, 
    map: map,  // google.maps.Map 
    title: hospital.name      
  }); 
  // makes marker clickable
  google.maps.event.addListener(marker, 'click', function() { 
    // remove any open info windows
    if (infowindow) {
      infowindow.close();
    }
    createInfoWindowContent(hospital);
    infowindow.open(map,marker); 
  }); 
  return marker;  
}

// Generate content of info window based on hospital
function createInfoWindowContent(hospital) {
  var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">' + hospital.name + '</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Address: </b>'+ hospital.address + '</p>'+
    '<p><b>Phone Number: </b>'+ hospital.phone + '</p>'+
    '<p><b>Type: </b>' + hospital.type + '</p>'+
    '<p><b>Ownership: </b>' + hospital.ownership + '</p>'+
    '</div></div>';
  infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 300
  });
}  

// runs initial search from lightbox
// just loads values into map header search boxes and searches
function initialSearch() {
  var address = document.getElementById('lightLocation').value;
  var range = document.getElementById('lightRange').value;
  $('#lightboxform').modal('hide');
  $('#header').css("display", "inline");
  $('#address').val(address);
  $('#radius').val(range);
  $('#searchbtn').click();
}

google.maps.event.addDomListener(window, 'load', initialize);