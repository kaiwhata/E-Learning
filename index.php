<?php header('Access-Control-Allow-Origin: *');



function func1(){
	return "this is function1";
}

function func2(){
	return "this is function2";
}

function checkPassWord($username,$password){
	//return $username==$password;
	return "chekcLogin";
}
	
}

if(isset($_POST['funcName'])){
	echo {{"hey":"ho"}};
	return;
	$fn = $_POST['funcName'];
	switch($fn){
		case 'func1':
			echo func1();
			break;
			
		case 'func2':
			echo func2();
			break;
			
		case 'tryLogin':
			$username = $_POST['username'];
			$password = $_POST['password'];
			echo checkPassWord($username,$password);
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
