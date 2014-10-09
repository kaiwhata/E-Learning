<?php
header ( 'Access-Control-Allow-Origin: *' );

	$username = $_POST['username'];

	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );
	

	//get the users id

	$id = pg_query ( $dbconnection, "SELECT id FROM useraccount WHERE username='$username'" );
	$userid = pg_fetch_row ( $id )[0];



	$result = pg_query ( $dbconnection, "SELECT code FROM coursestaken WHERE id = $userid");
	echo (json_encode (pg_fetch_all ( $result ) ));


?>





