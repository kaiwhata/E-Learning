'use strict';

quizList.controller('adminQuizCtrl',function quizCtrl($scope) {
	$scope.quizzes = [];
	$scope.loaded = false;

	$scope.getQuizzes = function() {

		$.ajax({
			url:'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type: 'post',
			data: {"funcName":"getQuizzes"},
				success: function(response){
					console.log("boo:"+response);
					var instanceArray = response.split("*");

					// loop this
					for(var i=1;i<instanceArray.length;i++){
						var instanceDeets = instanceArray[i].split(":");
//						console.log("thing: "+instanceDeets[i]+" "+instanceDeets[i+1]);
						var quizJobject = {name:instanceDeets[1],courseCode:instanceDeets[0]};
						$scope.quizzes.push(quizJobject);
						// create button
						$scope.loaded=true;
						$scope.$apply();

					}//end for

				}//end success
			});//end ajax
		}//end getQuizesFunction

	$scope.verifyAdmin = function(){
	    console.log("Check if admin is logged in");
	 	 $.ajax({
			url:'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type: 'post',
			data: {"funcName":"checkPasswordAdmin","username":sessionStorage.getItem('username'),"password":sessionStorage.getItem('password').trim()},
			success: function(response){

				if(response.indexOf("true")!=-1){
					alert("it is true");
					$scope.safeToShow = true;
				}
				else{
					alert("Incorrect username or password");
	 				window.location = "./login-fancy.html";
	 				return;
				}
				console.log(response);
				console.log("username from session"+sessionStorage.getItem('username').trim());
				console.log("password from session"+sessionStorage.getItem('password').trim());
			}
		});
	}


	$scope.selectQuiz = function(quizString) {
		console.log("quizString is "+quizString);
		var sp = quizString.split(":");
		var code = sp[0];
		var quizname = sp[1];
		sessionStorage.setItem("quizname",quizname);
		window.location = "./indexAng.html";
	}//end func

	$scope.editQuiz = function(quizName){
		sessionStorage.setItem("quizname",quizName);
		window.location = "./quizInsert.html";
	}

	$scope.deleteQuiz = function(quizName) {

		// remove from quizzes the delteed thing
		var newArray = []
		for(var i=0;i<$scope.quizzes.length;i++){
			var quizJobject = $scope.quizzes[i];

				if(quizJobject.name==quizName){

				}else{
					newArray.push(quizJobject);
				}
		}
		$scope.quizzes = newArray;
		$scope.$apply();
		//remove it from the db
		$.ajax({
			url : 'http://shrouded-earth-7234.herokuapp.com/deleteQuiz.php',
			type : 'post',
			data : {
				"quizName" : quizName.trim()
			},
			success : function(response) {
				$scope.$apply();
			}

		});
	}
});//end controller
