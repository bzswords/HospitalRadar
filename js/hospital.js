var geocoder;          // object that will turn addresses into coordinates
var map;               // the actual google map 
var radius;            // range user is looking for hospital in
var markersArray = []; // will hold all markers currently on map
var infowindow = null; // initialize infowindow that will show hospital details
var hospitals = [];    // will hold all hospitals acquired from database

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
  hospitalsTable = []; 
  data = '<tr>'
         +'<td>Hospital Name</td>'
         +'<td>Address</td>'
         +'<td>Phone Number</td>'
         +'<td>Type</td>'
         +'<td id="compare_btn" class="btn" onclick="openWindow()">Compare</td>'
         +'</tr>';
  // gather user data and validate
  var city = document.getElementById("address").value
  if (validateInput(city)) {
    codeAddress(city);
  } else {
    document.getElementById("hospitals_info").innerHTML = data;
    alert("Please input a New York city name");
  }
}

// make sure input is valid ciy name (as much as we can)
function validateInput(city){    
    re = /^[A-Za-z ]+$/; // Looks for letters and whitespaces
    return re.test(city);
}

// helper to isNewYorkZip
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// set map where user specified and start marking hospitals on map
function codeAddress(city) {
  aug_city = city + ", NY";
  // geocodes user input location and moves map here
  geocoder.geocode( { 'address': aug_city }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {     
      // save coordinates of user location
      center = results[0].geometry.location;
      
      // set map at user location
      map.setCenter(center);

      // get all hospitals for search and plot them on map
      queryDatabase(city);
      
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// AJAX request to php file that will return query results
function queryDatabase(city){
  var request = $.ajax({ url: 'databasePHP.php' ,
           data: { city: city },
           dataType: "xml",
           contentType: "text/xml; charset=\"utf-8\"",
  });
  request.done(function(data) {
    parseXMLResponse(data);
    placeHospitals();
  }); 
}

function parseXMLResponse(xml){
  var markers = xml.documentElement.getElementsByTagName("marker");

  // convert xml representation of hospitals to associated array
  for (var i = 0; i < markers.length; i++) {
    var pid = decodeXml(markers[i].getAttribute("provider_number"));
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
    var lat = decodeXml(markers[i].getAttribute("lat"));
    var lng = decodeXml(markers[i].getAttribute("lng"));

    hospitals.push({
      pid: pid,
      name: name,
      address: address,
      county: county,
      phone:  phone,
      type: type,
      ownership: ownership,
      emergency: emergency,
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    });
  }

}

// decode xml encoded strings
function decodeXml(xml){
  xml = xml.replace('&lt;', '<');
  xml = xml.replace('&gt;', '<');
  xml = xml.replace('&quot;', '"');
  xml = xml.replace('&#39;', "");
  xml = xml.replace('&#39;', "");
  xml = xml.replace('&amp;', "&");
  return xml;
}

// retrieves the state that google geocoded
function getState(google_address){
  var google_state = "";
  for(var ix=0; ix< google_address.length; ix++)
  {
      if (google_address[ix].types[0] == "administrative_area_level_1")
      {
          google_state=results[0].address_components[ix].short_name;
      }
  }
  return google_state;
}
  
// places hospitals on map
function placeHospitals(){
  for (var i = 0; i < hospitals.length; i++){
    var hospital = hospitals[i];
    var hloc = new google.maps.LatLng(hospital.lat, hospital.lng); // location of hospital
    var marker = createMarker(hloc, hospital);
    markersArray.push(marker);
    hospitalsTable.push(hospital);

    //populate the table with the hospitals fitting the search criteria 
    data = data + "<tr><td data-toggle='modal' data-id=" + hospital.phone + 
           " data-target='#orderModal'>" + hospital.name + "</td><td>" +
           hospital.address + "</td><td>" + hospital.phone + "</td><td>" 
           + hospital.type + "</td>" + 
           "<td><input type='checkbox' class='form-checkbox' value=" + 
           hospital.phone + "></td></tr>";
    document.getElementById("hospitals_info").innerHTML = data;
    document.getElementById("hospitals_table").style.height = screen.height - 600;
  }
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

// clears map of markers
function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    console.log(markersArray[i])
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

//creates modal with hospital's information when clicking the first cell on the table
$(function(){
    $('#orderModal').modal({
        keyboard: true,
        backdrop: "static",
        show:false,

    }).on('show', function(){ //subscribe to show method
        var phone = $(event.target).closest('td').data('id'); //get the id from td
        var hospital = findHospital(phone.toString())
        var name = hospital.name
        var address = hospital.address
        var type = hospital.type
        var ownership = hospital.ownership
        var emergency = hospital.emergency
        //make your ajax call populate items or what even you need
        $(this).find('#name').html($('<p> Hospital Name: ' + name + '</p>' ))
        $(this).find('#address').html($('<p> Address: ' + address  + '</p>'))
        $(this).find('#phone').html($('<p> Phone: ' + phone + '</p>'))
        $(this).find('#type').html($('<p> Hospital Type: ' + type + '</p>'))
        $(this).find('#ownership').html($('<p> Hospital Ownership: ' + ownership + '</p>'))
        $(this).find('#emergency').html($('<p> Emergency Service: ' + emergency + '</p>'))
    });
});

// finds hospital by its phone number 
function findHospital(phone) {
  for (var i=0; i < hospitals.length; i++)
    if (hospitals[i].phone == phone)
      break;
    return hospitals[i];
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

// opens new window when comparing hospitals and displays their respective information
function openWindow() {
  var hospitals = []
  hospitals_to_compare = $('#hospitals_info').find('input[type="checkbox"]:checked')
    for(i=0; i < hospitals_to_compare.length; i++) {
    hospitals.push(findHospital(hospitals_to_compare[i].value))
  }
  column1 = "";
  column2 = "";
  column3 = "";
  for(i=0; i < hospitals.length; i++) {
    var name = hospitals[i].name
    var address = hospitals[i].address
    var type = hospitals[i].type
    var ownership = hospitals[i].ownership
    var emergency = hospitals[i].emergency
    column1 = column1 + "<td>" + name + "</td>"
    column2 = column2 + "<td>" + type + "</td>"
    column3 = column3 + "<td>" + emergency + "</td>"
  }
  data2 = "<tr><td></td>" + column1 + "</tr>"
         +"<tr><td>Hospital type</td>"+ column2 + "</tr>" 
         +"<tr><td>Provides emergency services</td>" + column3 + "</tr>"
  
  if(hospitals.length > 0) {
  var w=window.open();

    w.document.write("<!DOCTYPE html>" 
      +"<html lang='en'>"
      + "<head>"
      + "<title>Tabstrip Widget Example</title>"
      +  "<meta charset='UTF-8' />"
      +  '<link href="css/hospital.css" rel="stylesheet">'
      +  '<script src="js/hospital.js"></script>'
      + "</head>"
      + "<body>"
      +  "<div id='tabstrip'>"
      +   "<span>General Information</span>"
      +   "<span>Survey of Patients' Experiences</span>"
      +   "<span>Medicare Payment</span>"
      +    "<div>"
      +      '<table class="imagetable">'
      +       data2
      +      '</table>'
      +    "</div>"
      +    "<div>"
      +    "</div>"
      +    "<div>"
      +    "</div>"
      +  "</div>"
      + '<script>'
      + 'compareStyle()'
      +  '</script>'
      + '</body>'
      + '</html>')
  }

}

//allows to move from one tab to another in Compare Hospitals window 
function compareStyle() {
    "use strict";
    var tabs = document.querySelectorAll("#tabstrip > span");
    var panels = document.querySelectorAll("#tabstrip > div");
    var length = tabs.length;
    var currentTab;
    var currentPanel;

    function getToggler(newTab, newPanel) {
      return function() {
        currentTab.className = "tab inactiveTab";
        currentPanel.className = "inactivePanel";
        newTab.className = "tab activeTab";
        newPanel.className = "activePanel";
        currentTab = newTab;
        currentPanel = newPanel;
      }
    }

    if (length !== panels.length)
      throw new Error("Number of tabs (" + length + ") and number of content panels (" + panels.length + ") are not equal");

    for (var i = 0; i < length; i++) {
      var tab = tabs[i];
      var panel = panels[i];

      tab.className = "tab inactiveTab";
      //tab.addEventListener("click", getToggler(tab, panel), false); not supported in IE8
      tab.onclick = getToggler(tab, panel);
      panel.className = "inactivePanel";
    }

    currentTab = tabs[0];
    currentPanel = panels[0];
    currentTab.className = "tab activeTab";
    currentPanel.className = "activePanel";
} 

google.maps.event.addDomListener(window, 'load', initialize);