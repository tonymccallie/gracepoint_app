angular.module('greyback.services', [])

.service('NewsService', ['$q', '$http', '$location', '$ionicSlideBoxDelegate', function ($q, $http, $location, $ionicSlideBoxDelegate) {
	console.log('NewsService');
		var self = this;
		var articles = [];
//		self.update = function () {
//			var deferred = $http.get(DOMAIN + '/ajax/plugin/news/news_articles/json/limit:4/category:3')
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
//			return deferred;
//		}
//
//		if (articles.length === 0) {
//			self.update();
//		}
//
//		self.articles = function () {
//			return articles;
//		}
//
//		self.get = function (config) {
//			if (articles.length === 0) {
//				$location.path('/tab/home');
//				$location.replace();
//				return null;
//			} else {
//				return articles[config.articleId];
//			}
//		}
		
		self.getLatest = function() {
			console.log('getLatest');
			var deferred = $q.defer();
			$http.get(DOMAIN + '/ajax/plugin/news/news_articles/json/limit:4/category:3')
				.success(function (response, status, headers, config) {
				if (response.status === 'SUCCESS') {
					angular.forEach(response.data, function (item) {
						item.NewsArticle.body = onclickFix(item.NewsArticle.body);
						articles.push(item);
					});
					$ionicSlideBoxDelegate.update();
					deferred.resolve(articles);
				} else {
					alert('there was a server error for NEWS');
					console.log(response);
				}
			})
				.error(function (response, status, headers, config) {
				console.log(['error', data, status, headers, config]);
			});
			return deferred.promise;
		}
	}])

.service('CommunityService', ['$http', '$location', function ($http, $location) {
		var self = this;
//		var articles = [];
//		self.update = function () {
//			var deferred = $http.get(DOMAIN + '/ajax/plugin/news/news_articles/json/limit:4/category:3')
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
//			return deferred;
//		}
//
//		if (articles.length === 0) {
//			self.update();
//		}
//
//		self.articles = function () {
//			return articles;
//		}
//
//		self.get = function (config) {
//			if (articles.length === 0) {
//				$location.path('/tab/home');
//				$location.replace();
//				return null;
//			} else {
//				return articles[config.articleId];
//			}
//		}
		
		self.getLatest = function() {
			console.log('getLatest');
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
	}])