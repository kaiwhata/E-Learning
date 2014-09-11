<?php header('Access-Control-Allow-Origin: *');

function InsertQuestion($quizname, $body, $canswer, $type,$tolerance,$imagename) {
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	//Insert Quiz values into DB
	$result = pg_query($dbconnection,"INSERT INTO question (body,canswer,type,tolerance,quizname,imagename) VALUES ('$body', '$canswer', '$type', '$tolerance', '$quizname', '$imagename');");
	if (!$result) {
	  return"fail";
	}else{
	  return"success";
	}
	$row = pg_fetch_all($result);
	return $row;
}

function InsertQuiz($name, $coursecode) {

	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	//Insert Quiz values into DB
	$result = pg_query($dbconnection,"INSERT INTO quiz (name, coursecode) VALUES ('$name', '$coursecode');");
	if (!$result) {
		return"fail";
	}else{
		return"success";
	}

}

function InsertPossibleAnswers($p1, $p2, $p3, $p4) {

	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	//Insert Quiz values into DB
	$result = pg_query($dbconnection,"INSERT INTO possibleanswers (p1, p2, p3, p4) VALUES ('$p1', '$p2','$p3', '$p4');");
	if (!$result) {
		return"fail";
	}else{
		return"success";
	}

}

if (isset ( $_POST ['funcName'] )) {

	switch ($_POST ['funcName']) {
		case 'InsertQuestion' :
			echo (InsertQuestion ( $_POST ['quizname'], $_POST ['body'],$_POST ['canswer'],$_POST ['type'],$_POST ['tolerance'],$_POST ['imagename']));
			break;
		case 'InsertQuiz' :
			echo (InsertQuiz ( $_POST ['quizname'], $_POST ['coursecode']));
			break;
		case 'InsertPossibleAnswers' :
			echo (InsertPossibleAnswers ( $_POST ['p1'], $_POST ['p2'], $_POST ['p3'],$_POST ['p4']));
			break;
	}
}
?>





