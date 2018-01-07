/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 materialAdmin
 .controller('profileCtrl', function(growlService, $scope, $http,$q , $rootScope ,  $stateParams , $timeout){
       
        $scope.businesscontent = "";
    
        $scope.shareClick = function (postid)
        {
          // console.log(postid);
         
          $('#list'+postid ).closest('ul').slideToggle("slow");
            
        };
         // $rootScope.StopTimeout();
         $scope.editName = 0;
         $scope.editOverview = 0;
         $scope.editIndustry = 0;
         $scope.editBusinessname = 0;
         $scope.editBusinessurl = 0;
         $scope.editCity =0;
         $scope.editCountry = 0;
         $scope.editPhone = 0;
        $scope.editEmail = 0;
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
          if(item === 'editIndustry')
          {
              $scope.editIndustry = 1;
          }
           if(item === 'editBusinessname')
          {
              $scope.editBusinessname = 1;
          }
           if(item === 'editBusinessurl')
          {
              $scope.editBusinessurl = 1;
          }
           if(item === 'editCity')
          {
              $scope.editCity = 1;
          }
           if(item === 'editCountry')
          {
              $scope.editCountry = 1;
          }
           if(item === 'editPhone')
          {
              $scope.editPhone = 1;
          }
          if(item === 'editEmail')
          {
              $scope.editEmail = 1;
          }
        };
        $rootScope.getUser=function(userid)
        {
          $scope.userislogged=userid;
          
          if(userid === 0)
          {
            $http({method: 'GET',
                url: $rootScope.RestDomainUrl+'api/users/'+localStorage.getItem('user.id')+'?access_token='+localStorage.getItem('token') , 
                data: $scope.user
              }).then(function successCallback(response) {
                 
                  $scope.user = response.data;
                  
                  $scope.newpost = response.data.posts[response.data.posts.length-1];
                
                  // window.location.href=$rootScope.AngularDomainUrl+'index.html#/pages/profile/'+localStorage.getItem('user.id'); 
                  // console.log($scope.newpost);
        
                }, function errorCallback(response) {
                 
                });
            }
            else
            {
               $http({method: 'GET',
                url: $rootScope.RestDomainUrl+'api/users/'+userid+'?access_token='+localStorage.getItem('token') , 
                data: $scope.user
              }).then(function successCallback(response) {
                 
                  $scope.user = response.data;
                  $scope.newpost = response.data.posts[response.data.posts.length-1];
                 // console.log(response.data.posts[response.data.posts.length-1]);
        
                }, function errorCallback(response) {
                 
                });

            }
        };

        if($stateParams.userid != localStorage.getItem('user.id') && $stateParams.userid )
        {
           $rootScope.getUser($stateParams.userid);

        }
        else
        {
          
           $rootScope.getUser(0);
            // console.log("gggg");
        }
       
        $scope.fd = new FormData();
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
                  $('.profilepic').attr('src', e.target.result);
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
        this.editname = 0;
        this.editOverview = 0;
        this.editInfo = 0;
        this.editContact = 0;
        $scope.error ='NAN';
        
        this.submit = function(item, message) { 
         $scope.editName = 0;
         $scope.editOverview = 0;
         $scope.editIndustry = 0;
         $scope.editBusinessname = 0;
         $scope.editBusinessurl = 0;
         $scope.editCity =0;
         $scope.editCountry = 0;
         $scope.editPhone = 0;
          $scope.editEmail = 0;
           console.log($scope.user.businessoverview);
           $http.post($rootScope.RestDomainUrl+'api/users/'+localStorage.getItem('user.id')+'/images',  $scope.fd,{transformRequest: angular.identity, headers: {'Content-Type': undefined}}) 
             .then(function (data, status, headers, config) {
              localStorage.setItem('user.imageurl', data.data.image);
               if(data.data.logourl !== 'NAN')
                {
                   $scope.user.logourl= data.data.logourl;
                }
                if(data.data.image !== 'NAN')
                {
                   $scope.user.image= data.data.image;
                }
                 $http({
                      method: 'PUT',
                      url: $rootScope.RestDomainUrl+'api/users/'+localStorage.getItem('user.id')+'/update'+'?access_token='+localStorage.getItem('token') , 
                      data:$scope.user
                    }).then(function successCallback(response) {
                       localStorage.setItem('user.imageurl', response.data.image);
                        if(response.data === "Sorry, This email already exists.")
                        {
                          $scope.error = "Sorry, This email already exists.";
                        }
                       }, function errorCallback(response) {
       
                       }); 
                         
                         
                     })
                     .catch(function(error) {
                      console.log(error);
                          
                    });           
              if(item === 'profileName') {
                 
                  this.editname = 0;
              }
              if(item === 'register')
              {
                // window.location.href=$rootScope.AngularDomainUrl+'index.html#/pages/wall';

              }
              
              if(item === 'profileInfo') {
                  
                   
                    this.editInfo = 0;
              }
              
              if(item === 'profileContact') {
                 
                    this.editContact = 0;
              }
              if(item === 'profileOverview') {
                  // $http({
                  //     method: 'PUT',
                  //     url: $rootScope.RestDomainUrl+'api/users/'+localStorage.getItem('user.id')+'/update'+'?access_token='+localStorage.getItem('token') , 
                  //     data: $scope.user
                  //   }).then(function successCallback(response) {
                       
                        
                  //       console.log(response);
              
                        
                  //     }, function errorCallback(response) {
                       
                  //     });
                    this.editOverview = 0;
              }
              
            growlService.growl(message+' has been updated Successfully!', 'inverse'); 
        };
        $scope.GenerateBusinessContent = function(url) {
            $scope.url ={url:url};
            console.log(url);
            $http({ method: 'POST' , 
              url :$rootScope.RestDomainUrl+'api/users/businesspulleds?access_token='+localStorage.getItem('token') , 
             data: $scope.url
            }) 
            .then(function (data, status, headers, config) {

                  $scope.editOverview = 1 ;
                  $scope.user.businessoverview = data.data.description;
                  $scope.user.logourl = data.data.logo;
             })
             .catch(function(error) {
              console.log(error);
                  
            });
           
        };     
       
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
  




    

