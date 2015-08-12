/**
 * Created by khaled on 7/28/15.
 */


angular.module('post.controllers', [])
    .controller('PostMainController', ['$scope', function ($scope) {

    }])

    .controller('PostListController', ['$scope', 'postService', function ($scope, postService) {
        $scope.posts = postService.getlist();
        $scope.title = 'List';
    }])

    .controller('PostDetailController', ['$scope', 'postService','$stateParams', function ($scope, postService, $stateParams) {
        console.log("detail");
        $scope.id = $stateParams.id;
        console.log($scope.id);
        $scope.post  = postService.getOne($scope.id);

    }])
    .controller('PostNewController', ['$scope', function ($scope) {

    }])
    ;

;

