var DOMAIN = 'http://www.gracepointcoppell.org'
//DEVELOPMENT
var devtest = /localhost/.test(window.location.hostname);
if (devtest) {
	DOMAIN = 'http://localhost/greyback_shiny';
	isMobile = false;
}
devtest = /threeleaf/.test(window.location.hostname);
if (devtest) {
	DOMAIN = 'http://office.threeleaf.net:8080/greyback_shiny';
	isMobile = false;
}

var onclickFix = function (html) {
	html = html.replace(/href=\"\//ig, 'href="http://www.gracepointcoppell.org/');
	html = html.replace(/src=\"\//ig, 'src="http://www.gracepointcoppell.org/');
	return html.replace(/href=\"(.+?)\"/gi, 'onclick="window.open(\'$1\',\'_system\',\'location=yes\');"');
}

angular.module('greyback', ['ionic', 'ngCordova', 'ImgCache', 'ionic.service.core', 'ionic.service.push', 'ionic.service.deploy', 'greyback.controllers', 'greyback.services', 'greyback.utils'])

.run(function ($ionicPlatform, ImgCache) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			$cordovaStatusBar.style(2);
		}
		
		 ImgCache.$init();
		alert('test');
	});
})

.config(function ($ionicAppProvider, ImgCacheProvider, $stateProvider, $urlRouterProvider) {
	// Identify app
	$ionicAppProvider.identify({
		// The App ID (from apps.ionic.io) for the server
		app_id: '3de33e4f',
		// The public API key all services will use for this app
		api_key: 'dd2a68c9eb3d8cbe5b385aa55d40253fc6a9aa10e622e35a ',
		// Set the app to use development pushes
		dev_push: true
	});

	ImgCacheProvider.manualInit = true;

	$stateProvider

	.state('menu', {
		url: "/menu",
		abstract: true,
		templateUrl: "templates/menu.html",
		controller: 'AppController',
		resolve: {
			articles: function () {}
		}
	})

	.state('menu.tabs', {
		url: "/tabs",
		abstract: true,
		views: {
			'menuContent': {
				templateUrl: "templates/tabs.html",
			}
		}
	})

	.state('menu.tabs.home', {
		url: "/home",
		views: {
			'tab-home': {
				templateUrl: "templates/home.html",
				controller: 'HomeController',
			}
		},
		resolve: {
			articles: function (NewsService) {
				return NewsService.getLatest();
			},
			posts: function (CommunityService) {
				return CommunityService.getLatest();
			}
		}
	})

	.state('full', {
		url: "/full",
		abstract: true,
		templateUrl: "templates/full.html",
		resolve: {
			test: function ($q, $timeout) {
				var deferred = $q.defer();
				$timeout(function () {
					deferred.resolve('Hello!');
				}, 100);
				return deferred.promise;
			}
		}
	})

	.state('login', {
		url: "/login",
		templateUrl: "templates/login.html",
	})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/menu/tabs/home');
});