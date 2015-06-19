angular.module('greyback.controllers', [])

.controller('AppController', ['$scope', function ($scope) {
		//app wide variables
		$scope.DOMAIN = DOMAIN;
		$scope.imageDir = DOMAIN + '/img/thumb/';
	}])

.controller('HomeController', function ($scope, $ionicModal, $ionicDeploy, $timeout, articles, posts, ImgCache) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.logs = [];
	$scope.logs.push('HomeController');


	// Update app code with new release from Ionic Deploy
	$scope.doUpdate = function () {
		$ionicDeploy.update().then(function (res) {
			$scope.logs.push('Ionic Deploy: Update Success! ', res);
		}, function (err) {
			$scope.logs.push('Ionic Deploy: Update error! ', err);
		}, function (prog) {
			$scope.logs.push('Ionic Deploy: Progress... ', prog);
		});
	};

	// Check Ionic Deploy for new code
	$scope.checkForUpdates = function () {
		$scope.logs.push('Ionic Deploy: Checking for updates');
		$ionicDeploy.check().then(function (hasUpdate) {
			$scope.logs.push('Ionic Deploy: Update available: ' + hasUpdate);
			$scope.hasUpdate = hasUpdate;
		}, function (err) {
			$scope.logs.push('Ionic Deploy: Unable to check for updates', err);
		});
	}

	// Form data for the login modal
	$scope.loginData = {};

	$scope.articles = articles;

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function () {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function () {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function () {
		$scope.logs.push('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function () {
			$scope.closeLogin();
		}, 1000);
	};

	$scope.test = function () {
		alert('functioned');
		ImgCache.init();
	}
});