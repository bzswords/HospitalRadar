var geocoder;          // object that will turn addresses into coordinates
var map;               // the actual google map 
var radius;            // range user is looking for hospital in
var markersArray = []; // will hold all markers currently on map
var infowindow = null; // initialize infowindow that will show hospital details
var hospitals = [];    // will hold all hospitals acquired from database
var hospitalsTable = [];

// initialize the map and Geocoder
function initialize() {
  geocoder = new google.maps.Geocoder();
  // start over Beantown
  var latlng = new google.maps.LatLng(40.7127, -74.0059);
  var mapOptions = {
    zoom: 12,
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

// runs initial search from lightbox
// just loads values into map header search boxes and searches
function initialSearch() {
  var address = document.getElementById('lightLocation').value;
  $('#lightboxform').modal('hide');
  $('#header').css("display", "inline");
  $('#address').val(address);
  $('#searchbtn').click();
}

// begins search for hospital near user location
function startSearch() {
  // clear any markers currently on map
  clearOverlays();
  // clear the hospitals array
  hospitals = [];
  hospitalsTable = []; // need to clear hospitals table...this isnt working
  // gather user data and validate
  var zip = document.getElementById("address").value
  if (isNewYorkZip(zip)) {
    queryDatabase(zip);
  } else {
    alert("Please input a New York Zip Code");
  }
}

// validates user input is new york zip code
function isNewYorkZip(z){
  return isNumber(z) && (z.charAt(0) == "1") && (z.length == 5);
}

// helper to isNewYorkZip
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// AJAX request to php file that will return query results
function queryDatabase(zip){
  var url = "databasePHP.php?zip="+zip
  // query database for all hospitals in zip code and compile in array
  downloadUrl(url, function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName("marker");

    // convert xml representation of hospitals to associated array
    for (var i = 0; i < markers.length; i++) {
      var name = decodeXml(markers[i].getAttribute("hospital_name"));
      var address = decodeXml(markers[i].getAttribute("address1")) + ", " +
                    decodeXml(markers[i].getAttribute("city")) + ", " +
                    decodeXml(markers[i].getAttribute("state")) + " " +
                    decodeXml(markers[i].getAttribute("zip"));
      var county = decodeXml(markers[i].getAttribute("county"));
      var phone = decodeXml(markers[i].getAttribute("phone"));
      var type = decodeXml(markers[i].getAttribute("hospital_type"));
      var ownership = decodeXml(markers[i].getAttribute("ownership"));
      var emergency = decodeXml(markers[i].getAttribute("emergency_service"));

      hospitals.push({
        name: name,
        address: address,
        county: county,
        phone:  phone,
        type: type,
        ownership: ownership,
        emergency: emergency
      })
    }
    codeAddress(zip);
  });
}

// asynchronous function to call php. helper to start()
function downloadUrl(url, callback) {
  // create xmlhttp object based on browser
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
}

// while waiting for php file to run
function doNothing() {}

// decode xml encoded strings
function decodeXml(xml){
  xml = xml.replace('&lt;', '<');
  xml = xml.replace('&gt;', '<');
  xml = xml.replace('&quot;', '"');
  xml = xml.replace('&#39;', "'");
  xml = xml.replace('&amp;', "&");
  return xml;
}

// set map where user specified and start marking hospitals on map
function codeAddress(zip) {
  // geocodes user input location and moves map here
  geocoder.geocode( { 'address': zip }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      
      // save coordinates of user location
      center = results[0].geometry.location;
      
      // set map at user location
      map.setCenter(center);
      
      // place all hospitals on map
      delay = 0;
      function doSetTimeout(i) { 
        setTimeout(function() {computeLatLng(i)}, delay);
        delay += 2500;
      }
      for (var i = 0; i < hospitals.length; i++) {
        doSetTimeout(i);
      }
      computeLatLng
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
  
// geocodes address of hospital
function computeLatLng(index){

  var hospital = hospitals[index];
  geocoder.geocode( { 'address': hospital.address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      hloc = results[0].geometry.location; // location of hospital
      console.log("here");
      var marker = createMarker(hloc, hospital);
      markersArray.push(marker);
      
      hospitalsTable.push(hospital);
      document.getElementById("hospitals_info").innerHTML = 
      document.getElementById("hospitals_info").innerHTML 
      + "<tr><td data-toggle='modal' data-id=" + hospital.phone + " data-target='#orderModal'>" + hospital.name + "</td><td>" 
      + hospital.address + "</td><td>" 
      + hospital.phone + "</td><td>" 
      + hospital.type + "</td>"
      + "<td><input type='checkbox' value=" + hospital.name + "></td></tr>";
      console.log(hospitalsTable)

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

$(function(){
    $('#orderModal').modal({
        keyboard: true,
        backdrop: "static",
        show:false,

    }).on('show', function(){ //subscribe to show method
        var phone = $(event.target).closest('td').data('id'); //get the id from td
        var hospital = findHospital(phone.toString())
        var name = hospital["Hospital Name"]
        var address = hospital.Address1 + ", " + hospital.City + ", " + hospital.State
        var type = hospital["Hospital Type"]
        var ownership = hospital["Hospital Ownership"]
        var emergency = hospital["Emergency Service"]
        //make your ajax call populate items or what even you need
        $(this).find('#name').html($('<p> Hospital Name: ' + name + '</p>' ))
        $(this).find('#address').html($('<p> Address: ' + address  + '</p>'))
        $(this).find('#phone').html($('<p> Phone: ' + phone + '</p>'))
        $(this).find('#type').html($('<p> Hospital Type: ' + type + '</p>'))
        $(this).find('#ownership').html($('<p> Hospital Ownership: ' + ownership + '</p>'))
        $(this).find('#emergency').html($('<p> Emergency Service: ' + emergency + '</p>'))
    });
});

// This needs to be changed to search for hospital in hospitals array, not json
function findHospital(phone) {
  var hospitals = hospitals_json_raw["Sheet1"];
  for (var i=0; i < hospitals.length; i++)
    if (hospitals[i]["Phone Number"] == phone)
      break;
    return hospitals[i];
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

google.maps.event.addDomListener(window, 'load', initialize);