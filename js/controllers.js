'use strict';

questionList
		.controller(
				'questionCtrl',
				function questionCtrl($scope) {
					$scope.questions = [];

					$scope._initial;
					$scope._final;

					$scope.timetaken;

					$scope.datetaken;
					$scope.modelAnswer = "Test this is model answer";

					$scope.hasTakenQuiz = true;

					$scope.showThing = false;

					$scope.checkIfTaken = function(){
						var username = sessionStorage.getItem("username");
						var quizname = sessionStorage.getItem("quizname").trim();


						$
						.ajax({
							url : 'http://shrouded-earth-7234.herokuapp.com/hasTakenQuiz.php',
							type : 'post',
							data : {
								"name" : username,
								"quizname" : quizname
							},
							success : function(response) {
								if(Number(response)==1){
									$scope.showThing = true;
									document.getElementById("checkButton").disabled = true;
									$scope.$apply();

								}else{
									$scope.showThing = false;
									document.getElementById("checkButton").disabled = false;
									$scope.$apply();
								}

								//alert(response);
							}

						});
					}

					$scope.getQuestions = function() {

						var d = new Date();

						// get start time
						var n = d.getTime();
						$scope._initial = n;

						// get start date
						var str = d+""


						$scope.datetaken = str.substring(4,15);

						var thing = sessionStorage.getItem('quizname');
						if(thing != null){
							thing = thing.trim();
						}

						$.ajax({
									url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
									type : 'post',
									data : {
										"funcName" : "getAllQuestionsFromQuiz",
										"quizname" : thing
									},
									success : function(response) {

										var array = response;

										var questionArray = [];
										for (var i = 0; i < JSON.parse(array).length; i++) {
											var questionJSON = JSON
													.parse(JSON.parse(array)[i]["row_to_json"]);
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

												question.modelAnswer = questionJSON["modelanswer"];

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
												
												question.modelAnswer = questionJSON["modelanswer"];

												
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


												question.modelAnswer = questionJSON["modelanswer"];

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
										"quizname" : sessionStorage.getItem('quizname').trim()
									},
									success : function(response) {

										var array = response;
										var answers = [];
										var j = 1;

										var questionArray = [];
										for (var i = 0; i < JSON.parse(array).length; i++) {
											var questionJSON = JSON.parse(JSON.parse(array)[i]["row_to_json"]);
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



					/**
					 * And displays on the page
					 */
					$scope.checkAnswers2 = function() {
						var d = new Date();
						var n = d.getTime();

						$scope._final = n;

						// minus the final by inital
						var diff = $scope._final - $scope._initial;

						var seconds = 1000;

						diff = Math.round(diff / seconds);


						$scope.timetaken = diff;

						var score = 0;
						var total = 0;
						var failed = false;
						var problems =[];
						var problemsMessage ="";
						var output="Results:";
						var one = 1;

							for (var i = 0; i < $scope.questions.length; i++) {
								try{

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
											var result = "CORRECT! Answer for question " + (i+one) + " is:" + q.answerText;
											document.getElementById("result"+i).innerHTML =result;
											document.getElementById("result"+i).style.color = "green";
											document.getElementById("resultsBox"+i).style.opacity = 0;
											$("#resultsBox"+i).animate({opacity:"1"},1000)


										}else{

											var result = "INCORRECT! Answer for question " + (i+one) + " is:" + q.answerText;
											document.getElementById("result"+i).innerHTML =result;
											document.getElementById("result"+i).style.color = "red";
											document.getElementById("resultsBox"+i).style.opacity = 0;
											$("#resultsBox"+i).animate({opacity:"1"},1000)
										}
									}



									else if (q instanceof TextEntryQuestion
											|| q instanceof NumberEntryToleranceQuestion
											|| q instanceof NumberEntryQuestion) {
										var answer = document.getElementById("a" + i).value;
										if (q.checkAnswer(answer)){
											score++;
											var result = "CORRECT! Answer for question " + (i+one) + " is:" + q.answerText;
											document.getElementById("result"+i).innerHTML =result;
											document.getElementById("result"+i).style.color = "green";
											document.getElementById("resultsBox"+i).style.opacity = 0;
											$("#resultsBox"+i).animate({opacity:"1"},1000)

										}else{


											var result = "INCORRECT! Answer for question " + (i+one) + " is:" + q.answerText;
											document.getElementById("result"+i).innerHTML =result;
											document.getElementById("result"+i).style.color = "red";
											document.getElementById("resultsBox"+i).style.opacity = 0;
											$("#resultsBox"+i).animate({opacity:"1"},1000+i*500)
											}
									}
								}catch(err){

										failed = true;
										//problems.push("Question"+i+" "+err.message+"\n");
										var displayIndex=i+1;
										problemsMessage= "<br>" + problemsMessage+"Question"+displayIndex+" "+err.message+"\n" + "</br>";
								}
							}
							var per = score / total;
							if(failed){
								problemsMessage=problemsMessage+"\n"+"please try again";
								//alert(problemsMessage);
								document.getElementById("errorText").innerHTML = problemsMessage;
								document.getElementById("answerText").innerHTML = "";

								return;
							}else{
								document.getElementById("errorText").innerHTML = "";
								document.getElementById("checkButton").disabled = true;
								document.getElementById("checkButton").innerHTML = "Submitted";
							}
							var username = sessionStorage.getItem('username').trim();
							var password = sessionStorage.getItem('password').trim();
							var quizname = sessionStorage.getItem('quizname').trim();
							var tt = $scope.timetaken;
							var date = $scope.datetaken
							$.ajax({
								url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
								type : 'post',
								data : {
									"funcName" : "sendResults",
									"username" : username,
									"password" : password,
									"quizname" : quizname,
									"timetaken" : tt,
									"score" :per,
									"date" : $scope.datetaken

								},
								success : function(response){

								}

							});

							$scope.showThing = true;
							$scope.$apply();

					}

					$scope.init = function(){
						$scope.checkIfTaken();
						$scope.getQuestions();
					}
				});
