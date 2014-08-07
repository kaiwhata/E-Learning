'use strict';

questionList.controller('questionCtrl', function questionCtrl($scope) {
	$scope.questions = [];
	$scope.answer = false;
	$scope.answer1;
	$scope.answer2;
	$scope.answer3;

//	Make dummy multiChoiceQuestions
//
	var mcq = new MultiChoiceQuestion("1", "what is apples?", 1, [ "banana",
			"multiple apple", "pear" ]);
	var mcq1 = new MultiChoiceQuestion("2", "what is banana?", 0, [ "banana",
			"multiple apples", "pear" ]);
	var mcq2 = new MultiChoiceQuestion("3", "what is pear?", 2, [ "banana",
			"multiple apple", "pear" ]);

	$scope.questions.push(mcq);
	$scope.questions.push(mcq1);
	$scope.questions.push(mcq2);


//  Make Dummy Text Questions
	var teq1 = new TextEntryQuestion("4", "How do you greet people in French?", ["salut", "bonjour"])
	var teq2 = new TextEntryQuestion("5", "Complete the sentnce: We have lots of _____ at the arcade", ["games"])
//
	$scope.questions.push(teq1);
	$scope.questions.push(teq2);

//	Make Dummy Number Question
	var neq1 = new NumberEntryQuestion("6", "What is 10+10?", 20);
	var neq2 = new NumberEntryToleranceQuestion("7", "What is 1/3?", 0.333, 0.0015);
	$scope.questions.push(neq1);
	$scope.questions.push(neq2);

	/**
	 * Check all the answers of questions and alert the user if right or wrong
	 */
	$scope.checkAnswers = function() {
		for (var i = 0; i < $scope.questions.length; i++) {

			var q = $scope.questions[i];


			if (q instanceof MultiChoiceQuestion) {
				var numOptions = q.optionsText.length;
				var chosenIndex=-1;//should be -1
				for(var j = 0;j<numOptions;j++){
					var checkBoxIdentifier = "q"+i+"a"+j;
					var ticked = document.getElementById(checkBoxIdentifier).checked;
					if(ticked){
						chosenIndex =j;
						break;
					}
				}
				q.checkAnswer(chosenIndex);
			}

			else if (q instanceof TextEntryQuestion || q instanceof NumberEntryToleranceQuestion || q instanceof NumberEntryQuestion) {
				var answer = document.getElementById("a"+i).value;
				console.log(answer);
				q.checkAnswer(answer);
			}

		}
	}
});