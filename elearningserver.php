<?php header('Access-Control-Allow-Origin: *');

function func1(){
	return "this is function1";
}

function func2(){
	return "this is function2";
}

function checkPassword($username,$password){
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	$result = pg_query($dbconnection,"SELECT password FROM useraccount WHERE username='".$username."'");
	$row = pg_fetch_row($result);
	$realPassword = $row[0];
	return ($realPassword==$password) ? 'true' : 'false';
 
	return $row[0];
	

}

function getQuizes(){
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	$result = pg_query($dbconnection,"SELECT * FROM quiz;");
	$row = pg_fetch_all($result);
	$bigline = "";
	foreach($row as $line){
	$bigline .= "*";
	$bigline .= $line;
	

	}

	return $bigline;
}

function sendResult() {
	
}
	
if(isset($_POST['funcName'])){
	switch($_POST['funcName']){
		case 'func1':
			echo(func1());
			break;	
		case 'func2':
			echo(func2());
			break;
		case 'checkPassword':
			echo(checkPassword($_POST['username'],$_POST['password']));
			break;
		case 'sendResult':
			break;
		case 'getQuizes':
			echo(getQuizes());		
			break;
	}
}
?>
