'use strict';

results.controller('resultsCtrl', function questionCtrl($scope) {
	$scope.results = [];

	$scope.getResults = function() {
		$.ajax({
			url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type : 'post',
			data : {
				"funcName" : "getResults",
				"username" : sessionStorage.getItem('username').trim(),
				"password" : sessionStorage.getItem('password').trim()
			},
			success : function(response) {
				console.log(response);
				for (var i = 0; i < JSON.parse(response).length; i++) {
					var questionJSON = JSON
							.parse(JSON.parse(response)[i]["row_to_json"]);
					
					questionJSON["score"] = questionJSON["score"]*100;
					$scope.results.push(questionJSON);
				}
				$scope.$apply();
			}

		});
	}
});
