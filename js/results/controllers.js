'use strict';

results.controller('resultsCtrl', function questionCtrl($scope) {
	$scope.results = ["very good","not very good"];

	$scope.sendResult = function() {
		$.ajax({
			url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type : 'post',
			data : {
				"funcName" : "sendResults",
				"username" : "hawkinchri",
				"password" : "dogs",
				"quizname" : sessionStorage.getItem('quizname')
				"score " : 0.75
			},
			success : function(response) {
				console.log(response)
				 $scope.$apply();
			}

		});
	}
});
