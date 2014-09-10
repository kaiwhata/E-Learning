'use strict';

questionList
		.controller(
				'questionCtrl',
				function questionCtrl($scope) {
					$scope.questions = [];
					//$scope.loaded = false;

					// $scope.answer = false;
					// $scope.answer1;
					// $scope.answer2;
					// $scope.answer3;

					// // Make dummy multiChoiceQuestions
					// //
					// var mcq = new MultiChoiceQuestion("1", "what is apples?",
					// 1, [ "banana", "multiple apple", "pear" ]);
					// var mcq1 = new MultiChoiceQuestion("2", "what is
					// banana?",
					// 0, [ "banana", "multiple apples", "pear" ]);
					// var mcq2 = new MultiChoiceQuestion("3", "what is pear?",
					// 2,
					// [ "banana", "multiple apple", "pear" ]);
					//
					// $scope.questions.push(mcq);
					// $scope.questions.push(mcq1);
					// $scope.questions.push(mcq2);
					//
					// // Make Dummy Text Questions
					// var teq1 = new TextEntryQuestion("4",
					// "How do you greet people in French?", [ "salut",
					// "bonjour" ])
					// var teq2 = new TextEntryQuestion(
					// "5",
					// "Complete the sentnce: We have lots of _____ at the
					// arcade",
					// [ "games" ])
					// //
					// $scope.questions.push(teq1);
					// $scope.questions.push(teq2);
					//
					// // Make Dummy Number Question
					// var neq1 = new NumberEntryQuestion("6", "What is 10+10?",
					// 20);
					// var neq2 = new NumberEntryToleranceQuestion("7",
					// "What is 1/3?", 0.333, 0.0015);
					// $scope.questions.push(neq1);
					// $scope.questions.push(neq2);

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
								if (q.checkAnswer(chosenIndex)){
									score++;
									alert("CORRECT!  the answer was "+q.answerText);



								}else{

									alert("INCORRECT!  the answer was "+q.answerText);
								}
							}

							else if (q instanceof TextEntryQuestion
									|| q instanceof NumberEntryToleranceQuestion
									|| q instanceof NumberEntryQuestion) {
								var answer = document.getElementById("a" + i).value;
								console.log(answer);
								if (q.checkAnswer(answer)){
									score++;
									alert("CORRECT!  the answer was "+q.answerText);

								}else{
									alert("INCORRECT!  the answer was "+q.answerText);
									}
							}

						}
						var per = score / total;

						$
						.ajax({
							url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
							type : 'post',
							data : {
								"funcName" : "sendResults",
								"username" : sessionStorage.getItem('username'),
								"password" : sessionStorage.getItem('password'),
								"quizname" : sessionStorage.getItem('quizname'),
								"score" :per

							},
							success : function(response){
								console.log("hey");

								console.log(response);

							}

						});


						console.log("MYSCORE: " + per);
					}

					$scope.getQuestions = function() {
						var _initial = new Date();
						console.log("Date: "+_initial.getTime())
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
												var image=questionJSON["imagename"];
												var question = new MultiChoiceQuestion(
														id, body, answerIdx,
														options, image)


												$scope.questions.push(question);
											}
											// NUMBER TYPE
											else if (questionJSON.type == 1) {
												var answer = questionJSON["canswer"];
												var body = questionJSON["body"];
												var id = questionJSON["id"];
												var tol = questionJSON["tolerance"];
												var image=questionJSON["imagename"];
												var question = new NumberEntryToleranceQuestion(
														id, body, answer, tol, image);

												$scope.questions.push(question);
											}
											// TEXT TYPE
											else if (questionJSON.type == 2) {
												var answer = questionJSON["canswer"];
												var body = questionJSON["body"];
												var id = questionJSON["id"];
												var answerArray = [ answer ];
												var image=questionJSON["imagename"];

												var question = new TextEntryQuestion(
														id, body, answerArray, image);

												


												$scope.questions.push(question);


											}
											
										}
										$scope.loaded = true;
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


					$scope.test = function(){
						//test log in correct name
						$.ajax({
							url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
							type : 'post',
							data : {
								"funcName" : "checkPassword",
								"username" : "hawkinchri",
								"password" : "dogs"
							},
							success : function(response) {
								console.log("hawkinchri+dogs"+response);
								if(response.indexOf("true")!=-1){
									alert("WORKING: checking  correct passwords work");
								}else{
									alert("BROKEN: checking correct passwords doesn't work");
								}
							}

						});


						//test log in incorrect name
						$.ajax({
							url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
							type : 'post',
							data : {
								"funcName" : "checkPassword",
								"username" : "hawkinchri",
								"password" : "ffff"
							},
							success : function(response) {
								console.log(response);
								if(response.indexOf("false")!=-1){
									alert("WORKING: checking incorrect passwords doesn't work");
								}else{
									alert("BROKEN: checking incorrect passwords work");
								}
							}

						});

						//test log in admin incorrect name
						$.ajax({
							url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
							type : 'post',
							data : {
								"funcName" : "checkPasswordAdmin",
								"username" : "elf",
								"password" : "learning"
							},
							success : function(response) {
								console.log(response);
								if(response.indexOf("true")!=-1){
									alert("WORKING: checking passwords works with admins");
								}else{
									alert("BROKEN: checking passwords with admin is broken");
								}
							}

						});

						$.ajax({
							url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
							type : 'post',
							data : {
								"funcName" : "checkPasswordAdmin",
								"username" : "elf",
								"password" : "notlearning"
							},
							success : function(response) {
								console.log(response);
								if(response.indexOf("false")!=-1){
									alert("WORKING: checking wrong passwords works for admin");
								}else{
									alert("BROKEN: checking wrong passwords doesn't work for admin");
								}
							}

						});

					}


				});
