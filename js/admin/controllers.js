'use strict';

admin.controller('adminCtrl', function adminCtrl($scope) {
	$scope.results = [];
	$scope.safeToShow = false;
	$scope.getAllResults = function() {
		console.log("hello");
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
				data: {"funcName":"getQueryResults","fname": fnameinput.value,"lname": lnameinput.value, "quiz": quizinput.value},
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
