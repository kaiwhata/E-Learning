<?php header('Access-Control-Allow-Origin: *');


function checkPasswordAdmin($username,$password){
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	$result = pg_query($dbconnection,"SELECT password FROM useraccounts WHERE username='".$username."' AND isadmin='t'");
	$row = pg_fetch_row($result);
	$realPassword = $row[0];
	return ($realPassword==$password) ? 'true' : 'false';
 
	return $row[0];
	

}

function getAllQuestions(){
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v 			user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	$result = pg_query($dbconnection,"SELECT * FROM question OUTER JOIN  question ON possibleanswers question.panswerid = possibleanswers.id");

	$row = pg_fetch_row($result);
	return json_encode(array_values($row));
}

function getAllQuestionsWithoutOptions(){
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v 			user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	$result = pg_query($dbconnection,"SELECT * FROM question I");


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
	}
}
?>
