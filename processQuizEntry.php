<?php header('Access-Control-Allow-Origin: *');

function InsertQuestion($quizname, $body, $canswer, $type,$tolerance,$imagename) {

	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	//Insert Quiz values into DB
	$result = pg_query($dbconnection,"INSERT INTO question (body,canswer,type,tolerance,quizname,imagename) VALUES ('$body', '$canswer', '$type', '$tolerance', '$quizname', '$imagename');");
	console.log("Values entered: " +$body+" "+$canswer+" "+$type);

	if (!$result) {
	  return"fail";
	}else{
	  return"success";
	}
	$row = pg_fetch_all($result);
	return $row;
}

function InsertQuiz($name, $coursecode) {

	return "test";

	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	//Insert Quiz values into DB
	$result = pg_query($dbconnection,"INSERT INTO quiz (name, coursecode) VALUES ('$name', '$coursecode');");
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
			echo (InsertQuestion ( $_POST ['quizname'], $_POST ['body'],$_POST ['canswer'],$_POST ['type'],$_POST ['tolerance'],$_POST ['imagename']));
			break;
		case 'insertQuiz' :
			echo (InsertQuiz ( $_POST ['quizname'], $_POST ['coursecode']));
			break;
	}
}
?>





