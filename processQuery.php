<?php header('Access-Control-Allow-Origin: *');


function checkPasswordAdmin($username,$password){
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	$result = pg_query($dbconnection,"SELECT password FROM useraccount WHERE username='".$username."' AND isadmin='t'");
	$row = pg_fetch_row($result);
	$realPassword = $row[0];
	return ($realPassword==$password) ? 'true' : 'false';

	return $row[0];


}

function getAllQuestions(){
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v 			user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);

	$result = pg_query($dbconnection,"select row_to_json(row)
from(select * from question LEFT OUTER JOIN possibleanswers ON (question.panswerid = possibleanswers.id))row;");

//	$str = "{";
//	for($i = 0;$i<2;$i++){
//		$str.=json_encode(pg_fetch_row($result));
//		if($i<1){
//			$str.=",";
//		}
//	}

//	$str.="}";

//	return $str;
	//$row = pg_fetch_row($result);
//	return (pg_fetch_all($result));
	return json_encode(pg_fetch_all($result));
}


function getAllQuestionsFromQuiz($quizname){
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v 			user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );
	$result = pg_query ( $dbconnection, "select row_to_json(row)
from(SELECT * FROM quiz INNER JOIN question ON  (quiz.name=question.quizname) LEFT OUTER JOIN possibleanswers ON (question.panswerid = possibleanswers.id) WHERE(quiz.name='".$quizname."')) row;" );
	return json_encode ( pg_fetch_all ( $result ) );
}


function sendResults($username,$password,$quizname,$score){


}

function getAllQuestionsWithoutOptions(){
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v 			user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	$result = pg_query($dbconnection,"SELECT * FROM question");


	$row = pg_fetch_row($result);
	return json_encode(array_values($row));
}

if(isset($_POST['funcName'])){
	switch($_POST['funcName']){
		case 'checkPasswordAdmin':
			echo(checkPasswordAdmin($_POST['username'],$_POST['password']));
			break;
		case 'getAllQuesitons':
			echo(getAllQuestions());
			break;
		case 'getAllQuestionsFromQuiz':
			echo(getAllQuestionsFromQuiz($_POST['quizname']));
			break;
		case 'sendResults':
			echo(getAllQuestionsFromQuiz($_POST['quizname']));
			break;
	}
}
?>
