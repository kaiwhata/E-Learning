'use strict';

register
		.controller(
				'registerCtrl',
				function registerCtrl($scope) {

					$scope.allCourses = [];

					$scope.shout = function(){
						alert("HELLO!!!!");
					}
					$scope.generateCourseBoxes = function(){
						$.ajax({
						url:'http://shrouded-earth-7234.herokuapp.com/getAllCourses.php',
						type: 'post',
						success: function(response){
							var courses = []
							for(var i=0;i<JSON.parse(response).length;i++){
								console.log("a;lkhfoiwaehfoia: "+JSON.parse(JSON.parse(response)[i]["row_to_json"]));
								var course = (JSON.parse(JSON.parse(response)[i]["row_to_json"]));	
								
								var alreadyThere = false;
								for(var j=0;j<courses.length;j++){
									var otherCourse = courses[j];
									if(otherCourse.coursecode.indexOf(course.coursecode)!=-1){
										alreadyThere = true;
									}
								}

								if(!alreadyThere){
									courses.push(course);

									course.selected = false;
									$scope.allCourses.push(course);
								}
							}
							
							// for(var i =0; i<courses.length;i++){
							// 	$("#coursesdiv").append('<input type="checkbox" id="toggle" value="off" style="width:30px;margin-left:180px"/>'+courses[i].coursecode+'<br>');



							// }


							// $scope.loaded=true;
							$scope.$apply();
							// $scope.getQuizes();

						}
					});
				}

				var getAllSelectedCourses = function(){
					var selectedCourses = [];
					for(var i =0;i<$scope.allCourses.length;i++){
						if($scope.allCourses[i].selected){
							selectedCourses.push($scope.allCourses[i]);
						}
					}
					return selectedCourses;
				}

				


				$scope.clickedSubmit = function(){
					var selectedCourses = getAllSelectedCourses();

					document.getElementById("submit").onclick = confirm;

					    	console.log("username: "+ login.username.value);
					    	console.log("email: "+ login.email.value);
					    	console.log("password : "+ login.password.value);
					    	console.log("fname: "+ login.fname.value);
					    	console.log("lname: "+ login.lname.value);

					    	//if any fields are blank get outa here
					    	if(!login.username.value){
					    		alert("please enter a username");
					    		return;
					    	}
					    	if(!login.email.value){
					    		alert("please enter a email");
					    		return;
						}
					    	if(!login.password.value){
					    		alert("please enter a password");
					    		return;
						}
					    	if(!login.fname.value){
					    		alert("please enter a first name");
					    		return;
						}
					    	if(!login.lname.value){
					    		alert("please enter a last name");
					    		return;
					    	}

					    	console.log(getAllSelectedCourses())
							    //alert("Successful");
							    //call PHP function


							$.ajax({
								url:'http://shrouded-earth-7234.herokuapp.com/processRegister.php',
								type: 'post',
								data: {'coursecodes':'blah'},
								success: function(response){
									console.log(response);
								}
							});



							// $.ajax({
							// 	url:'http://shrouded-earth-7234.herokuapp.com/processRegister.php',
							// 	type: 'post',
							// 	data: {"funcName":"register","username":login.username.value,"email":login.email.value,"password":login.password.value,"fname":login.fname.value,"lname":login.lname.value},

							// 	success: function(response){
							// 		console.log(response);

							// 	if(response.indexOf("success")==-1){
							// 		alert("Could not register!");
							// 	}
							// 	else{
							// 		alert("Registration Successful");
							// 		sessionStorage.setItem('username',login.username.value);
							// 		sessionStorage.setItem('password',login.password.value);
					 	// 			window.location = "./quizTest.html";
							// 	}
							// 	}
							// });

					    

						// document.getElementById("home").onclick = linkToHome;
						//    	function linkToHome() {
						//    		window.location = "./login-fancy.html";
						// }

				}

				});