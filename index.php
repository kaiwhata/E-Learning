<?php header('Access-Control-Allow-Origin: *');
echo "hello world";

function func1(){
	return "this is function1";
}

function func2(){
	return "this is function2";
}

function checkPassword($username,$password){
	return $username==$password;
	return "chekcLogin";
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
	}
  echo $_POST['funcName'];
}
?>
