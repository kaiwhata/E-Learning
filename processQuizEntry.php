<?php header('Access-Control-Allow-Origin: *');

function InsertQuestion($quizname, $body, $canswer, $type,$tolerance,$imagename,$panswerid,$modelanswer) {
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	//Insert Question values into DB
	if($panswerid == -1){
		$result = pg_query($dbconnection,"INSERT INTO question (body,canswer,type,tolerance,quizname,imagename,panswerid,modelanswer) VALUES ('$body', '$canswer', '$type', '$tolerance','$quizname','$imagename',NULL,'$modelanswer');");
	}else{
		$result = pg_query($dbconnection,"INSERT INTO question (body,canswer,type,tolerance,quizname,imagename,panswerid,modelanswer) VALUES ('$body', '$canswer', '$type', '$tolerance', '$quizname', '$imagename','$panswerid','$modelanswer');");
	}
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

	$result = pg_query($dbconnection,"INSERT INTO course VALUES ('$coursecode','made up quizname');");

	//clear all questions
	$result = pg_query($dbconnection,"DELETE FROM question WHERE quizname='$name';");

	//re add them all
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
			echo (InsertQuestion ( $_POST ['quizname'], $_POST ['body'],$_POST ['canswer'],$_POST ['type'],$_POST ['tolerance'],$_POST ['imagename'],$_POST['panswerid'],$_POST['modelanswer']));
			break;
		case 'InsertQuiz' :
			echo (InsertQuiz ( $_POST ['quizname'], $_POST ['coursecode']));
			break;
	}
}
?>





