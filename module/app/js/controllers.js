/**
 * Created by khaled on 7/28/15.
 */


angular.module('post.controllers', [])
    .controller('PostMainController', ['$scope', function ($scope) {

    }])

    .controller('PostHomeController', ['$scope', function ($scope) {

    }])

    .controller('PostListController', ['$scope', 'postService', function ($scope, postService) {
        $scope.posts = postService.getlist();
    }])

    .controller('PostDetailController', ['$scope', 'postService','$stateParams', function ($scope, postService, $stateParams) {

        $scope.id = $stateParams.id;
        $scope.post  = postService.getOne($scope.id);

    }]);

;

