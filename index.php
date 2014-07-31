<html>
<head><title>I am afish</title></head>
<body>
<?php header('Access-Control-Allow-Origin: *');
echo "hello world";

function func1(){
	return "this is function1";
}

function func2(){
	return "this is function2";
}

function checkPassWord($username,$password){
	return $username==$password;
	return "chekcLogin";
}
	
if(isset($_POST['funcName'])){
  echo $_POST['funcName'];
}
?>
</body>
</html>