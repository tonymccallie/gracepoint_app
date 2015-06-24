angular.module('greyback.services', [])

.service('NewsService', function ($q, $http, $location, $ionicSlideBoxDelegate, $localStorage, $state) {
	console.log('NewsService');
	var self = this;
	var articles = [];

	self.local = function () {
		console.log('NewsService.local');
		var deferred = $q.defer();
		var localArticles = $localStorage.getArray('NewsLatest');
		deferred.resolve(localArticles);
		return deferred.promise;
	}

	self.remote = function () {
		console.log('NewsService.remote');
		var promise = $http.get(DOMAIN + '/ajax/plugin/news/news_articles/json/limit:4/category:3')
			.success(function (response, status, headers, config) {

			if (response.status === 'SUCCESS') {
				//empty articles
				articles = [];
				//populate
				var temp = {};
				angular.forEach(response.data, function (item) {
					item.NewsArticle.body = onclickFix(item.NewsArticle.body);
					articles.push(item);
					temp = item;
				});
				
				//save to cache
				$localStorage.setArray('NewsLatest', articles);
				$ionicSlideBoxDelegate.update();

			} else {
				alert('there was a server error for NEWS');
				console.log(response);
			}
		})
			.error(function (response, status, headers, config) {
			console.log(['error', data, status, headers, config]);
		});
		return promise;
	}
	
	self.update = function() {
		console.log('NewsService.update');
		var deferred = $q.defer();
		self.remote().then(function(remoteArticles) {
			deferred.resolve(articles);
		});
		return deferred.promise;
	}

	self.init = function () {
		console.log('NewsService.init');
		var deferred = $q.defer();
		self.local().then(function (storedArticles) {
			if (storedArticles.length > 0) {
				console.log('use local');
				articles = storedArticles;
				deferred.resolve(articles);
			} else {
				console.log('use remote');
				self.remote().then(function (remoteArticles) {
					deferred.resolve(articles);
				});
			}
		});
		return deferred.promise;
	}

	self.latest = function () {
		console.log('NewsService.latest');
		var deferred = $q.defer();
		if (articles.length === 0) {
			console.log('no articles');
			self.init().then(function (initArticles) {
				articles = initArticles;
				deferred.resolve(initArticles);
			});
		} else {
			console.log('had articles');
			deferred.resolve(articles);
		}
		$ionicSlideBoxDelegate.update();
		return deferred.promise;
	}

	self.article = function ($articleIndex) {
		console.log('NewsService.article');
		var deferred = $q.defer();
		if (articles.length === 0) {
			console.log('empty');
			console.log($state);
			$location.path('/tab/home');
			$location.replace();
			//$state.go('menu.tabs.home');
			return null;
		} else {
			deferred.resolve(articles[$articleIndex]);
		}
		return deferred.promise;
	}
})

.service('CommunityService', function ($http, $location) {
	console.log('CommunityService');
	var self = this;

	self.getLatest = function () {
		console.log('CommunityService.getLatest');
		return $http.get(DOMAIN + '/ajax/plugin/news/news_articles/json/limit:4/category:3');
		//				.success(function (response, status, headers, config) {
		//				if (response.status === 'SUCCESS') {
		//					angular.forEach(response.data, function (item) {
		//						item.NewsArticle.body = onclickFix(item.NewsArticle.body);
		//						articles.push(item);
		//					});
		//					$ionicSlideBoxDelegate.update();
		//				} else {
		//					alert('there was a server error for NEWS');
		//					console.log(response);
		//				}
		//			})
		//				.error(function (response, status, headers, config) {
		//				console.log(['error', data, status, headers, config]);
		//			});
	}
})

.service('MessagesService', function ($http, $location) {
	console.log('MessagesService');
	var self = this;

	self.getLatestSeries = function () {
		console.log('MessagesService.getLatestSeries');
		return $http.get(DOMAIN + '/ajax/plugin/news/news_articles/json/limit:4/category:3');
		//				.success(function (response, status, headers, config) {
		//				if (response.status === 'SUCCESS') {
		//					angular.forEach(response.data, function (item) {
		//						item.NewsArticle.body = onclickFix(item.NewsArticle.body);
		//						articles.push(item);
		//					});
		//					$ionicSlideBoxDelegate.update();
		//				} else {
		//					alert('there was a server error for NEWS');
		//					console.log(response);
		//				}
		//			})
		//				.error(function (response, status, headers, config) {
		//				console.log(['error', data, status, headers, config]);
		//			});
	}
})