<?php
include 'geocoder.php';

ini_set('display_errors', 'On');
error_reporting(E_ALL);

// set timezone
date_default_timezone_set ( "America/New_York" );

// create xml
function parseToXML($htmlStr) {
    $xmlStr=str_replace('<','&lt;',$htmlStr);
    $xmlStr=str_replace('>','&gt;',$xmlStr);
    $xmlStr=str_replace('"','&quot;',$xmlStr);
    $xmlStr=str_replace("'",'&#39;',$xmlStr);
    $xmlStr=str_replace("&",'&amp;',$xmlStr);
    return $xmlStr;
}

// check cached geocodes
function checkGeocodes($pid, $address, $zip){
    global $conn;
    
    // set up and execute query
    $geoQuery = "SELECT [lat], [lng] FROM [HospitalSQL].[dbo].[dbo_vwHQI_HOSP_GEOCODES] 
                 WHERE [Provider Number]=?";
    $geoParams = array($pid);           
    $getGeocodes = sqlsrv_query($conn, $geoQuery, $geoParams);
    $coords = null;

    if ($getGeocodes === false) {
        die( sqlsrv_errors() );
    }
    
    // determine course of action based on number of results
    if(sqlsrv_has_rows($getGeocodes)){
        while($row = sqlsrv_fetch_array( $getGeocodes, SQLSRV_FETCH_ASSOC)){
            $coords = array($row['lat'], $row['lng']);
        }
    } else {
        $addr = urlencode($address . ", NY " . $zip);
        $loc = geocoder::getLocation($addr);
        $coords = cacheGeocode($pid, $loc);
    }
    sqlsrv_free_stmt($getGeocodes); 

    return $coords;
}

// inserts hospital coordinates into database and returns array 
function cacheGeocode($pid, $geo){
    global $conn;

    // grab geocode info
    $faddr = $geo['formatted_address'];
    $lat = $geo['geometry']['location']['lat'];
    $lng = $geo['geometry']['location']['lng'];
    $created = date('Y-m-d H:i:s');

    $geoParams = array($pid, $faddr, $lat, $lng, $created);

    // construct sql query to send to db
    $geoSql = "INSERT INTO [HospitalSQL].[dbo].[dbo_vwHQI_HOSP_GEOCODES] 
               VALUES (?, ?, ?, ?, ?)"; 

    // Execute the query.
    $stmt = sqlsrv_query( $conn, $geoSql, $geoParams);   
    if ( !$stmt ) { 
  
      die( print_r( sqlsrv_errors(), true));  

    }
    sqlsrv_free_stmt($stmt); 

    return array($lat, $lng);
}

$serverName = "Ammar-PC\sqlexpress"; // You might have to replace this with 24.218.207.121\SQLEXPRESS,1433
$connectionInfo = array( "Database"=>"HospitalSQL", "UID"=>"Ammar1", "PWD"=>"2134");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( !$conn ) {
    die( print_r( sqlsrv_errors(), true));
}

// grab user input zip code
$loc = $_GET["city"];
$params = array($loc);

// construct sql query to send to db
$tsql = "SELECT * FROM [HospitalSQL].[dbo].[dbo_vwHQI_HOSP] 
         WHERE [State]='NY' AND [City] LIKE ?";

$options = array("Scrollable" => SQLSRV_CURSOR_KEYSET);
$getProducts = sqlsrv_query($conn, $tsql, $params, $options);

if ($getProducts === false) {
    die( sqlsrv_errors() );
}

header('Content-Type: application/xml; charset=utf-8');

if(sqlsrv_has_rows($getProducts))
{
    // Start XML file, echo parent node
    echo '<?xml version="1.0" encoding="UTF-8"?>';
    echo '<markers>';

    while($row = sqlsrv_fetch_array( $getProducts, SQLSRV_FETCH_ASSOC))
    { 
        // check if we have coordinates cached and cache if not
        $coords = checkGeocodes($row['Provider Number'], $row['Address1'], $row['ZIP Code']);

        // ADD TO XML DOCUMENT NODE
        echo '<marker ';
        echo 'provider_number="' . parseToXML($row['Provider Number']) . '" ';
        echo 'hospital_name="' . parseToXML($row['Hospital Name']) . '" ';
        echo 'address1="' . parseToXML($row['Address1']) . '" ';
        echo 'address2="' . parseToXML($row['Address2']) . '" ';
        echo 'address3="' . parseToXML($row['Address3']) . '" ';
        echo 'city="' . parseToXML($row['City']) . '" ';
        echo 'state="' . parseToXML($row['State']) . '" ';
        echo 'zip="' . parseToXML($row['ZIP Code']) . '" ';
        echo 'county="' . parseToXML($row['County Name']) . '" ';
        echo 'phone="' . parseToXML($row['Phone Number']) . '" ';
        echo 'hospital_type="' . parseToXML($row['Hospital Type']) . '" ';
        echo 'ownership="' . parseToXML($row['Hospital Ownership']) . '" ';
        echo 'emergency_service="' . parseToXML($row['Emergency Service']) . '" ';
        echo 'lat="' . parseToXML($coords[0]) . '" ';
        echo 'lng="' . parseToXML($coords[1]) . '">';
        echo '</marker>';


    }

    // End XML file
    echo '</markers>';
    sqlsrv_close($conn);

} 

// Reference: http://social.technet.microsoft.com/wiki/contents/articles/1258.accessing-sql-server-databases-from-php.aspx
// Reference: https://developers.google.com/maps/articles/phpsqlajax_v3
?>

