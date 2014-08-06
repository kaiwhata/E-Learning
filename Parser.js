/**
 * This is a parser
 */

function parseTheThing (){

	var score = 0;

	/*
	console.log("parse start");

	var userInput = $('#button').val();
	console.log(userInput);
	var maniText = userInput;
	maniText = maniText = maniText.toLowerCase();
	maniText = maniText.trim();

	var finalInput = maniText;

	console.log(finalInput);
	console.log("parse end");
*/


	console.log("submit start");
    //document.getElementById("answer").onclick = validate;
   // function validate() {
	    var radios;
	    var i;
	    var id;
	    var right;
	    var numQ = 1; // number of questions

	    for(id = 0; id < numQ; id++){
	    radios = document.getElementById(id).getElementsByTagName("input");

	    right = false;
	    	for(i = 0; i < radios.length; i++) {
			    if(radios[i].value == "right" && radios[i].checked == true) {
				  right = true;
				  score++;
			    }
	   		 }
	    }

	    	document.getElementById("output").innerHTML = "Score: " + score;
	    	alert("Score: " + score);

    //}

}