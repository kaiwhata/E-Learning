<?php
header ( 'Access-Control-Allow-Origin: *' );

$username = $_POST ['username'];
$password = $_POST ['password'];

$sql = "UPDATE useraccount SET password='$password' WHERE username='$username'";

$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
$dbconnection = pg_connect ( $connectionString );
$result = pg_query ( $dbconnection, $sql );
$row = pg_fetch_row ( $result );
$done = $row [0];


$checkSql = "SELECT password FROM useraccount WHERE username = '$username'";
$result = pg_query ( $dbconnection, $checkSql );
$row = pg_fetch_row ( $result );
$done = $row [0];

echo $done;

return;
?>





