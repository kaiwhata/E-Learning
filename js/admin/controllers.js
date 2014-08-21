'use strict';

admin.controller('adminCtrl', function adminCtrl($scope) {
	$scope.results = [];

	$scope.getAllResults = function() {
		console.log("hello");
		$.ajax({
			url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type : 'post',
			data : {
				"funcName" : "getAllResults"
			},
			success : function(response) {
				console.log("response returned: "+response);
				console.log(JSON.parse(response).length);
				for (var i = 0; i < JSON.parse(response).length; i++) {
					//console.log(JSON.parse(response)[i]);
					var questionJSON = JSON.parse(response)[i];
					//console.log("this is: "+questionJSON);
					var result = questionJSON["fname"]+" : "+questionJSON["lname"]+" : "+questionJSON["id"]+" : "+questionJSON["quizname"]+" : "+questionJSON["score"]+" : "+questionJSON["timetaken"]+" : "+questionJSON["date"];
					console.log(result);
					$scope.results.push(result);
				}
				$scope.$apply();
			}

		});
	}
});
