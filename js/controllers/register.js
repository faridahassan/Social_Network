/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 materialAdmin
 .controller('registerCtrl', function(growlService, $scope, $http,$q , $rootScope ,  $stateParams){
       
        $rootScope.SecurityCheck = function ()
        {
            if(!localStorage.getItem('user.id'))
            {
                 window.location.href=$rootScope.AngularDomainUrl+'login.html';
                 
            }

        };
         $rootScope.StopNewsFeed = 2;
         $rootScope.SecurityCheck();  
        $scope.fd = new FormData();

        $scope.User={ id:  parseInt(localStorage.getItem('user.id')) ,firstname : localStorage.getItem('user.firstname') ,lastname: localStorage.getItem('user.lastname') , image: "NAN" , businessurl: localStorage.getItem('user.businessurl') , logourl : "NAN" };
         // console.log( $scope.User);  
        $scope.type="";             
        $scope.fileNameChanged = function(file , type) {
         
        if(type === "profile")
          {
            $scope.fd.append('file', file.files[0]);
            // $scope.fd.append('filetype', 'profile');
            $scope.type += type;
            // console.log(file);
           if (file.files && file.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                  $('#profilepic').attr('src', e.target.result);
                }
                reader.readAsDataURL(file.files[0]);

               
            }
          }
           if(type === "logo")
          {
            $scope.fd.append('logofile', file.files[0]);
            // $scope.fd.append('filetype', 'logo');
            // console.log(file);
            $scope.type += type;
           if (file.files && file.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $('.logopic').attr('src', e.target.result);
                    // $scope.User.logourl = e.target.result;
                    // alert($scope.User.logourl);
                   
                 }
                reader.readAsDataURL(file.files[0]);

               
            }
          }
           $scope.fd.append('filetype', $scope.type);
        };
        //Edit
         $scope.editName = 0;
         $scope.editOverview = 0;
         $scope.editIndustry = 0;
         $scope.editBusinessname = 0;
         $scope.editBusinessurl = 0;
         $scope.editCity =0;
         $scope.editCountry = 0;
        $scope.error ='NAN';
        $scope.openEdit= function(item )
        {

          if(item === 'editName')
          {
              $scope.editName = 1;
          }
          if(item === 'editOverview')
          {
              $scope.editOverview = 1;
          }
          // if(item === 'editIndustry')
          // {
          //     $scope.editIndustry = 1;
          // }
          //  if(item === 'editBusinessname')
          // {
          //     $scope.editBusinessname = 1;
          // }
           if(item === 'editBusinessurl')
          {
              $scope.editBusinessurl = 1;
          }
          //  if(item === 'editCity')
          // {
          //     $scope.editCity = 1;
          // }
          //  if(item === 'editCountry')
          // {
          //     $scope.editCountry = 1;
          // }
        };

        $scope.submitdata = function(item, message) {
         $http.post($rootScope.RestDomainUrl+'api/users/'+localStorage.getItem('user.id')+'/images',  $scope.fd,{transformRequest: angular.identity, headers: {'Content-Type': undefined}}) 
                     .then(function (data, status, headers, config) {
                         localStorage.setItem('user.imageurl', data.data.image);
                         if(data.data.logourl !== 'NAN')
                          {
                             $scope.User.logourl= data.data.logourl;
                          }
                          if(data.data.image !== 'NAN')
                          {
                             $scope.User.image= data.data.image;
                          }
                          $http({
                              method: 'PUT',
                              url: $rootScope.RestDomainUrl+'api/users/'+localStorage.getItem('user.id')+'/update'+'?access_token='+localStorage.getItem('token') , 
                              data:$scope.User
                            }).then(function successCallback(response) {
                            
                                localStorage.setItem('user.imageurl', response.data.image);
                               
                                 window.location.href=$rootScope.AngularDomainUrl+'index.html#/pages/wall';
                               }, function errorCallback(response) {
               
                            });
                      })
                     .catch(function(error) {
                      console.log(error);
                          
                    });
             if(item === 'profileName') {
                 
                  this.editName = 0;
              }
              if(item === 'register')
              {
                 

              }
              
              if(item === 'profileInfo') {
                  
                   
                    this.editInfo = 0;
              }
              
              if(item === 'profileContact') {
                 
                    this.editContact = 0;
              }
              if(item === 'profileOverview') {
                 
                    this.editOverview = 0;
              }
              
            // growlService.growl(message+' has been updated Successfully!', 'inverse'); 
          // alert("innnn");
        }; 
        $scope.GenerateBusinessContent = function(url) {
            $scope.url ={url:url};
            console.log(url);
            $http({ method: 'POST' , 
              url :$rootScope.RestDomainUrl+'api/users/businesspulleds?access_token='+localStorage.getItem('token') , 
             data: $scope.url
            }) 
            .then(function (data, status, headers, config) {

                  // $scope.editOverview = 1 ;
                  $scope.User.businessoverview = data.data.description;
                  $scope.User.logourl = data.data.logo;
              
             })
             .catch(function(error) {
              console.log(error);
                  
            });
           
        };    
         $scope.GenerateBusinessContent($scope.User.businessurl);    
       
    });
    
   
           
    // });
    // .directive('isNumber', function () {
    //   return {
    //     require: 'ngModel',
    //     link: function (scope) {  
    //       scope.$watch('phone', function(newValue,oldValue) {
    //                 var arr = String(newValue).split("");
    //                 if (arr.length === 0) return;
    //                 if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
    //                 if (arr.length === 2 && newValue === '-.') return;
    //                 if (isNaN(newValue)) {
    //                     scope.user.phone = oldValue;
    //                 }
    //             });
    //     }
    //   };
    // });
  




    

