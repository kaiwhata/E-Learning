'use strict';

questionList
		.controller(
				'questionCtrl',
				function questionCtrl($scope) {
					$scope.questions = [];
					$scope.loaded = false;
					/**
					 * Check all the answers of questions and alert the user if
					 * right or wrong
					 */
					$scope.checkAnswers = function() {
						var score = 0;
						var total = 0;
						for (var i = 0; i < $scope.questions.length; i++) {
							total++;
							var q = $scope.questions[i];

							if (q instanceof MultiChoiceQuestion) {
								var numOptions = q.optionsText.length;
								var chosenIndex = -1;// should be -1
								for (var j = 0; j < numOptions; j++) {
									var checkBoxIdentifier = "q" + i + "a" + j;
									var ticked = document
											.getElementById(checkBoxIdentifier).checked;
									if (ticked) {
										chosenIndex = j;
										break;
									}
								}
								if (q.checkAnswer(chosenIndex))
									score++;
							}

							else if (q instanceof TextEntryQuestion
									|| q instanceof NumberEntryToleranceQuestion
									|| q instanceof NumberEntryQuestion) {
								var answer = document.getElementById("a" + i).value;
								console.log(answer);
								if (q.checkAnswer(answer))
									score++;
							}

						}
						var per = score / total;
						console.log("MYSCORE: " + per);

						//send to db
						$.ajax({
							url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
							type : 'post',
							data : {
								"funcName" : "sendResults",
								"username" : sessionStorage.getItem('username'),
								"password" : sessionStorage.getItem('password'),
								"quizname" : sessionStorage.getItem('quizname'),
								"score" : per
							},
							success : function(response) {
								console.log(response)
								 $scope.$apply();
							}

						});
					}

					$scope.getQuestions = function() {

						$
								.ajax({
									url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
									type : 'post',
									data : {
										"funcName" : "getAllQuestionsFromQuiz",
										"quizname" : sessionStorage.getItem('quizname')
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
					}
					$scope.getAnswers = function() {

						
								$.ajax({
									url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
									type : 'post',
									data : {
										"funcName" : "getAllQuestionsFromQuiz",
										"quizname" : sessionStorage.getItem('quizname')
									},
									success : function(response) {
										console.log("hi "+response);

										var array = response;
										var answers = [];
										var j = 1;

										var questionArray = [];
										for (var i = 0; i < JSON.parse(array).length; i++) {
											var questionJSON = JSON.parse(JSON.parse(array)[i]["row_to_json"]);
											console.log(questionJSON.canswer);
											questionArray.push(questionJSON);
	
											answers.push(questionJSON.canswer);
											
											
										}
										for(var i=0;i<answers.length;i++){
											answers[i] = "The answer for question " + j + " is "+ answers[i] + "   \n" ;
											j++;

										}
 											j--;

											alert(answers + " Your score is: " + j);


										 $scope.$apply();
									}

								});
					}

				});