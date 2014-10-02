'use strict';

quizList.controller('quizCtrl',function quizCtrl($scope) {
	$scope.quizes = [];
	$scope.courses = [];
	$scope.loaded = false;

	$scope.getStuff = function(){
		getCourses();
		getQuizes();

		// 
		for(var i=0;i<quizes.length;i++){
			
		}
	}

	$scope.getCourses = function(){
		$.ajax({
			url:'http://shrouded-earth-7234.herokuapp.com/GetAllCourses.php',
			type: 'post',
			success: function(response){
				console.log(response);
				$scope.courses.push(response);
				$scope.loaded=true;
				$scope.apply();
			}
		})
	}

	$scope.getQuizes = function() {

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
						$scope.quizes.push(instanceDeets[0]+":"+instanceDeets[1]);
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
		window.location = "./indexAng.html";
	}//end func

	$scope.init = function () {
	console.log("test test");
	alert("test");
	};

});//end controller
