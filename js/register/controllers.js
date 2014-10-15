'use strict';

register
		.controller(
				'registerCtrl',
				function registerCtrl($scope) {

					$scope.allCourses = [];
					$scope.coursesAdded =0;


					$scope.generateCourseBoxes = function(){
						$.ajax({
						url:'http://shrouded-earth-7234.herokuapp.com/getAllCourses.php',
						type: 'post',
						success: function(response){
							var courses = []
							for(var i=0;i<JSON.parse(response).length;i++){
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
							

							$scope.$apply();

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

				$scope.logout = function(){
						   		sessionStorage.removeItem("username");
						   		sessionStorage.removeItem("password");
						   		window.location = "./login.html";

				}

				


				$scope.clickedSubmit = function(){
					var selectedCourses = getAllSelectedCourses();

					document.getElementById("submit").onclick = confirm;

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

							$.ajax({
								url:'http://shrouded-earth-7234.herokuapp.com/processRegister.php',
								type: 'post',
								data: {"funcName":"register","username":login.username.value,"email":login.email.value,"password":login.password.value,"fname":login.fname.value,"lname":login.lname.value},

								success: function(response){

								if(response.indexOf("success")==-1){
									alert("Could not register!");
								}
								else{
									
									sessionStorage.setItem('username',login.username.value);
									sessionStorage.setItem('password',login.password.value);

							 		var courses = getAllSelectedCourses();
									for(var i = 0;i<courses.length;i++){
										$.ajax({
											url:'http://shrouded-earth-7234.herokuapp.com/attachCourses.php',
											type: 'post',
											data: {'coursecode':courses[i].coursecode,'username':login.username.value},
											success: function(response){
												if(++$scope.coursesAdded==courses.length){
													

													$.ajax({
														url:'http://shrouded-earth-7234.herokuapp.com/getStudentsCourses.php',
														type: 'post',
														data: {'username':login.username.value},
														success: function(response){
															alert("Registration Successful");
					 										window.location = "./quizTest.html";

															}
														});
												}
										}
									});
									}
								}
								}
							});
				}

			});