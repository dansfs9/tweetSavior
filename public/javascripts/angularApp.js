var twitterStream = angular.module('twitterStream', ['ui.router', 'ui.bootstrap']);

twitterStream.factory('socket', function ($rootScope) {
	var socket = io.connect();
	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		},
		emit: function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	};
});


// twitterStream.factory("services", ['$http', function($http) {
// 	var serviceBase = '../services/'
// 	var obj = {};

// 	obj.insertTweet = function (tweet) {
// 		return $http.post(serviceBase + 'insertTweet', tweet).then(function (results) {
// 			return results;
// 		});
// 	};

// 	return obj;
// }]);



twitterStream.directive('header', function() {
	return {
		compile: function compile( tElement, tAttributes) {
			return {
				pre: function preLink(scope, element, attributes) {
					element.addClass('animated bounceInLeft')
				},
				post: function postLink( scope, element, attributes ) {
				}
			};
		}
	}
});

twitterStream.controller('MainCtrl', [
	'$scope', 'socket',
	function($scope, socket){
		$scope.tweets = [];
		var i = 0;
		socket.on('newTweet', function (tweet) {
			$scope.tweets.push(tweet);
			// services.insertCustomer(tweet);


		});


		// var map;
		// var src = 'map.kml';

		// function initialize() {
		// 	map = new google.maps.Map(document.getElementById('map'), {
		// 		center: new google.maps.LatLng(-19.257753, 146.823688),
		// 		zoom: 2,
		// 		mapTypeId: google.maps.MapTypeId.TERRAIN
		// 	});
		// 	loadKmlLayer(src, map);
		// }


		// function loadKmlLayer(src, map) {
		// 	var kmlLayer = new google.maps.KmlLayer(src, {
		// 		suppressInfoWindows: true,
		// 		preserveViewport: false,
		// 		map: map
		// 	});
		// 	google.maps.event.addListener(kmlLayer, 'click', function(event) {
		// 		var content = event.featureData.infoWindowHtml;
		// 		var testimonial = document.getElementById('capture');
		// 		testimonial.innerHTML = content;
		// 	});
		// }

		// google.maps.event.addDomListener(window, 'load', initialize);


	}





	]).config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl',
			data: {
				css: 'styles/style.css'
			}
		})
		$urlRouterProvider.otherwise('home');
	}]);

