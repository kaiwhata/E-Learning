function readQuestion() {
	var quizname = sessionStorage.getItem("quizname");
	if (quizname == null) return;
	var questions = [];
	// ajax call to get questions
	console.log("Getting Date");
	var courseCode;
	// $scope._initial = new Date();
	// $scope._initial = $scope._initial.getTime());
	// console.log("Initial Time: "+$scope._initial.getTime());
	$
			.ajax({
				url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
				type : 'post',
				data : {
					"funcName" : "getAllQuestionsFromQuiz",
					"quizname" : quizname
				},
				success : function(response) {

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
							var image = questionJSON["imagename"];
							var question = new MultiChoiceQuestion(id, body,
									answerIdx, options, image)
							
							question.modelanswer = questionJSON["modelanswer"];
							
							console.log("Multi: "+question.questionType);
							
							questions.push(question);
						}
						// NUMBER TYPE
						else if (questionJSON.type == 1) {
							var answer = questionJSON["canswer"];
							var body = questionJSON["body"];
							var id = questionJSON["id"];
							var tol = questionJSON["tolerance"];
							var image = questionJSON["imagename"];
							var question = new NumberEntryToleranceQuestion(id,
									body, answer, tol, image);
							
							question.modelanswer = questionJSON["modelanswer"];
							
							console.log("Number: "+question.questionType);
							
							questions.push(question);
						}
						// TEXT TYPE
						else if (questionJSON.type == 2) {
							var answer = questionJSON["canswer"];
							var body = questionJSON["body"];
							var id = questionJSON["id"];
							var answerArray = [ answer ];
							var image = questionJSON["imagename"];

							var question = new TextEntryQuestion(id, body,
									answerArray, image);
							
							question.modelanswer = questionJSON["modelanswer"];
							
							console.log("Text: "+question.questionType);
							
							questions.push(question);

						}

					}
					loaded = true;

					$
							.ajax({
								url : 'http://shrouded-earth-7234.herokuapp.com/getCourseCodeOfQuiz.php',
								type : 'post',
								data : {
									"quizName" : quizname
								},
								success : function(response) {
									courseCode = response.trim();
									console.log("php response is: " + response);
									var text = "Quiz Name:" + quizname + "\n";
									console.log("Text: "+text);
									text += "Course Code:" + courseCode + "\n";
									console.log("Text: "+text);
									text += "\n";
									for (var i = 0; i < questions.length; i++) {
										var question = questions[i];

										// get appropriate panswers text
										var possibleAnswersText = "";
										if (question.questionType == "multi") {
											possibleAnswersText += "Possible Answers:"
													+ question.optionsText[0]
													+ ","
													+ question.optionsText[1]
													+ ","
													+ question.optionsText[2]
													+ ","
													+ question.optionsText[3];
										} else {
											possibleAnswersText += "Possible Answers:";
										}

										// get appropritate type text

										// get appropriate tolerance text
										var toleranceText = "0";
										
										if (question.questionType
												.indexOf("number") != -1) {
											toleranceText = question.tolerance;
										}

										var imageText = "";
										if (question.imageURL
												&& question.imageURL
														.indexOf("null") == -1) {
											imageText = question.imageURL;
										}

										text += "Question" + "\n";
										text += "---------" + "\n";
										text += "<Body>" + "\n";
										text += question.bodyText + "\n";
										text += "<BodyEnd>" + "\n";
										text += "<ModelAnswer>" + "\n";
										text += question.modelanswer + "\n";
										text += "<ModelAnswerEnd>" + "\n";
										text += possibleAnswersText + "\n";
										text += "Correct Answer:"
												+ question.answerText + "\n";
										text += "Type:" + question.questionType
												+ "\n";
										text += "Tolerance:" + toleranceText
												+ "\n";
										text += "Image Name:" + imageText
												+ "\n"
									}
									console.log("Text: "+text);
									document.getElementById("something").value = text;
								}
							});
				}
			});

}
