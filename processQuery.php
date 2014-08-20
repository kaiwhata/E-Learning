<?php
header ( 'Access-Control-Allow-Origin: *' );
function checkPasswordAdmin($username, $password) {
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );
	$result = pg_query ( $dbconnection, "SELECT password FROM useraccount WHERE username='" . $username . "' AND isadmin='t'" );
	$row = pg_fetch_row ( $result );
	$realPassword = $row [0];
	return ($realPassword == $password) ? 'true' : 'false';

	return $row [0];
}


function getAllQuestionsFromQuiz($quizname) {
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v 			user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );
	$result = pg_query ( $dbconnection, "select row_to_json(row)
from(SELECT * FROM quiz INNER JOIN question ON  (quiz.name=question.quizname) LEFT OUTER JOIN possibleanswers ON (question.panswerid = possibleanswers.id) WHERE(quiz.name='" . $quizname . "')) row;" );
	return json_encode ( pg_fetch_all ( $result ) );
}


function sendResults($username, $password, $quizname, $score) {
	// get the user id
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v 			user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );

	$id = pg_query ( $dbconnection, "SELECT id FROM useraccount WHERE username='$username'" );
	$userid = pg_fetch_row ( $id )[0];

	pg_query ( $dbconnection, "INSERT INTO result (userid,quizname, score) VALUES ($userid,'" . $quizname . "',$score)" );

	return;
}

function getResults($username, $password) {
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v 			user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );

	// get the users id number
	$id = pg_query ( $dbconnection, "SELECT id FROM useraccount WHERE username='$username'" );
	$userid = pg_fetch_row ( $id )[0];

	$result = pg_query ( $dbconnection, " select row_to_json(row) from (SELECT * FROM result WHERE userid=$userid) row" );

	return json_encode ( pg_fetch_all ( $result ) );
}

function checkPassword($username,$password){
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	$result = pg_query($dbconnection,"SELECT password FROM useraccount WHERE username='".$username."'");
	$row = pg_fetch_row($result);
	$realPassword = $row[0];
	return ($realPassword==$password) ? 'true' : 'false';
}


if (isset ( $_POST ['funcName'] )) {
	switch ($_POST ['funcName']) {
		case 'checkPasswordAdmin' :
			echo (checkPasswordAdmin ( $_POST ['username'], $_POST ['password'] ));
			break;
		case 'getAllQuestionsFromQuiz' :
			echo (getAllQuestionsFromQuiz ( $_POST ['quizname'] ));
			break;
		case 'sendResults' :
			echo (sendResults ( $_POST ['username'], $_POST ['password'], $_POST ['quizname'], $_POST ['score'] ));
			break;
		case 'getResults' :
			echo (getResults ( $_POST ['username'], $_POST ['password'] ));
			break;
		case 'checkPassword':
			echo(checkPassword($_POST['username'],$_POST['password']));
			break;
	}
}
?>
