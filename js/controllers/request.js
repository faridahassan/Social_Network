/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */materialAdmin
.controller('requestCtrl', function(growlService, $scope, $http, $q , $rootScope , $modal)
     {
        ///////////////////////////////MODAL//////////////////////////////////////////////////////
     $scope.modalContent = 'Are you sure you want to delete this request ?';
      $rootScope.StopNewsFeed = 2;
        //Create Modal
        function modalInstances(animation, size, backdrop, keyboard) {
            var modalInstance = $modal.open({
                animation: animation,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                backdrop: backdrop,
                keyboard: keyboard,
                resolve: {
                    content: function () {
                        return $scope.modalContent;
                    }
                }
            
            });
        };
       
        ///////////////////////////////////////////MODAL//////////////////////////////////////////////////
         $scope.DeleteModal=function(postid)
        {
            $rootScope.DeletedPostId = postid;
            console.log($rootScope.DeletedPostId);
            $scope.open('sm');
        };
         //Custom Sizes
        $scope.open = function (size ) {
           
            modalInstances(true, size, true, true);
        };
      this.requestCommenting = [];
      $scope.Pi=true;
      $scope.Sr=false;
      $scope.A=false;
      $('.tab3').attr('style' , 'border-bottom: 1px solid #333;');
      $rootScope.getPosts=function()
      {
        $scope.SR_request= $http.get($rootScope.RestDomainUrl+'api/posts/'+localStorage.getItem('user.id')+'/mine/sr?access_token='+localStorage.getItem('token')),
        $scope.Pi_request = $http.get($rootScope.RestDomainUrl+'api/posts/'+localStorage.getItem('user.id')+'/mine/pi?access_token='+localStorage.getItem('token')),
        $scope.A_request=$http.get($rootScope.RestDomainUrl+'api/posts/'+localStorage.getItem('user.id')+'/mine/a?access_token='+localStorage.getItem('token'));
        $q.all([$scope.SR_request,$scope.Pi_request,$scope.A_request]).then(function(arrayOfResults) {
             //console.log( arrayOfResults);
                             $scope.Pii=$scope.Pi_request.$$state.value.data;
                             $scope.SRR=$scope.SR_request.$$state.value.data;
                             $scope.AA=$scope.A_request.$$state.value.data;
                             console.log($scope.Pii);
      
      }) 
    };
    $rootScope.getPosts();
   $scope.myFuncPi = function() {
          $scope.Pi = true;
          $scope.Sr=false;
          $scope.A=false;
          $('.tab3').attr('style' , 'border-bottom: 1px solid #333;');
          $('.tab2').attr('style' , 'border-bottom: none;');
          $('.tab1').attr('style' , 'border-bottom: none;');

    };
   $scope.myFuncSr = function() {
          $scope.Pi = false;
          $scope.Sr=true;
          $scope.A=false;
          $('.tab2').attr('style' , 'border-bottom: 1px solid #333;');
          $('.tab3').attr('style' , 'border-bottom: none;');
          $('.tab1').attr('style' , 'border-bottom: none;');

    };
   $scope.myFuncA = function() {
          $scope.Pi = false;
          $scope.Sr=false;
          $scope.A=true;
          $('.tab1').attr('style' , 'border-bottom: 1px solid #333;');
          $('.tab3').attr('style' , 'border-bottom: none;');
          $('.tab2').attr('style' , 'border-bottom: none;');

    };
    $scope.ClosePost = function (postid)
    {
       $http({
            method: 'PUT',
            url: $rootScope.RestDomainUrl+'api/posts/'+postid+'?access_token='+localStorage.getItem('token') ,
            data: {replies_is_closed:"1"},
              }).then(function successCallback(response) {
                 
                  $scope.success=response.data;
                  $rootScope.getPosts();
                  console.log(response.data);
                }, function errorCallback(response) {
                 
        });

    };
    $scope.OpenPost = function (postid)
    {
       $http({
            method: 'PUT',
            url: $rootScope.RestDomainUrl+'api/posts/'+postid+'?access_token='+localStorage.getItem('token') ,
            data: {replies_is_closed:"0"},
              }).then(function successCallback(response) {
                 
                  $scope.success=response.data;
                  $rootScope.getPosts();
                  console.log(response.data);
                }, function errorCallback(response) {
                 
        });

    };
  
     })
    //====================================
    // Modal Instance Delete Post
    //====================================

    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, content , $rootScope ,$http) {

          $scope.DeletePost=function()
          {
            
            $http({
            method: 'DELETE',
            url: $rootScope.RestDomainUrl+'api/posts/'+$rootScope.DeletedPostId+'?access_token='+localStorage.getItem('token')
              }).then(function successCallback(response) {
                 
                  $scope.success=response.data;
                  $rootScope.getPosts();
                }, function errorCallback(response) {
                 
              });
            

          };
          $scope.modalContent = content;

          $scope.ok = function () {
            $modalInstance.close();
            $scope.DeletePost();
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
    })
   

