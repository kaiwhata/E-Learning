	<?php

header ( 'Access-Control-Allow-Origin: *' );

	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );

	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v 			user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );
	$result = pg_query ( $dbconnection, "select row_to_json(row) from (select * from quiz) row;" );
	echo json_encode ( pg_fetch_all ( $result ) );
	return;
	?>
