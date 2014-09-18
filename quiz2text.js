function readQuestion() {
	var quizname = sessionStorage.getItem("quizname");

	var questions = [];
	//ajax call to get questions
	console.log("Getting Date");
	var courseCode;
	//$scope._initial = new Date();
	//$scope._initial = $scope._initial.getTime());
	//console.log("Initial Time: "+$scope._initial.getTime());
	$.ajax({
			url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
			type : 'post',
			data : {
				"funcName" : "getAllQuestionsFromQuiz",
				"quizname" : quizname
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


						questions.push(question);
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

						questions.push(question);
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




						questions.push(question);


					}

				}
				loaded = true;
				$apply();
		
				$.ajax({
					url : 'http://shrouded-earth-7234.herokuapp.com/processQuery.php',
					type : 'post',
					data : {
						"funcName" : "getCourseCodeOfQuiz.php",
						"quizname" : quizname
					},
					success : function(response) {
						alert("course code is "+response);
						courseCode = response;



					}
				);


			}

		});


	var text = "Quiz Name:" + quizname+"\n";
	text+="Course Code:"+courseCode+"\n";
	text+="\n";
	for(int i=0;i<questions.length;i++){
		//get appropriate panswers text
		var possibleAnswersText = "";
		if(quesiton.type==0){
			possibleAnswersText+="Possible Answers:"+quesiton.p1+","+question.p2+","+question.p3+","+question.p4;
		}else{
			possibleAnswersText+="Possible Answers:";
		}

		//get appropritate type text
		var typeText ="";
		if(question.type==0){
			typeText = "multi";
		}else if(question.type==1){
			typeText = "number";
		}else if (question.type==2){
			typeText = "text"
		}

		//get appropriate tolerance text
		var toleranceText = "0";
		if(question.type==1){
			toleranceText=question.tolerance;
		}
		var question = questions[i];
		text+="Question"+"\n";
		text+="---------"+"\n";
		text+="<Body>"+"\n";
		text+=question.body+"\n";
		text+="<BodyEnd>"+"\n";
		text+=possibleAnswersText+"\n";
		text+="Correct Answer:"+question.canswer+"\n";
		text+="Type:"+typeText+"\n";
		text+="Tolerance:"+toleranceText+"\n";
		text+="Image Name:"+question.imagename+"\n"
	}
	
	alert(text);

}


