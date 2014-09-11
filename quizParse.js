document.getElementById("submit").onclick = submit2;
var name2num = {
	multi : 0,
	number : 1,
	text : 2
}

// function submit() {
//
// console.log("quiz file contents: "+ quizInsert.quizFormat.value);
// // parse the imput that's copied from another file
// // insert the data into the data into the database
// var text = quizInsert.quizFormat.value;
// var arrayText = text.split("\n");
//
//
// var QuizNameArray = arrayText[0].split(":");
//
// var quizName = QuizNameArray[1].trim();// quiz name, this will be used for
// // creating quiz entry and question
// // entries
// console.log(quizName);
//
// var QuizCodeArray = arrayText[1].split(":");
// var quizCode = QuizCodeArray[1];// quiz code, this will be used for creating
// // quiz entry and question entries
// console.log(quizCode);
//
// insertQuiz(quizName,quizCode);// the database requires a quiz name before
// // we can add questions
//
// // time to start parsing the rest of the input
//
// var currentIndex = 4;// the first element after <body> tag
// var bodyText = "";
// while(arrayText[currentIndex]!="<BodyEnd>"){
// bodyText = bodyText + arrayText[currentIndex];
// currentIndex = currentIndex + 1;
// }
// console.log(bodyText);
// currentIndex = currentIndex + 1;
//
// var possibleAnswersArray = arrayText[currentIndex].split(":");
// var possibleAnswers = possibleAnswersArray[1];
// console.log(possibleAnswers);
//
//
// // we need to insert the possible answers row first, then search for the id
// insertPossibleAnswers(possibleAnswersArray);
//
// // TODO search for the id
// var panswerid = "NULL";
//
// currentIndex = currentIndex + 1;
//
// var correctAnswerArray = arrayText[currentIndex].split(":");
// var correctAnswer = correctAnswerArray[1];
// console.log(correctAnswer);
//
// currentIndex = currentIndex + 1;
//
// var typeArray = arrayText[currentIndex].split(":");
// var typeName = typeArray[1];
//
// var type =name2num[typeName];
//
// currentIndex = currentIndex + 1;
//
// var toleranceArray = arrayText[currentIndex].split(":");
// var tolerance = toleranceArray[1];
// console.log(tolerance);
//
// currentIndex = currentIndex + 1;
//
// var imageArray = arrayText[currentIndex].split(":");
// var imageName = imageArray[1];
// console.log(imageName);
//
// // next deal with possible answers, currently at <BodyEnd>, increment to
// // possibleAnswers: line
// insert(bodyText,panswerid,correctAnswer,type,tolerance,quizName,imageName);
//
// }
//
// // use ajax function to insert into databsae
// function insert(body, panswerid,canswer,type,tolerance,quizname, imagename){
// console.log("test function call");
// console.log("Values entered: " +body+" "+canswer+" "+type+" "+tolerance+"
// "+quizname);
// // call PHP function
// $.ajax({
// url:'http://shrouded-earth-7234.herokuapp.com/processQuizEntry.php',
// type: 'post',
// data:
// {"funcName":"InsertQuestion","quizname":quizname,"body":body,"canswer":canswer,"type":type,"tolerance":tolerance,"imagename":imagename},
// success: function(response){
// console.log(response);
//
// if(response.indexOf("success")==-1){
// alert("question not added");
// }
// else{
// alert("question entered");
// }
// }
//
// });
// }
//
//
// // insert the possible answers
// function insertPossibleAnswers(possibleAnswersArray){
// // TODO, split array and insert into databse
//
// }
//
// function insertQuiz(quizname,coursecode){
// $.ajax({
// url:'http://shrouded-earth-7234.herokuapp.com/processQuizEntry.php',
// type: 'post',
// data: {"funcName":"InsertQuiz","quizname":quizname,"coursecode":coursecode},
// success: function(response){
// console.log(response);
//
// if(response.indexOf("success")==-1){
// alert("quiz not added");
// }
// else{
// alert("quiz entered");
// }
// }
//
// });
// }

function submit2() {

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

	insertQuiz(quizName, quizCode);// the database requires a quiz name before
	// we can add questions

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
		// convert type
		var type = parseInt(name2num[q["Type"]]);
		insert(q["body"], q["Possible Answers"], q["Correct Answer"], type,
				q["Tolerance"], quizName, q["Image Name"]);
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
			"imagename" : imagename
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

// insert the possible answers
function insertPossibleAnswers(possibleAnswersArray) {
	// TODO, split array and insert into databse

}

function insertQuiz(quizname, coursecode) {
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

			if (response.indexOf("success") == -1) {
				alert("quiz not added");
			} else {
				alert("quiz entered");
			}
		}

	});
}
