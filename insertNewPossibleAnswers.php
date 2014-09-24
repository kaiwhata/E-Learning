<?php
header ( 'Access-Control-Allow-Origin: *' );
function insertNewPossibleAnswers($p1, $p2,$p3,$p4) {
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect ( $connectionString );
	if(is_numeric($p1)){
		$result = pg_query ( $dbconnection, "INSERT INTO possibleanswers(p1,p2,p3,p4) VALUES ( $p1,$p2,$p3,$p4) RETURNING id;" );
	}else{
		$result = pg_query ( $dbconnection, "INSERT INTO possibleanswers(p1,p2,p3,p4) VALUES ( '$p1','$p2','$p3','$p4') RETURNING id;" );
	}
	$row = pg_fetch_row ( $result );
	return $row [0];
}



if (isset ( $_POST ['funcName'] )) {
	switch ($_POST ['funcName']) {
		case 'insertNewPossibleAnswers' :
			echo (insertNewPossibleAnswers ( $_POST ['p1'], $_POST ['p2'], $_POST ['p3'], $_POST ['p4'] ));
			break;
	}
}
?>





