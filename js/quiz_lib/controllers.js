'use strict';

quizList.controller('quizCtrl',function quizCtrl($scope) {
	$scope.quizes = [];
	$scope.courses = [];

	$scope.map_courseCode = [];
	$scope.map_quiz = [];	

	$scope.chrisMap = {};

	$scope.qui = [];

	$scope.loaded = false;

	$scope.getStuff = function(){
		
		$scope.getCourses();

	
	}

	$scope.callBack = function(){
	// figure out how many courses there are
		var numCourses = $scope.courses.length;


	console.log($scope.quizes);
		// for each quiz
		for(var i=0; i<$scope.quizes.length;i++){
			var code = $scope.quizes[i].split(":")[0];
			var name = $scope.quizes[i].split(":")[1];
			
			if($scope.chrisMap[code]==null){
				$scope.chrisMap[code]=[];
			}

			$scope.chrisMap[code].push(name);
		}
		console.log($scope.chrisMap);
		$scope.$apply();
	}

	$scope.getCourses = function(){
		
		$.ajax({
			url:'http://shrouded-earth-7234.herokuapp.com/getAllCourses.php',
			type: 'post',
			success: function(response){
				console.log("Hi "+response);
				for(var i=0;i<JSON.parse(response).length;i++){
					console.log("a;lkhfoiwaehfoia: "+JSON.parse(JSON.parse(response)[i]["row_to_json"]));
					$scope.courses.push(JSON.parse(JSON.parse(response)[i]["row_to_json"]));	
				}
				
				$scope.loaded=true;
				$scope.$apply();
				$scope.getQuizes();

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
					$scope.callBack();
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

});//end controller
