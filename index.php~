<?php

echo "Hello People!";


$conn_string = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";

$dbconn4 = pg_connect($conn_string);

$result = pg_query("SELECT * FROM users");

print "<pre>\n";
if(!pg_num_rows($result)) {
	print("connect good, db empty");
} else {
	while($row = pg_fetch_row($result)){
		print("- $row[0]\t");
		print("$row[1]\t");
		print("$row[2]\t");
		print("$row[3]\t");	
	}
}
print("\n"));

?>
