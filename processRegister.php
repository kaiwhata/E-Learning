<?php header('Access-Control-Allow-Origin: *');

function Register($username, $email, $password, $fname, $lname) {


	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	//Access table from SQL to insert
	$result = pg_query($dbconnection,"INSERT INTO useraccounts VALUES ('$fname', '$lname', '$email', '$username', '$password', false);");
	return 'got to end of php function';
}

if (isset ( $_POST ['funcName'] )) {

	switch ($_POST ['funcName']) {
		case 'register' :
			echo (Register ( $_POST ['username'], $_POST ['email'], $_POST ['password'],$_POST ['fname'],$_POST ['lname']));
			break;
	}
}
?>


