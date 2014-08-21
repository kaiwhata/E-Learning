describe("Multi Choice Question", function() {

	var multiQuestion;

  beforeEach(function() {
    player = new Player();
    song = new Song();
	multiQuestion = new MultiChoiceQuestion("NoID",
			"How many people were in the Beatles", 3, [ "one",
					"two","three","four"],"");
  });

	it("should be the right question format", function() {
		expect(multiQuestion.questionType).toEqual("multi");
		expect(multiQuestion.questionType).not.toEqual("text");
		expect(multiQuestion.questionType).not.toEqual("numTol");
	 });

  	it("should know its correct answer", function() {
		expect(multiQuestion.answerText).toEqual("four");
		expect(multiQuestion.answerText).not.toEqual("three");
	 });

	it("should correctly check the answer with indexes",function(){
		expect(multiQuestion.checkAnswer(3)).toBeTruthy();
		expect(multiQuestion.checkAnswer(2)).toBeFalsy();
	});
});

describe("Number Question", function() {
	var numberQuestion;

  beforeEach(function() {

	numberQuestion = new NumberEntryToleranceQuestion("NoID",
			"What number is pi", 3.14159,0.1,"");
  });

	it("should be the right question format", function() {
		expect(numberQuestion.questionType).toEqual("numTol");
		expect(numberQuestion.questionType).not.toEqual("text");
		expect(numberQuestion.questionType).not.toEqual("multi");
	 });

  	it("should know its correct answer", function() {
		expect(numberQuestion.answerText).toEqual(3.14159);
		expect(numberQuestion.answerText).not.toEqual(3.5);
	  });

	it("should correctly check the answer depending on the tolerance",function(){
		expect(numberQuestion.checkAnswer("3.1")).toBeTruthy();
		expect(numberQuestion.checkAnswer("3.14")).toBeTruthy();
		expect(numberQuestion.checkAnswer("3.14159")).toBeTruthy();
		expect(numberQuestion.checkAnswer("3.0")).toBeFalsy();
		expect(numberQuestion.checkAnswer("3.3")).toBeFalsy();
	});
});

describe("Text Question", function() {
	var textQuestion;

  beforeEach(function() {

	var acceptableAnswers = [ "feline", "cat", "hamster", "orange dog" ];

	textQuestion = new TextEntryQuestion("NoID", "what is an orange furry pet",
			acceptableAnswers, "");
  });

	it("should be the right question format", function() {
		expect(textQuestion.questionType).toEqual("text");
		expect(textQuestion.questionType).not.toEqual("numTol");
		expect(textQuestion.questionType).not.toEqual("multi");
	 });

  	it("should know its correct answer", function() {
		expect(textQuestion.answerText).toEqual([ "feline", "cat", "hamster", "orange dog" ]);
		expect(textQuestion.answerText).not.toEqual("normal dog");
	  });

	it("should correctly check the answer from list of possible answers",function(){
		expect(textQuestion.checkAnswer("feline")).toBeTruthy();
		expect(textQuestion.checkAnswer("cat")).toBeTruthy();
		expect(textQuestion.checkAnswer("hamster")).toBeTruthy();
		expect(textQuestion.checkAnswer("orange dog")).toBeTruthy();
		expect(textQuestion.checkAnswer("dog")).toBeFalsy();
		expect(textQuestion.checkAnswer("tiger")).toBeFalsy();
	});
});

describe("TEST", function() {
	var questionJSON;

  beforeEach(function() {
	for (var i = 0; i < JSON.parse(null).length; i++) {
	questionJSON = JSON.parse(JSON.parse(null)[i]["row_to_json"]);
	}
  });

	it("should be the right question format", function() {
		//expect(textQuestion.questionType).toEqual("text");
		//expect(textQuestion.questionType).not.toEqual("numTol");
		//expect(textQuestion.questionType).not.toEqual("multi");
	 });

  	it("should know its correct answer", function() {
		//expect(textQuestion.answerText).toEqual([ "feline", "cat", "hamster", "orange dog" ]);
		//expect(textQuestion.answerText).not.toEqual("normal dog");
	  });

	it("should correctly check the answer from list of possible answers",function(){
		//expect(textQuestion.checkAnswer("feline")).toBeTruthy();
		//expect(textQuestion.checkAnswer("cat")).toBeTruthy();
		//expect(textQuestion.checkAnswer("hamster")).toBeTruthy();
		//expect(textQuestion.checkAnswer("orange dog")).toBeTruthy();
		//expect(textQuestion.checkAnswer("dog")).toBeFalsy();
		//expect(textQuestion.checkAnswer("tiger")).toBeFalsy();
	});
});



