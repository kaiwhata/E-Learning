<?php header('Access-Control-Allow-Origin: *');

// echo
$quizName = $_POST["quizName"];
$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
$dbconnection = pg_connect($connectionString);
$clearResultsQuery = "delete from result where quizname='$quizName';delete from question where quizname = '$quizName';delete from quiz where name = '$quizName';";

$result = pg_query($dbconnection,$clearResultsQuery);
// echo pg_fetch_row($result);
echo $quizName;
?>