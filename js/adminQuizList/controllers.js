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
					var instanceArray = response.split("*");

					// loop this
					for(var i=1;i<instanceArray.length;i++){
						var instanceDeets = instanceArray[i].split(":");
						var quizJobject = {name:instanceDeets[1],courseCode:instanceDeets[0]};
						$scope.quizzes.push(quizJobject);
						$scope.loaded=true;
						$scope.$apply();
					}//end for

				}//end success
			});//end ajax
		}//end getQuizesFunction

	$scope.verifyAdmin = function(){
	 	 $.ajax({
			url:'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type: 'post',
			data: {"funcName":"checkPasswordAdmin","username":sessionStorage.getItem('username'),"password":sessionStorage.getItem('password').trim()},
			success: function(response){

				if(response.indexOf("true")!=-1){
					$scope.safeToShow = true;
				}
				else{
					alert("Incorrect username or password");
	 				window.location = "./login.html";
	 				return;
				}

			}
		});
	}


	$scope.selectQuiz = function(quizString) {
		var sp = quizString.split(":");
		var code = sp[0];
		var quizname = sp[1];
		sessionStorage.setItem("quizname",quizname);
		window.location = "./quiz.html";
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
