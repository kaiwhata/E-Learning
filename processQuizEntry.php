<?php header('Access-Control-Allow-Origin: *');

function InsertQuestion($quizname, $body, $canswer, $type,$tolerance,$imagename,$panswerid) {
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	//Insert Question values into DB
	$result = pg_query($dbconnection,"INSERT INTO question (body,canswer,type,tolerance,quizname,imagename,panswerid) VALUES ('$body', '$canswer', '$type', '$tolerance', '$quizname', '$imagename','$panswerid');");
	if (!$result) {
	  return"fail";
	}else{
	  return"success";
	}

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


if (isset ( $_POST ['funcName'] )) {

	switch ($_POST ['funcName']) {
		case 'InsertQuestion' :
			echo (InsertQuestion ( $_POST ['quizname'], $_POST ['body'],$_POST ['canswer'],$_POST ['type'],$_POST ['tolerance'],$_POST ['imagename'],$_POST['panswerid']));
			break;
		case 'InsertQuiz' :
			echo (InsertQuiz ( $_POST ['quizname'], $_POST ['coursecode']));
			break;
	}
}
?>





