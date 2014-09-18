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


	$scope.selectQuiz = function(quizString) {
		console.log("quizString is "+quizString);
		var sp = quizString.split(":");
		var code = sp[0];
		var quizname = sp[1];
		sessionStorage.setItem("quizname",quizname);
		window.location = "http://shrouded-earth-7234.herokuapp.com/indexAng.html";
	}//end func


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
				"quizName" : quizName
			},
			success : function(response) {
				$scope.$apply();
			}

		});
	}
});//end controller
