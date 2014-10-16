'use strict';

quizList.controller('quizCtrl',function quizCtrl($scope) {
	$scope.quizes = [];
	$scope.courses = [];

	$scope.map_courseCode = [];
	$scope.map_quiz = [];

	$scope.chrisMap = {};

	$scope.qui = [];

	$scope.loaded = false;

	$scope.selectedCode = "COMP422";
	$scope.quizzes = [];

	$scope.test = ["hi","bye"];


	$scope.getStuff = function(){

		$scope.getCourses();


	}

	$scope.callBack = function(){
	// figure out how many courses there are
		var numCourses = $scope.courses.length;


		// for each quiz
		for(var i=0; i<$scope.quizes.length;i++){
			var code = ""+$scope.quizes[i].split(":")[0];
			var name = ""+$scope.quizes[i].split(":")[1];


			if($scope.chrisMap[code.trim()]==null){
				continue;
			}

			$scope.chrisMap[code].push(name);
		}

		$scope.$apply();
	}

	$scope.getCourses = function(){

		$.ajax({
			url:'http://shrouded-earth-7234.herokuapp.com/getAllCourses.php',
			type: 'post',
			success: function(response){
				for(var i=0;i<JSON.parse(response).length;i++){
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


					var instanceArray = response.split("*");
					// loop this
					for(var i=1;i<instanceArray.length;i++){
						var instanceDeets = instanceArray[i].split(":");
						$scope.quizes.push(instanceDeets[0]+":"+instanceDeets[1]);
						// create button
						$scope.loaded=true;
						$scope.$apply();


					}//end for

					$.ajax({
						url:'http://shrouded-earth-7234.herokuapp.com/getStudentsCourses.php',
						type: 'post',
						data: {'username':sessionStorage.getItem("username")},
						success: function(response){

							
							var jsonArray = JSON.parse(response);
							for(var i=0;i<jsonArray.length;i++){
								var jobject = jsonArray[i];
								$scope.chrisMap[jobject.code.trim()]=[];
							}
							
							$scope.callBack();
						}
					});
					
				}//end success
			});//end ajax
		}//end getQuizesFunction


	$scope.selectQuiz = function(quizString) {
		// var sp = quizString.split(":");
		// var code = sp[0];
		// var quizname = sp[1];
		quizString = quizString.trim();
		sessionStorage.setItem("quizname",quizString);
		window.location = "./quiz.html";
	}//end func

	$scope.clickCourse = function(courseName){

		// figure out code using index
		// $scope.selectedCourse = Object.keys($scope.chrisMap)[index];
		$scope.selectedCourse = courseName;

		// populate quizzes array

		$scope.quizzes = [];

		var arr = $scope.chrisMap[courseName]
		for(var i=0;i<arr.length;i++){
			$scope.quizzes.push(arr[i]);
		}
		// var stri = $scope.chrisMap[$scope.selectedCourse]+"";
		// var arra = stri.split(",");

		// for(var i=0;i<arra.length;i++){
		// 	$scope.quizzes.push(arra[i]);
		// }

	}

});//end controller
