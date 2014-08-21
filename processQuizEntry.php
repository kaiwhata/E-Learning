<?php header('Access-Control-Allow-Origin: *');

function InsertQuestion$quizname, $body, $panswerid, $canswer, $type,$tolerance,$imagename) {

	return "test";

	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	//Insert Quiz values into DB
	$result = pg_query($dbconnection,"INSERT INTO question (fname,lname,emailaddress,username,password,isadmin) VALUES ('$fname', '$lname', '$email', '$username', '$password', false);");
	if (!$result) {
	  return"fail";
	}else{
	  return"success";
	}
	$row = pg_fetch_all($result);
	return $row;
}

if (isset ( $_POST ['funcName'] )) {

	switch ($_POST ['funcName']) {
		case 'insertQuestion' :
			echo (InsertQuestion ( $_POST ['quizname'], $_POST ['body'], $_POST ['panswerid'],$_POST ['canswer'],$_POST ['type'],$_POST ['tolerance'],$_POST ['imagename']);
			break;
	}
}
?>





