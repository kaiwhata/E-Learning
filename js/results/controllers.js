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
						console.log(response)

						var array = response;

						var questionArray = [];
						for (var i = 0; i < JSON.parse(array).length; i++) {
							var questionJSON = JSON
									.parse(JSON.parse(array)[i]["row_to_json"]);
							console.log(questionJSON);
							questionArray.push(questionJSON);

							// MULTI TYPE
							if (questionJSON.type == 0) {
								var answer = questionJSON["canswer"];
								var body = questionJSON["body"];
								var id = questionJSON["id"];

								var answerIdx = 0;

								var p1 = questionJSON["p1"];
								if (p1 == answer) {
									answerIdx = 0;
								}
								var p2 = questionJSON["p2"];
								if (p2 == answer) {
									answerIdx = 1;
								}
								var p3 = questionJSON["p3"];
								if (p3 == answer) {
									answerIdx = 2;
								}
								var p4 = questionJSON["p4"];
								if (p4 == answer) {
									answerIdx = 3;
								}

								var options = [ p1, p2, p3, p4 ];
								var question = new MultiChoiceQuestion(
										id, body, answerIdx,
										options)
								$scope.questions.push(question);
							}
							// NUMBER TYPE
							else if (questionJSON.type == 1) {
								var answer = questionJSON["canswer"];
								var body = questionJSON["body"];
								var id = questionJSON["id"];
								var tol = questionJSON["tolerance"];
								var question = new NumberEntryToleranceQuestion(
										id, body, answer, tol);
								$scope.questions.push(question);
							}
							// TEXT TYPE
							else if (questionJSON.type == 2) {
								var answer = questionJSON["canswer"];
								var body = questionJSON["body"];
								var id = questionJSON["id"];
								var answerArray = [ answer ];
								var question = new TextEntryQuestion(
										id, body, answerArray);
								$scope.questions.push(question);
							}
						}
						 $scope.$apply();
					}

				});
	}});
