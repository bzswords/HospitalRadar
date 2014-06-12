<?php
// phpinfo(); // uncomment to check if php installed.

$serverName = "Ammar-PC\sqlexpress"; // You might have to replace this with 24.218.207.121\SQLEXPRESS,1433
$connectionInfo = array( "Database"=>"HospitalSQL", "UID"=>"Ammar1", "PWD"=>"2134");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
     echo "Connection established.<br />";
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}

$params = array(&$_POST['query']);

$tsql = "SELECT  *
		FROM [HospitalSQL].[dbo].[dbo_vwHQI_HOSP]";

$options = array("Scrollable" => SQLSRV_CURSOR_KEYSET);
$getProducts = sqlsrv_query($conn, $tsql, $params, $options);
if ($getProducts === false)

        die( FormatErrors( sqlsrv_errors() ) );

if(sqlsrv_has_rows($getProducts))
{
	$rowCount = sqlsrv_num_rows($getProducts);

	while($row = sqlsrv_fetch_array( $getProducts, SQLSRV_FETCH_ASSOC))
	{
		print_r($row);
	}

}

// Reference: http://social.technet.microsoft.com/wiki/contents/articles/1258.accessing-sql-server-databases-from-php.aspx

?>

