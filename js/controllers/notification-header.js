/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */materialAdmin
.controller('notificationCtrl', function(growlService, $scope, $http , $rootScope ,  $timeout )
     {
        $scope.notificationCounter = true;
        var promise ;
         $rootScope.getNotfications = function ()
         {
         $http({
            method: 'GET',
            url: $rootScope.RestDomainUrl+'api/user/notifications?access_token='+localStorage.getItem('token')
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              
              $scope.Notification_headr=response.data;
              promise =  $timeout( $rootScope.getNotfications, $rootScope.NewsfeedTimeout);
               // console.log($scope.Notification_headr)
            
              
            }, function errorCallback(response) {
             // called asynchronously if an error occurs

              // or server returns response with an error status.
          });
        };
        $rootScope.getMessagesNumber = function ()
         {
         $http({
            method: 'GET',
            url: $rootScope.RestDomainUrl+'api/message/message/unread/number?access_token='+localStorage.getItem('token')
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              
              $scope.messagenumber= response.data;
              
              if(response.data === 0)
              {
                // alert("zerooo");
              }
              promise =  $timeout( $rootScope.getMessagesNumber,$rootScope.NewsfeedTimeout);
                // console.log(response.data);

            
              
            }, function errorCallback(response) {
             // called asynchronously if an error occurs

              // or server returns response with an error status.
          });
        };
        $rootScope.getMessages = function ()
         {
         $http({
            method: 'GET',
            url: $rootScope.RestDomainUrl+'api/message/message/inbox?access_token='+localStorage.getItem('token')
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              
              $scope.messages= response.data[0].messages;
             

            
              
            }, function errorCallback(response) {
             // called asynchronously if an error occurs

              // or server returns response with an error status.
          });
        };
         $rootScope.getNotfications ();
         $rootScope.getMessagesNumber();
      });
            