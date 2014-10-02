	<?php header('Access-Control-Allow-Origin: *');

	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );

	$name = $_POST ['name'];
	$quizname = $_POST ['quizname'];



	//find the users id
	$result = pg_query ( $dbconnection, "select id from useraccount where username = '$name'" );
	$row = pg_fetch_row ( $result );
	$id = $row [0];

	echo $id;
	echo "----";
	//use that id to try and find if there is a result
	$result = pg_query ( $dbconnection,"select count(*) from result where userid=$id AND quizname = '$quizname'");
	
	$row = pg_fetch_row ( $result );

	$numFound = $row [0];

	echo $numFound;

	?>
