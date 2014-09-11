<?php
header ( 'Access-Control-Allow-Origin: *' );



function getAllResultsGroupedByQuiz(){
		$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);

	$result = pg_query($dbconnection,"SELECT quizname,coursecode,AVG(score) as average_score,COUNT(*) number_taken FROM result LEFT JOIN quiz ON quiz.name=result.quizname GROUP BY  quizname,coursecode ORDER BY AVG(score) desc;
");
	return json_encode(pg_fetch_all($result));
}

function getAllResultsGroupedByStudent(){
		$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);

	
	$result = pg_query($dbconnection,"SELECT fname,lname,emailaddress,AVG(score) as average_score,COUNT(*) number_taken
 FROM useraccount LEFT JOIN result ON useraccount.id=result.userid GROUP BY useraccount.id,useraccount.fname,useraccount.lname,useraccount.emailaddress ORDER BY AVG(score) desc;
");
	return json_encode(pg_fetch_all($result));
}

function getAllResultsGroupedByStudentAndCourse(){
		$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);

	
	$result = pg_query($dbconnection,"SELECT fname,lname,emailaddress,coursecode,AVG(score) as average_score,COUNT(*) number_taken
 FROM useraccount LEFT JOIN result LEFT JOIN quiz ON quiz.name=result.quizname ON useraccount.id=result.userid GROUP BY useraccount.id,useraccount.fname,useraccount.lname,quiz.coursecode,useraccount.emailaddress ORDER BY AVG(score) desc;"
);
	return json_encode(pg_fetch_all($result));
}


if (isset ( $_POST ['funcName'] )) {
	switch ($_POST ['funcName']) {
		case 'getQuizAverages' :
			echo (getAllResultsGroupedByQuiz ());
			break;
		case 'getStudentAverages' :
			echo (getAllResultsGroupedByStudent());
			break;
	}
}
?>





