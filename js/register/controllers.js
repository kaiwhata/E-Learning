'use strict';

register
		.controller(
				'registerCtrl',
				function registerCtrl($scope) {

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
								}

							}
							
							for(var i =0; i<courses.length;i++){
								$("#coursesdiv").append('<input type="checkbox" id="toggle" value="off" style="width:30px;margin-left:180px"/>'+courses[i].coursecode+'<br>');



							}
							// $scope.loaded=true;
							// $scope.$apply();
							// $scope.getQuizes();

						}
					});
				}

				});
