<?php
// phpinfo(); // uncomment to check if php installed.

// form security processing
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Start XML file, create parent node
$doc = domxml_new_doc("1.0");
$node = $doc->create_element("markers");
$parnode = $doc->append_child($node);

$serverName = "Ammar-PC\sqlexpress"; // You might have to replace this with 24.218.207.121\SQLEXPRESS,1433
$connectionInfo = array( "Database"=>"HospitalSQL", "UID"=>"Ammar1", "PWD"=>"2134");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( !$conn ) {
    die( print_r( sqlsrv_errors(), true));
}

$params = array(&$_POST['query']);

// get user input zip code
if !(isset($_REQUEST["loc"])){
    throw new Exception("Must input a zip code"); 
}

$loc = $_REQUEST["loc"];

$tsql = "SELECT  *
         FROM [HospitalSQL].[dbo].[dbo_vwHQI_HOSP]
         WHERE [ZIP Code] = " +  test_input($loc);

$options = array("Scrollable" => SQLSRV_CURSOR_KEYSET);
$getProducts = sqlsrv_query($conn, $tsql, $params, $options);

header("Content-type: text/xml");

if ($getProducts === false) {
    die( FormatErrors( sqlsrv_errors() ) );
}

if(sqlsrv_has_rows($getProducts))
{
    $rowCount = sqlsrv_num_rows($getProducts);

    while($row = sqlsrv_fetch_array( $getProducts, SQLSRV_FETCH_ASSOC))
    {
        // ADD TO XML DOCUMENT NODE
        $node = $doc->create_element("marker");
        $newnode = $parnode->append_child($node);

        $newnode->set_attribute("provider_number", $row['Provider Number']);
        $newnode->set_attribute("hospital_name", $row['Hospital Name']);
        $newnode->set_attribute("address1", $row['Address1']);
        $newnode->set_attribute("address2", $row['Address2']);
        $newnode->set_attribute("address3", $row['Address3']);
        $newnode->set_attribute("city", $row['City']);
        $newnode->set_attribute("state", $row['State']);
        $newnode->set_attribute("zip", $row['ZIP Code']);
        $newnode->set_attribute("county", $row['County Name']);
        $newnode->set_attribute("phone", $row['Phone Number']);
        $newnode->set_attribute("hospital_type", $row['Hospital Type']);
        $newnode->set_attribute("ownership", $row['Hospital Ownership']);
        $newnode->set_attribute("emergency_service", $row['Emergency Service']);

    }

    $xmlfile = $doc->dump_mem();
    echo $xmlfile;

}

// Reference: http://social.technet.microsoft.com/wiki/contents/articles/1258.accessing-sql-server-databases-from-php.aspx
// Reference: https://developers.google.com/maps/articles/phpsqlajax_v3
?>

