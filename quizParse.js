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

	insertQuiz(quizName, quizCode,questionTexts);// the database requires a quiz name before

}

function submitQuestions(quizName,quizCode,questionTexts){

	var questions=[];
	for (var i = 1; i < questionTexts.length; i++) {
		var question={};
		var questionLines = questionTexts[i].split("\n");

		var currentIndex = 2;// the first element after <body> tag
		var bodyText = "";
		while (questionLines[++currentIndex].indexOf("<BodyEnd>")==-1) {
			bodyText = bodyText + questionLines[currentIndex];
		}


		question["body"] = bodyText;

		//skip past body end
		currentIndex++;
		while (currentIndex < questionLines.length) {
			var line = questionLines[currentIndex];
			var lineArray = line.split(":");
			if (lineArray.length < 2) {
				question[lineArray[0].trim()] = "";
			} else {
				question[lineArray[0].trim()] = lineArray[1].trim();
			}
			currentIndex++;
		}

		questions.push(question);
	}

	for(var k =0;k<questions.length;k++){
		var q = questions[k];
		var type = parseInt(name2num[q["Type"]]);

		//check if q is multi
		if(q["Possible Answers"] != ""){
			insertPossibleAnswers(q,quizName);
			//TODO search for possible answer id
			//q["Possible Answers"] =
		}else{
			// convert type
			insert(q["body"], q["Possible Answers"], q["Correct Answer"], type,
					q["Tolerance"], quizName, q["Image Name"]);
		}

	}
}

// use ajax function to insert into databsae
function insert(body, panswerid, canswer, type, tolerance, quizname, imagename) {
	console.log("test function call");
	console.log("Values entered: " + body + " " + canswer + " " + type + " "
			+ tolerance + " " + quizname);
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
			console.log(response);

			if (response.indexOf("success") == -1) {
				alert("question not added");
			} else {
				alert("question entered");
			}
		}

	});
}


//Deal with the case of having possible answers,
//We must insert the possible answers first, then search for the id
function insertPossibleAnswers(possibleAnswerQuestion,quizName) {
	// TODO
	var panswerLine = possibleAnswerQuestion["Possible Answers"];
	var panswerArray = panswerLine.split(",");


	$.ajax({
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
			console.log(response);
			var panswerid = parseInt(response);
			var type = parseInt(name2num[possibleAnswerQuestion["Type"]]);

			insert(possibleAnswerQuestion["body"], panswerid, possibleAnswerQuestion["Correct Answer"], type,
					possibleAnswerQuestion["Tolerance"], quizName, possibleAnswerQuestion["Image Name"]);
		}

	});

}

function insertQuiz(quizname, coursecode,questionTexts) {
	$.ajax({
		url : 'http://shrouded-earth-7234.herokuapp.com/processQuizEntry.php',
		type : 'post',
		data : {
			"funcName" : "InsertQuiz",
			"quizname" : quizname,
			"coursecode" : coursecode
		},
		success : function(response) {
			console.log(response);
			submitQuestions(quizname,coursecode,questionTexts);

			if (response.indexOf("success") == -1) {
				alert("quiz not added");
			} else {
				alert("quiz entered");
			}
		}

	});
}
