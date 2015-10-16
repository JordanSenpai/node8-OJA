// HI! I'M MR MEESEEKS! LOOK AT ME!

angular.module('JobApp', [])

angular.module('JobApp')
	.controller('homeController', ['$scope', function($scope){
		
	}]);

angular.module('JobApp')
	.controller('applicantController', ['$scope', '$http', function($scope, $http){
		$http.get('/retrieveApplicants').
			success(function(data){
				$scope.people = data
				console.log($scope.people)
			})
		$scope.removeName = function(){
			$http.get('/removeApplicant')

		}
	}]);
