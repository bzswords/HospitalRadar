<?php
// phpinfo(); // uncomment to check if php installed.

// form security processing
//function test_input($data) {
//    $data = trim($data);
//    $data = stripslashes($data);
//    $data = htmlspecialchars($data);
//    return $data;
//}

ini_set('display_errors',1); 
 error_reporting(E_ALL);

// create xml
function parseToXML($htmlStr) {
    $xmlStr=str_replace('<','&lt;',$htmlStr);
    $xmlStr=str_replace('>','&gt;',$xmlStr);
    $xmlStr=str_replace('"','&quot;',$xmlStr);
    $xmlStr=str_replace("'",'&#39;',$xmlStr);
    $xmlStr=str_replace("&",'&amp;',$xmlStr);
    return $xmlStr;
}


$serverName = "Ammar-PC\sqlexpress"; // You might have to replace this with 24.218.207.121\SQLEXPRESS,1433
$connectionInfo = array( "Database"=>"HospitalSQL", "UID"=>"Ammar1", "PWD"=>"2134");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( !$conn ) {
    die( print_r( sqlsrv_errors(), true));
}

$params = array(&$_POST['query']);

// grab user input zip code
$loc = $_GET["zip"];

// construct sql query to send to db
$tsql = "SELECT * FROM [HospitalSQL].[dbo].[dbo_vwHQI_HOSP] WHERE State='NY' AND [ZIP Code] LIKE ". $loc;

$options = array("Scrollable" => SQLSRV_CURSOR_KEYSET);
$getProducts = sqlsrv_query($conn, $tsql, $params, $options);

if ($getProducts === false) {
    die( sqlsrv_errors() );
}

header("Content-type: text/xml");


if(sqlsrv_has_rows($getProducts))
{

    $rowCount = sqlsrv_num_rows($getProducts);
    // Start XML file, echo parent node
    echo '<markers>';

    while($row = sqlsrv_fetch_array( $getProducts, SQLSRV_FETCH_ASSOC))
    {
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
        echo '/>';


    }

    // End XML file
    echo '</markers>';
    sqlsrv_close($conn);

}

// Reference: http://social.technet.microsoft.com/wiki/contents/articles/1258.accessing-sql-server-databases-from-php.aspx
// Reference: https://developers.google.com/maps/articles/phpsqlajax_v3
?>

