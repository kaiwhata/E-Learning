<?php
header('Access-Control-Allow-Origin: *');



function func1(){
	return "this is function1";
}

function func2(){
	return "this is function2";
}

if(isset($_POST['funcName'])){
	$fn = $_POST['funcName'];
	switch($fn){
		case 'func1':
			echo func1();
			break;
		case 'func2':
			echo func2();
			break;
	}	
		
	
}
//echo "Hello People!";

//post('/toggle', function()
//{
	//$word = from($_POST, 'word');
	//$success = toggleTodo($id);

	//echo json(compact('success'));
//});





//THIS IS THE GOOD STUFF
//THIS IS THE GOOD STUFF
//THIS IS THE GOOD STUFF
//THIS IS THE GOOD STUFF
//THIS IS THE GOOD STUFF
//THIS IS THE GOOD STUFF

//$conn_string = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";

//$dbconn4 = pg_connect($conn_string);

//$result = pg_query("SELECT * FROM users");

//print "<pre>\n";
//if(!pg_num_rows($result)) {
	//print("connect good, db empty");
//} else {
	//while($row = pg_fetch_row($result)){
	//print("- $row[0]\t");
	//print("$row[1]\n");
	//}
//}







//print("\n");
//function add($a,$b){
//  $c=$a+$b;
//  return $c;
//}
//function mult($a,$b){
//  $c=$a*$b;
//  return $c;
//}

//function divide($a,$b){
//  $c=$a/$b;
//  return $c;
//}
    $aResult = array();

    //if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    //if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    //if( !isset($aResult['error']) ) {
	//	echo"hi";
  //      switch($_POST['functionname']) {
    //        case 'add':
      //         if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
        //           $aResult['error'] = 'Error in arguments!';
          //     }
            //   else {
              //     $aResult['result'] = add(floatval($_POST['arguments'][0]), floatval($_POST['arguments'][1]));
               //}
               //break;

//            default:
  //             $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
    //           break;
     //   }

    //}

    //json_encode($aResult);



?>
