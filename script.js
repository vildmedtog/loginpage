var app = angular.module('main', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/',{
		templateUrl: './components/home.html',
		controller: 'homeCtrl'
	}).when('/login',{
		templateUrl: './components/login.html',
		controller : 'loginCtrl'
	}).when('/dashboard',{
		resolve: {
			check: function ($location,user) {
				if (!user.isUserLoggedIn()) {
					$location.path('/login');
				}
			}
		},
		templateUrl: './components/dashboard.html',
		controller: 'dashboardCtrl'
	}).otherwise({
		templateUrl: '404'
	})
	
});

app.service('user',  function(){
	var username;
	var loggedin = false;
	this.setName = function (name) {
		username = name;
	};
	this.getName = function () {
		return username;
	};
	this.isUserLoggedIn = function () {
		return loggedin;
	} 
	this.userLoggedIn = function () {
		loggedin = true;
	}
})

app.controller('homeCtrl', function($scope,$location){
	$scope.goToLogin = function () {
		$location.path('/login');
	}
	$scope.register = function () {
		$location.path('/register');
	}
});

app.controller('loginCtrl', function($scope, $location, $http, user){
	$scope.login =function () {
		var username = $scope.username;
		var password = $scope.password;
		// send POST to authentication server
		user.userLoggedIn();
		user.setName(username);
		$location.path('/dashboard');
	}
});

app.controller('dashboardCtrl', function($scope,user){
	$scope.user = user.getName();
});