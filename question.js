

var Question = function(id, bodyText, answerText) {
	// the question's id
	this.id = id;

	// the question body text.
	this.bodyText = bodyText;

	// a text representation of the answer. used for debugging. do not compare
	// with supplied answer for testing user input
	this.answerText = answerText;

	// the type of question . eg multi, numebr, text
	this.questionType;

	// checks some supplied answer against the correct answer. returns bool
	this.checkAnswer;

	// function to convert a question to JSON format (may be unnecessary))
	this.toJSON;

	//funcftion to conver from JSON format to question
//	this.fromJSON;

};

/**
 * A multi choice question that lets users select from the provided choices
 * (optionsText). The index of the correct option is provided too
 */
var MultiChoiceQuestion = function(id, bodyText, answerIndex, optionsText) {
	// call the super class constructor
	Question.call(this, id, bodyText, optionsText[answerIndex]);

	this.optionsText = optionsText;
	this.answerIndex = answerIndex;

	this.questionType = "multi";

	/**
	 * Checks the answer against the supplied INDEX
	 */
	this.checkAnswer = function(answer) {
		if (this.answerIndex == answer) {
//			alert("Correct!");
			return true;
		} else {
//			alert("Wrong answer.");
			return false;

		}
	};

	this.toJSON = function() {
		var jobject = {};
		jobject["id"] = id;
		jobject["bodyText"] = bodyText;
		jobject["optionsText"] = optionsText;
		jobject["answerIndex"] = answerIndex;
		return jobject;

	}



};

/**
 * A question which asks the user for a number.
 */
var NumberEntryQuestion = function(id, bodyText, answerNum) {
	Question.call(this, id, bodyText, answerNum);

	this.questionType = "number";

	this.answerText = Number(answerNum);

	/**
	 * compares the supplied number with the correct answer. Currently has no
	 * tolerance, answers must be exact
	 */
	this.checkAnswer = function(answer) {
		answer = parseAnswer(answer);
		if (Number(answer) == NaN) {
//			alert("Only numbers allowed.");
			return false;
		} else if (this.answerText == answer) {
//			alert("Correct!");
			return true;
		} else {
//			alert("Wrong answer.");
			return false;
		}
	};

	this.toJSON = function() {
		var jobject = {};
		jobject["id"] = id;
		jobject["bodyText"] = bodyText;
		jobject["answerNum"] = answerNum;
		return jobject;
	};

//	this.fromJSON = function(jobject){
//		this.answer = jobject["canswer"];
//		this.body = jobject["body"];
//	}

};

/**
 * Just like a Number Entry Question but with a tolerance set for it.
 */
var NumberEntryToleranceQuestion = function(id, bodyText, answerNum, tolerance) {
	Question.call(this, id, bodyText, answerNum);

	this.questionType = "numTol";

	this.tolerance = tolerance;

	this.checkAnswer = function(answer) {
		answer = parseAnswer(answer);
		answer = parseFloat(answer);
		answerNum = parseFloat(answerNum);
		tolerance = parseFloat(tolerance);

		console.log(answer);
		console.log(answerNum);
		console.log(Math.abs(answer-answerNum));
		if (answer == NaN) {
//			alert("Only numbers allowed.");
			return false;
		} else if (Math.abs(answer-answerNum) <= tolerance) {
//			alert("Correct!");
			return true;
		}
		else {
//			alert("Wrong answer.");
			return false;
		}

	};

	this.toJSON = function() {
		var jobject = {};
		jobject["id"] = id;
		jobject["bodyText"] = bodyText;
		jobject["answerNum"] = answerNum;
		return jobject;
	};

};

/**
 * Text question where users must enter an answer in string form.
 */
var TextEntryQuestion = function(id, bodyText, answersArray) {
	Question.call(this, id, bodyText, answersArray);

	this.questionType = "text";

	this.answersArray = answersArray;

	/**
	 * Checks the array of possible answers for the supplied text
	 */
	this.checkAnswer = function(answer) {
		answer = parseAnswer(answer);
		if (answersArray.indexOf(answer) != -1) {
//			alert("Correct!");
			return true;
		} else {
//			alert("Wrong answer.");
			return false;
		}
	};

	this.toJSON = function() {
		var jobject = {};
		jobject["id"] = id;
		jobject["bodyText"] = bodyText;
		jobject["answersArray"] = answersArray;
		return jobject;
	};
};

/**
 * Test method for creating a series of questions
 */
function dummyQuestions() {
	MultiChoiceQuestion.prototype = Object.create(Question.prototype);
	NumberEntryQuestion.prototype = Object.create(Question.prototype);
	TextEntryQuestion.prototype = Object.create(Question.prototype);

	var mcq = new MultiChoiceQuestion("NoID",
			"Is this operation 'true' or 'false': \n 3 > 2", 0, [ "true",
					"false" ]);

	var neq = new NumberEntryQuestion("NoID", "How many legs does a human being have?",
			2);

	var acceptableAnswers = [ "feline", "cat", "hamster", "orange dog" ];
	var teq = new TextEntryQuestion("NoID", "what is an orange furry pet",
			acceptableAnswers);

	var threeQuestions = [ mcq, neq, teq ];
	for (var i = 0; i < threeQuestions.length; i++) {

		// q.askQuesiton();
		threeQuestions[i].checkAnswer("orange dog");

	}
};

/**
 *This should remove white spaces in user input
 *This makes it all small case
 *
 *Input: user's answer
 *Output: parsed string
 */
function parseAnswer(userAnswer){
	console.log("parse start");

	//var userInput = $('#button').val();
	//console.log(userInput);
	var maniText = userAnswer;
	maniText = maniText.toLowerCase();
	maniText = maniText.trim();

	var finalInput = maniText;

	console.log(finalInput);
	console.log("parse end");

	return finalInput;
};
