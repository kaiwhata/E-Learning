'use strict';

results.controller('resultsCtrl', function questionCtrl($scope) {
	$scope.results = [];

	$scope.getResults = function() {
		$.ajax({
			url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type : 'post',
			data : {
				"funcName" : "getResults",
				"username" : sessionStorage.getItem('username'),
				"password" : sessionStorage.getItem('password')
			},
			success : function(response) {
				console.log(response);
				for (var i = 0; i < JSON.parse(response).length; i++) {
					var questionJSON = JSON
							.parse(JSON.parse(response)[i]["row_to_json"]);
					console.log(questionJSON);
					var result = questionJSON["quizname"]+" : "+questionJSON["score"];
					$scope.results.push(result);
				}
				$scope.$apply();
			}
			//wtf mate

		});
	}
});
