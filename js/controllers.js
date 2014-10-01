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

					/**
					 * Check all the answers of questions and alert the user if
					 * right or wrong
					 */
					$scope.checkAnswers = function() {
						var d = new Date();
						var n = d.getTime();

						$scope._final = n;

						// minus the final by inital
						var diff = $scope._final - $scope._initial;

						var seconds = 1000;

						diff = Math.round(diff / seconds);

						console.log("times: "+$scope._initial+" "+$scope._final+" "+diff);

						$scope.timetaken = diff;

						var score = 0;
						var total = 0;
						var failed = false;
						var problems =[];
						var problemsMessage ="";

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
								}catch(err){

										failed = true;
										//problems.push("Question"+i+" "+err.message+"\n");
										var displayIndex=i+1;
										problemsMessage=problemsMessage+"Question"+displayIndex+" "+err.message+"\n";
								}
							}
							var per = score / total;
							if(failed){
								problemsMessage=problemsMessage+"\n"+"please try again";
								alert(problemsMessage);

								return;
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
									console.log("Ran send results "+response);

								}

							});


							console.log("MYSCORE: " + per);

					}

					$scope.getQuestions = function() {
						console.log("Getting Date");

						var d = new Date();
						
						// get start time
						var n = d.getTime();
						$scope._initial = n;
						console.log("Time is "+n);

						// get start date
						console.log("Date: "+d);
						var str = d+""
						
						console.log(str.substring(4,15));
						
						$scope.datetaken = str.substring(4,15);

						var thing = sessionStorage.getItem('quizname');
						if(thing != null){
							thing = thing.trim();
						}
						
						//$scope._initial = new Date();
						//$scope._initial = $scope._initial.getTime());
						//console.log("Initial Time: "+$scope._initial.getTime());
						$.ajax({
									url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
									type : 'post',
									data : {
										"funcName" : "getAllQuestionsFromQuiz",
										"quizname" : thing
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
										"quizname" : sessionStorage.getItem('quizname').trim()
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

						console.log("times: "+$scope._initial+" "+$scope._final+" "+diff);

						$scope.timetaken = diff;

						var score = 0;
						var total = 0;
						var failed = false;
						var problems =[];
						var problemsMessage ="";
						var output="Marking Answered Questions:";

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
											output = output + "<br>";
											output = outut + "CORRECT! Answer for question " + i+1 + " is:" + q.answerText;
											output = output + "</br>";
											document.getElementById("answerText").innerHTML =output;
											//alert("CORRECT!  the answer was "+q.answerText);



										}else{
											output = output + "<br>";
											output = output + "INCORRECT! Answer for question " + i+1 + " is:" + q.answerText;
											output = output + "</br>";
											document.getElementById("answerText").innerHTML =output;
											//alert("INCORRECT!  the answer was "+q.answerText);
										}
									}



									else if (q instanceof TextEntryQuestion
											|| q instanceof NumberEntryToleranceQuestion
											|| q instanceof NumberEntryQuestion) {
										var answer = document.getElementById("a" + i).value;
										console.log(answer);
										if (q.checkAnswer(answer)){
											score++;
											output = output + "<br>";
											output = output +"CORRECT! Answer for question " + i+1 + " is:" + q.answerText;
											output = output + "</br>";
											document.getElementById("answerText").innerHTML =output;
											//alert("CORRECT!  the answer was "+q.answerText);

										}else{
											output = output + "<br>";
											output = output + "INCORRECT! Answer for question " + i+1 + " is:" + q.answerText;
											output = output + "</br>";
											document.getElementById("answerText").innerHTML =output;
											
											//alert("INCORRECT!  the answer was "+q.answerText);
											}
									}
								}catch(err){

										failed = true;
										//problems.push("Question"+i+" "+err.message+"\n");
										var displayIndex=i+1;
										problemsMessage=problemsMessage+"Question"+displayIndex+" "+err.message+"\n";
								}
							}
							var per = score / total;
							if(failed){
								problemsMessage=problemsMessage+"\n"+"please try again";
								alert(problemsMessage);

								return;
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
									console.log("Ran send results "+response);

								}

							});


							console.log("MYSCORE: " + per);
							console.log("output"+output);
							document.getElementById("answerText").innerHTML =output;

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
