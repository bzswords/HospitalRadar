function startSearch(){
  var city = document.getElementById("city").value;
  queryDatabase(city);
}

// AJAX request to php file that will return query results
function queryDatabase(city){
  $.ajax({ url: 'databasePHP.php' ,
         data: { city: city },
         dataType: "xml",
         contentType: "text/xml; charset=\"utf-8\"",
         success: function(data) {
                   alert(data.responseXML);
                }
 }); 
}

// asynchronous function to call php
function downloadUrl(url, callback) {
  // create xmlhttp object based on browser
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4 && (request.status == 200)) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
  alert(request.responseXML);
}

// while waiting for php file to run
function doNothing() {}