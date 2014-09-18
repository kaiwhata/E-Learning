 
 

<?php
	$connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
	$dbconnection = pg_connect($connectionString);
	$result = pg_query($dbconnection,
		  "SELECT 'images_path' FROM  'images_tbl' ORDER by 'images_id' DESC";);
while($row = mysql_fetch_array($result,MYSQL_BOTH)){

?-->

<table style="border-collapse: collapse; font: 12px Tahoma;" border="1" cellspacing="5" cellpadding="5">
<tbody><tr>
<td>

<img src="<?php echo $row[" images_path"];="" ?="">" alt="" />">

</td>
</tr>
</tbody></table>

<!--?php
}
?-->