'use strict';

admin.controller('adminCtrl', function adminCtrl($scope) {
	$scope.results = [];
	$scope.safeToShow = false;
	
	$scope.quizavgs = [];
	$scope.studentavgs = [];
	
	$scope.getQuizAverages = function(){
	    
	    $.ajax({
			url:'http://shrouded-earth-7234.herokuapp.com/moreStats.php',
			type: 'post',
			data: {"funcName":"getQuizAverages"},
			success: function(response){

				
				
				for (var i = 0; i < JSON.parse(response).length; i++) {
					var averageJSON = JSON.parse(response)[i];
					$scope.quizavgs.push(averageJSON);
				}
			}

		});
	}
	
	$scope.getStudentAverages = function(){
	    
	    $.ajax({
			url:'http://shrouded-earth-7234.herokuapp.com/moreStats.php',
			type: 'post',
			data: {"funcName":"getStudentAverages"},
			success: function(response){
				
				for (var i = 0; i < JSON.parse(response).length; i++) {
					var averageJSON = JSON.parse(response)[i];
					$scope.studentavgs.push(averageJSON);
				}
			}

		});
	}

	
	
	// fname lname email avg numtaken
	
	$scope.getAllResults = function() {
		if(!sessionStorage.getItem("password")){
			alert("not logged in as admin");
	 		window.location = "./login.html";
	 		return;

		}else if (!sessionStorage.getItem("username")){
			alert("not logeed in as admin");
	 		window.location = "./login.html";

	 		return;
		}
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

						$.ajax({
			url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type : 'post',
			data : {
				"funcName" : "getAllResults"
			},
			success : function(response) {
				for (var i = 0; i < JSON.parse(response).length; i++) {
					var questionJSON = JSON.parse(response)[i];
					$scope.results.push(questionJSON);
				}
				$scope.$apply();
			}

		});

			}

		});




	}

	$scope.getQueryResults = function(){
	  //, "coursecode": courseinput.value
			$.ajax({
				url:'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
				type: 'post',
				data: {"funcName":"getQueryResults","fname": fnameinput.value,"lname": lnameinput.value, "quiz": quizinput.value, "coursecode": courseinput.value},
				success: function(response){
					$scope.results = [];
					for (var i = 0; i < JSON.parse(response).length; i++) {
					  var questionJSON = JSON.parse(response)[i];
					  $scope.results.push(questionJSON);
					}
					 $scope.$apply();
				}
			});
		}


});
