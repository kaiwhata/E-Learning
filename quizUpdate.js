document.getElementById("submit").onclick = submit;
var name2num = {
	multi : 0,
	number : 1,
	text : 2
}

function submit() {

	var questionTexts = quizInsert.quizFormat.value.split("Question");

	var headerText = questionTexts[0]
	var headerLines = headerText.split("\n");

	var QuizNameArray = headerLines[0].split(":");
	var quizName = QuizNameArray[1].trim();// quiz name, this will be used for
	// creating quiz entry and question
	// entries

	var QuizCodeArray = headerLines[1].split(":");
	var quizCode = QuizCodeArray[1];// quiz code, this will be used for creating
	// quiz entry and question entries

	insertQuiz(quizName, quizCode, questionTexts);// the database requires a
													// quiz name before

}

function submitQuestions(quizName, quizCode, questionTexts) {

	var questions = [];
	for (var i = 1; i < questionTexts.length; i++) {
		var question = {};
		var questionLines = questionTexts[i].split("\n");

		var currentIndex = 2;// the first element after <body> tag
		var bodyText = "";
		while (questionLines[++currentIndex].indexOf("<BodyEnd>") == -1) {
			bodyText = bodyText + questionLines[currentIndex];
		}

		question["body"] = bodyText;

		// skip past body end
		currentIndex++;
		while (currentIndex < questionLines.length) {
			var line = questionLines[currentIndex];
			var lineArray = line.split(":");
			if (lineArray.length < 2) {
				question[lineArray[0].trim()] = "";
			} else {
				// if it's an image combine the first and second part
				question[lineArray[0].trim()] = lineArray[1].trim();
				if (lineArray[0].indexOf("Image Name") != -1) {
					if (lineArray.length > 2) {
						question[lineArray[0].trim()] = lineArray[1].trim()+":"+(lineArray[2].trim());
					}
				}

			}
			currentIndex++;
		}

		questions.push(question);
	}

	for (var k = 0; k < questions.length; k++) {
		var q = questions[k];
		var type = parseInt(name2num[q["Type"]]);

		// check if q is multi
		// q["Correct Answer"] needs ot be formatted into lower case for text
		// entry questions
		var originalText = q["Correct Answer"];
		originalText = originalText.toLowerCase();
		originalText = originalText.trim();
		q["Correct Answer"] = originalText;

		if (q["Possible Answers"] != "") {
			insertPossibleAnswers(q, quizName);
			// TODO search for possible answer id
			// q["Possible Answers"] =
		} else {
			// convert type
			q["Possible Answers"] = -1;
			insert(q["body"], q["Possible Answers"], q["Correct Answer"], type,
					q["Tolerance"], quizName, q["Image Name"]);
		}

	}
}

// use ajax function to insert into databsae - question
function insert(body, panswerid, canswer, type, tolerance, quizname, imagename) {

	// call PHP function
	$.ajax({
		url : 'http://shrouded-earth-7234.herokuapp.com/processQuizEntry.php',
		type : 'post',
		data : {
			"funcName" : "InsertQuestion",
			"quizname" : quizname,
			"body" : body,
			"canswer" : canswer,
			"type" : type,
			"tolerance" : tolerance,
			"imagename" : imagename,
			"panswerid" : panswerid
		},
		success : function(response) {

			if (response.indexOf("success") == -1) {
				alert("question not added");
			} else {
				alert("question entered");
			}
		}

	});
}

// Deal with the case of having possible answers,
// We must insert the possible answers first, then search for the id
function insertPossibleAnswers(possibleAnswerQuestion, quizName) {
	var panswerLine = possibleAnswerQuestion["Possible Answers"];
	var panswerArray = panswerLine.split(",");

	$
			.ajax({
				url : 'http://shrouded-earth-7234.herokuapp.com/insertNewPossibleAnswers.php',
				type : 'post',
				data : {
					"funcName" : "insertNewPossibleAnswers",
					"p1" : panswerArray[0],
					"p2" : panswerArray[1],
					"p3" : panswerArray[2],
					"p4" : panswerArray[3],
				},
				success : function(response) {
					var panswerid = parseInt(response);
					var type = parseInt(name2num[possibleAnswerQuestion["Type"]]);

					insert(possibleAnswerQuestion["body"], panswerid,
							possibleAnswerQuestion["Correct Answer"], type,
							possibleAnswerQuestion["Tolerance"], quizName,
							possibleAnswerQuestion["Image Name"]);
				}

			});

}

function insertQuiz(quizname, coursecode, questionTexts) {
	$.ajax({
		url : 'http://shrouded-earth-7234.herokuapp.com/processQuizEntry.php',
		type : 'post',
		data : {
			"funcName" : "InsertQuiz",
			"quizname" : quizname,
			"coursecode" : coursecode
		},
		success : function(response) {
			submitQuestions(quizname, coursecode, questionTexts);

			if (response.indexOf("success") == -1) {
				alert("quiz not added");
			} else {
				alert("quiz entered");
			}
		}

	});
}
