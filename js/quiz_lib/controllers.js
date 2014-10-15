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


	console.log($scope.quizes);
		// for each quiz
		for(var i=0; i<$scope.quizes.length;i++){
			var code = ""+$scope.quizes[i].split(":")[0];
			var name = ""+$scope.quizes[i].split(":")[1];

			console.log("chris says: "+code);

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
		console.log("quizString is "+quizString);
		// var sp = quizString.split(":");
		// var code = sp[0];
		// var quizname = sp[1];
		quizString = quizString.trim();
		sessionStorage.setItem("quizname",quizString);
		window.location = "./indexAng.html";
	}//end func

	$scope.clickCourse = function(index){
		console.log(index);

		// figure out code using index
		$scope.selectedCourse = Object.keys($scope.chrisMap)[index];
		console.log("Code is: "+$scope.selectedCourse);

		// populate quizzes array

		$scope.quizzes = [];

		console.log("HI: "+$scope.chrisMap[$scope.selectedCourse]);
		var stri = $scope.chrisMap[$scope.selectedCourse]+"";
		var arra = stri.split(",");

		for(var i=0;i<arra.length;i++){
			console.log(arra[i]);
			$scope.quizzes.push(arra[i]);
		}

	}

});//end controller
