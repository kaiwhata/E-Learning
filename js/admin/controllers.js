'use strict';

admin.controller('adminCtrl', function adminCtrl($scope) {
	$scope.results = [];

	$scope.getResults = function() {
		console.log("hello");
		$.ajax({
			url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type : 'post',
			data : {
				"funcName" : "getAllResults"
			},
			success : function(response) {
				console.log("ioahfoihaw "+response);
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
