/**
 * New node file
 */

MyApp.controller('loginCtrl',function($scope,$http,$location){
	console.log("In the controller");
	
	$scope.signup=function(){
		
		console.log("Inside function-2");
		var firstname = $scope.firstname;
		var lastname = $scope.lastname;
		var email = $scope.email;
		var emailagain = $scope.emailagain;
		var password = $scope.password;
		var month = $scope.month;
		var day = $scope.day;
		var year = $scope.year;
		var sex = $scope.sex;
		var dob = year+"-"+month+"-"+day;
				
		console.log("firstname - "+firstname);
		console.log("lastname - "+lastname);
		console.log("email - "+email);
		console.log("emailagain - "+emailagain);
		console.log("password - "+password);
		console.log("month - "+month);
		console.log("day - "+day);
		console.log("year - "+year);
		console.log("sex - "+sex);
		
		
		$http({
			method: 'post',
			url: '/register',
			data: {"firstname":firstname,"lastname":lastname,"email":email,"password":password,"dob":dob,"gender":sex}		
		}).success(function(data) {
			console.log(data);
			});
	
	};
	
	
	$scope.login=function(){
		
		console.log("Inside function-login");
		var email = $scope.email;
		var password = $scope.pwd;
		console.log("email - "+email);
		console.log("password - "+password);
			
		$http({
			method: 'post',
			url: '/login',
			data: {"email":email,"password":password}		
		}).success(function(data) {
			console.log(data);		
			window.location.assign("/home");			
		});	
	};
	
	
	$scope.load = function(){
		
		$http({
			method: 'get',
			url: '/getuser',		
		}).success(function(data) {
			console.log(data);			
			console.log("Im here in load");
			$scope.fn=data.fname;
			$scope.ln=data.lname;
			$scope.em=data.email;
			$scope.gnd=data.gender;
			$scope.db=data.dob;
		});	
		
		
	}
});
