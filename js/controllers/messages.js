/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */materialAdmin
.controller('messageCtrl', function(growlService, $scope, $http, $q , $rootScope)
     {
        $scope.messagesThreads=[];
        $scope.sentmessages=[];
        $scope.AutoloadedData =[];
        $scope.getMessagesInbox = function ()
        {
           $http({
              method: 'GET',
              url: $rootScope.RestDomainUrl+'api/message/message/inbox?access_token='+localStorage.getItem('token')
            }).then(function successCallback(response) {
                     
             $scope.AutoloadedData = response.data;
            
                if(response.data  != "no new messages")
                { 
                  for (  $message in  $scope.AutoloadedData )
                      {
                      
                        $scope.messagesThreads.push( $scope.AutoloadedData[$message]);
                      }
                
                   console.log ( $scope.messagesThreads);
                }
                else
                {
                  $rootScope.scrollEnd =1 ;
                }

                }, function errorCallback(response) {
                 
                });
        };
        
         $scope.getMessagesSent = function ()
        {
           $http({
              method: 'GET',
              url: $rootScope.RestDomainUrl+'api/message/message/sent?access_token='+localStorage.getItem('token')
            }).then(function successCallback(response) {
                     
             $scope.AutoloadedData = response.data;
            
                if(response.data  != "no new messages")
                { 
                  for (  $message in  $scope.AutoloadedData )
                      {
                      
                        $scope.messages.push( $scope.AutoloadedData[$message]);
                      }
                
                   console.log ( $scope.sentmessages);
                }
                else
                {
                  $rootScope.scrollEnd =1 ;
                }

                }, function errorCallback(response) {
                 
                });
        };
        $scope.getMessagesInbox();
        // $scope.getMessagesSent();
     
     });
