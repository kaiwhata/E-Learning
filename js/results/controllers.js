'use strict';

results.controller('resultsCtrl', function questionCtrl($scope) {
	$scope.results = ["very good","not very good"];

	$scope.getResults = function() {
		$
				.ajax({
					url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
					type : 'post',
					data : {
						"funcName" : "getResults",
						"username" : sessionStorage.getItem('username'),
						"password" : sessionStorage.getItem('password')
					},
					success : function(response) {
						console.log(response);
						 $scope.$apply();
					}

				});
	}});
