/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
*//* global $route */

materialAdmin
.controller('temp',function($scope,$timeout){

  // $timeout(function(){
  //   $scope.url = 'http://google.com';
  //   $scope.text = 'testing share';
  //   $scope.title = 'title1'
  // },1000)
  $timeout(function(){
    $scope.url =  'http://www.equation-solutions.com/reciprocas/reciprocasangular/recipo/index.html#/pages/profile/';
    $scope.text = 'testing second share';
    $scope.title = 'title2';
  },100)

  $scope.callback = function(response){
    console.log(response);
    //alert('share callback');
  }
}); 