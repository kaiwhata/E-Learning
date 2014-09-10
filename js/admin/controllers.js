'use strict';

admin.controller('adminCtrl', function adminCtrl($scope) {
	$scope.results = [];
	$scope.safeToShow = false;
	$scope.getAllResults = function() {
		console.log("hello");

		$.ajax({
			url:'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type: 'post',
			data: {"funcName":"checkPasswordAdmin","username":sessionStorage.getItem('username'),"password":sessionStorage.getItem('password')},
			success: function(response){

				if(response.indexOf("true")!=-1){
					$scope.safeToShow = true;
				}
				else{
					alert("Incorrect username or password");
	 				window.location = "http://shrouded-earth-7234.herokuapp.com/login-fancy.html";
				}
				console.log(response);
				console.log("username from session"+sessionStorage.getItem('username'));
				console.log("password from session"+sessionStorage.getItem('password'));

			}

		});
	


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
	
	$scope.getQueryResults = function(){
			console.log("Starting query: ");
			$.ajax({
				url:'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
				type: 'post',
				data: {"funcName":"getQueryResults","fname": fnameinput.value,"lname": lnameinput.value, "quiz": quizinput.value, "coursecode": courseinput.value},
				success: function(response){
					console.log("Query executed: "+response);
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
