<?php header('Access-Control-Allow-Origin: *');



function func1(){
	return "this is function1";
}

function func2(){
	return "this is function2";
}

//function checkPassWord($username,$password){
	//return $username==$password;
	//return "chekcLogin";
//}
	
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
		//case 'tryLogin':
		//	echo "checkPassword";			
			//$username = $_POST['username'];
			//$password = $_POST['password'];
			//echo checkPassWord($username,$password);
			//break;
			
}



?>
