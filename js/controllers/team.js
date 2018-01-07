/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */materialAdmin
.controller('teamCtrl', function(growlService, $scope, $http, $q , $rootScope)
     {
        $scope.helpedMe=true;
        $scope.Ihelped=true;
        $rootScope.StopNewsFeed = 2;
        $('.everyone').attr('style' , 'border-bottom: 1px solid #333;');
         
         $scope.helpedMe_team=$http.get($rootScope.RestDomainUrl+'api/users/'+localStorage.getItem('user.id')+'/helpedme?access_token='+localStorage.getItem('token')),
         $scope.Ihelp_team=$http.get($rootScope.RestDomainUrl+'api/users/'+localStorage.getItem('user.id')+'/ihelped?access_token='+localStorage.getItem('token'));
         $scope.size_team=$http.get($rootScope.RestDomainUrl+'api/users/'+localStorage.getItem('user.id')+'/teamsize?access_token='+localStorage.getItem('token'));
         
          $q.all([$scope.helpedMe_team,$scope.Ihelp_team]).then(function(arrayOfResults) {
              
              $rootScope.team_size_view=$scope.size_team.$$state.value.data;
              $rootScope.helped_me_view=$scope.helpedMe_team.$$state.value.data;
              $rootScope.Ihelped_view=$scope.Ihelp_team.$$state.value.data;
              // $scope.Everyone_view = angular.extend($scope.helped_me_view, $scope.Ihelped_view);
               // console.log( $scope.Ihelped_view );
          })
        $scope.myFuncHelpedMe = function() {
                 $scope.helpedMe=true;
                 $scope.Ihelped=false;
                 $('.helpedme').attr('style' , 'border-bottom: 1px solid #333;');
                 $('.everyone').attr('style' , 'border-bottom: none;');
                 $('.ihelped').attr('style' , 'border-bottom: none;');
                
                   
                };
       $scope.myFuncIHelped = function() {
                  $scope.helpedMe=false;
                  $scope.Ihelped=true;
                  $('.ihelped').attr('style' , 'border-bottom: 1px solid #333;');
                  $('.helpedme').attr('style' , 'border-bottom: none;');
                  $('.everyone').attr('style' , 'border-bottom: none;');
                   
                };
        $scope.EveryoneFunc = function() {

           $scope.helpedMe=true;
           $scope.Ihelped=true;
           $('.everyone').attr('style' , 'border-bottom: 1px solid #333;');
           $('.ihelped').attr('style' , 'border-bottom: none;');
           $('.helpedme').attr('style' , 'border-bottom: none;');
         };
                    
     
     });
