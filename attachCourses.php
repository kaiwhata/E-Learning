<?php
header ( 'Access-Control-Allow-Origin: *' );

function add($username, $coursecodes) {
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );
	$result = pg_query ( $dbconnection, "INSERT INTO coursestaken VALUES('$coursecode',$userid);" );
	// $row = pg_fetch_row ( $result );
	$realPassword = $row [0];
	return ($realPassword == $password) ? 'true' : 'false';

	return $row [0];
}

$array = array("foo", "bar", "hello", "world");

echo $_POST["coursecodes"];
echo $array[0];
echo $array[1];

?>





