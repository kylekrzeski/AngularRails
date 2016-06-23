angular.module('app', ['ui.router'])
.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});

	$urlRouterProvider.otherwise('home');
}])
.factory('posts', [function() {
	//returns an object
	var obj = {
		posts: []
	};
	return obj;
}])
.controller('MainCtrl', [
	'$scope',
	'posts',
	function($scope, posts) {

		$scope.posts = posts.posts;

		//$scope.test = "hello there";
/*
		$scope.posts = [
			{title: 'post 1', upvotes: 5},
			{title: 'post 2', upvotes: 10},
			{title: 'post 3', upvotes: 4},
			{title: 'post 4', upvotes: 8},
			{title: 'post 5', upvotes: 18}
		];
*/
		$scope.addPost = function() {
			if(!$scope.title || $scope.title === '') {
				return;
			}
			$scope.posts.push({
				title: $scope.title, 
				link: $scope.link, 
				upvotes: 0,
				comments: [
					{author: 'John', body: 'First comment!', upvotes: 0},
					{author: 'Miles', body: '2nd comment!', upvotes: 0}
				]
			});
			$scope.title = '';
			$scope.link = '';
		};

		$scope.incrementUpVotes = function (post) {
			post.upvotes += 1;
		}

	}

])
.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts) {
		$scope.post = posts.posts[$stateParams.id];

		$scope.addComment = function() {
			if($scope.body === '') {
				return;
			}
			$scope.post.comments.push( {
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			scope.body = '';
		}


	}
]);

