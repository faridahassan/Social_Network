/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
*//* global $route */

materialAdmin
    //====================================
    // posts
    //====================================
   .controller('newsfeedCtrl', function(growlService, $scope, $http ,$window, $rootScope , $filter  , $timeout , $rootScope , $modal ,  $location, $anchorScroll){
        
        //Get Profile Information from profileService Service
        this.wallCommenting = [];
        this.shareCommenting= [];  
        this.detailsCommenting =[];
        $scope.AllnewsFeed =[]; 
        $scope.AutoloadedData=[];
        // $rootScope.StopNewsFeed = 1;
        // console.log($rootScope.StopNewsFeed);
        $scope.shareClick = function (postid)
        {
           console.log(postid);
          $('#list'+postid ).closest('ul').slideToggle("slow");
            
        };
         $scope.topenterpreneurs=[];
      $scope.gettopentreprenuers = function (){
               
                $scope.offset+=1;
                 $http.get($rootScope.RestDomainUrl+'api/user/topenterpreneurs?access_token='+localStorage.getItem('token')+'&filters[0][time]=0&filters[0][industry]=0&filters[0][country]=0&limit=10&offset=1') 
                .success(function (data, status, headers, config) {
                  
                    if(data  != "NO Users available")
                    {
                     
                      $scope.topenterpreneurs.push( data[0] );
                       console.log( data);
                      
                    }
                   
                   

                })
                .error(function (status) {
                     console.log(status);

                });
              
      };
     $scope.gettopentreprenuers();
      
    ///////////////////////////////MODAL//////////////////////////////////////////////////////
     $scope.modalContent = 'Are you sure you want to delete this request ?';
    
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
        $rootScope.promise ;
        $rootScope.filters=[{country:"0" , industry:"0" , globally:"0" , type:"0"}];
        $scope.offset = 1;
        $rootScope.scrollEnd= 0;
        $rootScope.getPosts= function(){  
        $scope.offset+=1;
    
         if( $rootScope.scrollEnd === 0)
         {
         $http({
            method: 'GET',
            url: $rootScope.RestDomainUrl+'api/post/newsfeed?access_token='+localStorage.getItem('token')+'&filters[0][country]='+$rootScope.filters[0]['country'] +'&filters[0][industry]='+$rootScope.filters[0]['industry'] +'&filters[0][globally]='+$rootScope.filters[0]['globally'] +'&filters[0][type]='+$rootScope.filters[0]['type'] +'&limit=10&offset=' + $scope.offset
          }).then(function successCallback(response) {
             
               $scope.AutoloadedData=response.data;
            
                if(response.data  != "no new posts")
                { 
                   for ($postid in $scope.AutoloadedData )
                  {
                      $scope.AllnewsFeed.push( $scope.AutoloadedData[$postid]);
                  }
                
                }
                else
                {
                  $rootScope.scrollEnd =1 ;
                }

            
               $scope.AutoloadedData =[];
             
              
            }, function errorCallback(response) {
             
            });
        }
       
        };
        
        $rootScope.CheckNewPosts= function(){  
       
          $scope.NewData =[];
          $scope.offset = 1;
         $http({
            method: 'GET',
            url: $rootScope.RestDomainUrl+'api/post/newsfeed?access_token='+localStorage.getItem('token')+'&filters[0][country]='+$rootScope.filters[0]['country'] +'&filters[0][industry]='+$rootScope.filters[0]['industry'] +'&filters[0][globally]='+$rootScope.filters[0]['globally'] +'&filters[0][type]='+$rootScope.filters[0]['type'] +'&limit=10&offset=1'
          }).then(function successCallback(response) {
             $scope.NewData=response.data;
             if( $scope.NewData &&  $scope.AllnewsFeed && $scope.NewData[0].id != $scope.AllnewsFeed[0].id)
             {
             
               $scope.AllnewsFeed.splice(0, 0, $scope.NewData[0]);

             }
            
              $rootScope.promise =  $timeout( $rootScope.CheckNewPosts, $rootScope.NewsfeedTimeout);
             
              
            }, function errorCallback(response) {
             
            });
        };
        
        $rootScope.getNewPosts= function(){  
          $scope.AllnewsFeed =[];
          $scope.AutoloadedData =[];
          $scope.offset = 1;
          $rootScope.scrollEnd= 0;
         $http({
            method: 'GET',
            url: $rootScope.RestDomainUrl+'api/post/newsfeed?access_token='+localStorage.getItem('token')+'&filters[0][country]='+$rootScope.filters[0]['country'] +'&filters[0][industry]='+$rootScope.filters[0]['industry'] +'&filters[0][globally]='+$rootScope.filters[0]['globally'] +'&filters[0][type]='+$rootScope.filters[0]['type'] +'&limit=10&offset=' + $scope.offset
          }).then(function successCallback(response) {
             
              $scope.AutoloadedData=response.data;
              for ($postid in  $scope.AutoloadedData)
              {
                  $scope.AllnewsFeed.push( $scope.AutoloadedData[$postid]);
              }
             }, function errorCallback(response) {
             
            });
        };
        $rootScope.StopTimeout=function(){
              $timeout.cancel( $rootScope.promise);
         };

        $rootScope.StartTimeout=function(){
          $rootScope.promise =  $timeout( $rootScope.CheckNewPosts, $rootScope.NewsfeedTimeout);
          $scope.AutoloadedData =[];
        };
      
     
        $rootScope.getNewPosts();
        $rootScope.CheckNewPosts();
      
       $scope.DeleteModal=function(postid)
        {
            $rootScope.DeletedPostId = postid;
            $scope.open('sm');
        };
        
        $scope.open = function (size ) {
           
            modalInstances(true, size, true, true);
        };
      $scope.list = [];
      $scope.reply={type:"pi",message:"",post:"1",user:"1" , is_private :0 , email:""};
      $rootScope.User={ id:  parseInt(localStorage.getItem('user.id')) ,firstname : localStorage.getItem('user.firstname') ,lastname: localStorage.getItem('user.lastname') , imageurl: localStorage.getItem('user.imageurl') };
                      
    
      
      
      $scope.showFunchion= function(post,type,user,email,message,isprivate,company,phone,name) {
         // console.log(message);
         if(!angular.isUndefined(name))
         {
          console.log(name);
         }
         if(isprivate === "" )
         {
            $scope.reply.is_private = 0;
           
         }
         else
         {
           $scope.reply.is_private=isprivate;
         }
         if( type === "sr" )
         {
            if(!angular.isUndefined(name))
            {
             $scope.reply.message = "Name:"+name;
            }
            if(!angular.isUndefined(email))
            {
             $scope.reply.message += ", Email:"+email;
            }
            if(!angular.isUndefined(phone))
            {
             $scope.reply.message += ", Phone:"+phone;
            }
            if(!angular.isUndefined(company))
            {
             $scope.reply.message += ", Company:"+company;
            }
             if(!angular.isUndefined(message))
            {
             $scope.reply.message += ", Message:"+message;
            }
         }
        
         else if( type === "pi"  )
         {
            if(!angular.isUndefined(email))
            {
             $scope.reply.message += "Email:"+email;
            }
              if(!angular.isUndefined(message))
            {
             $scope.reply.message += ", Message:"+message;
            }
            $scope.reply.is_private = 1;
            $scope.reply.email = email;
         }
        
         else if( type === "a" &&  ! angular.isUndefined(message) )
         {
              $scope.reply.message = message;
         }
          else if( type === "w"  )
         {
         
            if(!angular.isUndefined(email))
            {
             $scope.reply.message += "Email:"+email;
            }
              if(!angular.isUndefined(message))
            {
             $scope.reply.message += ", Message:"+message;
            }
            $scope.reply.is_private = 1;
            $scope.reply.email = email;
         } 

         $scope.list.push($scope.reply.message);
         $scope.reply.type=type;
         $scope.reply.user=localStorage.getItem('user.id');
         $scope.reply.post=post;
        
         $scope.showReplyfunction();
      
      };
      $scope.showReplyfunction=function(){
         
            $http.post($rootScope.RestDomainUrl+'api/replies?access_token='+localStorage.getItem('token'),  $scope.reply) 
              .success(function (data, status, headers, config) {
               
                  $scope.NewReply = data;
                  $scope.post = $filter('filter')($scope.AllnewsFeed, {id: $scope.reply.post})[0];
                   var index = $scope.AllnewsFeed.indexOf($scope.post);
                   $scope.AllnewsFeed[index].replies.push($scope.NewReply);
                   growlService.growl('Reply Posted Successfully and Mail Delivered!', 'inverse');
                   console.log(  data);
                  
              
               })
              .error(function (status) {
                   console.log(status);
                 
              });
      };
    angular.element($window)
    .bind(
      "scroll",
        function() {
           
          var windowHeight = "innerHeight" in window ? window.innerHeight
              : document.documentElement.offsetHeight;
          var body = document.body, html = document.documentElement;
          var docHeight = Math.max(body.scrollHeight,
              body.offsetHeight, html.clientHeight,
              html.scrollHeight, html.offsetHeight);
          windowBottom = windowHeight + window.pageYOffset;
          if (windowBottom >= docHeight-100) {
           
              // console.log($scope.offset);
              $rootScope.getPosts();
             

          }
       });
  
       
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
   
    //====================================
    // TABS
    //====================================

    .controller('TabsDemoCtrl', function ($scope, $window , $http , $rootScope ,$compile,growlService) {
        $scope.filename ="Empty";
       $scope.globalFilter="";
        $scope.tabs = [
            { 
                title:'Supplier Recommendation',
            },
            
            { 
                title:'Advice', 
            },
            { 
               title:'Personal Intro', 
            }

        ];
       
        $scope.post={type:"sr", message:"",user:localStorage.getItem('user.id') , replies_is_private: "0" , file:"" , replies_is_closed: "0"}; 
        $scope.post.message = $scope.tabs[0].message;
        $scope.newpost = {type:"empty"};
        $scope.tabs[0].isPrivate = 0 ;
        $scope.tabs[1].isPrivate = 0 ;
        $scope.tabs[2].isPrivate = 0 ;
        $scope.fd = new FormData(); 
      $scope.currentposttype= function($type){
       
          if($type == "Personal Intro")
          {
             $scope.post.type = "pi" ;
             $scope.fd = new FormData(); 
             $scope.post.message = $scope.tabs[2].message;
             $scope.post.replies_is_private =  $scope.tabs[2].isPrivate ;
          }
          else if ($type == "Supplier Recommendation")
          {
              $scope.post.type = "sr" ; 
              $scope.fd = new FormData(); 
              $scope.post.message = $scope.tabs[0].message;
              $scope.post.replies_is_private =  $scope.tabs[0].isPrivate ;
          }
          else if ($type == "Advice")
          {
              $scope.post.type = "a" ; 
              $scope.fd = new FormData(); 
              $scope.post.message = $scope.tabs[1].message;
              $scope.post.replies_is_private =  $scope.tabs[1].isPrivate ;
          }
          
          
      };
     
        $scope.fileNameChanged = function(file) {  
<<<<<<< HEAD
              setTimeout(function () {
                  $scope.$apply(function () {
                       $scope.filename = file.files[0].name ;
                  });
              }, 10);  
              
               $scope.fd.append('file', file.files[0]);
               if (file.files && file.files[0]) 
               {
                  var reader = new FileReader();
                  
                  reader.onload = function (e) {
                      $('.thumbnailUploaded').attr('src', e.target.result);
                      $('.tabcontrols').attr('style', 'height:130px');
                  }
                  
                  reader.readAsDataURL(file.files[0]);
                  $('.uploadImage').css('visibility','visible');
               
                 
                  
              }
=======
         
         // console.log(file.files); 
         // console.dir(file.files[0].name); 
         setTimeout(function () {
            $scope.$apply(function () {
                 $scope.filename = file.files[0].name ;
            });
        }, 10);  
        
         $scope.fd.append('file', file.files[0]);
         if (file.files && file.files[0]) 
         {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('.thumbnailUploaded').attr('src', e.target.result);
                $('.tabcontrols').attr('style', 'height:130px');
                $('.uploadImage').css('display','block');
                $('.uploadPlaceHolder').css('display','none');
            }
            
            reader.readAsDataURL(file.files[0]);

            //   var myEl = angular.element( document.querySelector( '.tabcontrols' ) );
            // myEl.attr('style',"height:100px;");
              // var el = document.getElementsByClassName("filterspannel");
              // el.attr("height", "100px");
              // $compile(el);
           
            
        }

          
         
>>>>>>> 06f7a8418a0b160359fef6df88a110c6d5f27e87
        };
         $scope.closeUpload = function ()
          {
            $('.uploadImage').css('display','none');
            $('.uploadPlaceHolder').css('display','inline-block');
            $('.thumbnailUploaded').attr('src',"");
            $('.tabcontrols').attr('style', 'height:65px;padding:15px;');
           
         
          };
           
      $scope.postnewsfeed = function() { 

            
            if( $scope.post.type === "pi")
            {
             $scope.post.message = $scope.tabs[2].message;
             $scope.tabs[2].message = "" ;
             $scope.post.replies_is_private = $scope.tabs[2].isPrivate;
             $scope.tabs[2].isPrivate = 0 ;
            }
            else if ($scope.post.type === "sr" )
            {
              
              $scope.post.message = $scope.tabs[0].message;
              $scope.tabs[0].message = "" ;
              $scope.post.replies_is_private = $scope.tabs[0].isPrivate;
              $scope.tabs[0].isPrivate = 0 ;
            }
            else if ($scope.post.type === "a" )
             {
             
              $scope.post.message = $scope.tabs[1].message;
              $scope.tabs[1].message = "" ;
              $scope.post.replies_is_private = $scope.tabs[1].isPrivate;
              $scope.tabs[1].isPrivate = 0 ;
            }

            $scope.fd.append('type', $scope.post.type);
            $scope.fd.append('user', $scope.post.user);
            $scope.fd.append('message', $scope.post.message);
            $scope.fd.append('replies_is_private', $scope.post.replies_is_private);
             $scope.fd.append('replies_is_closed', $scope.post.replies_is_closed);
            console.log($scope.post.replies_is_private);
            $('.uploadImage').css('display','none');
            $('.uploadPlaceHolder').css('display','inline-block');
            
            $('.tabcontrols').attr('style', 'height:65px');
             $http.post($rootScope.RestDomainUrl+'api/posts',  $scope.fd,{transformRequest: angular.identity, headers: {'Content-Type': undefined}}) 
             .then(function (data, status, headers, config) {
                  
                 $scope.newpost = data.data;
                 
                 $http.get($rootScope.RestDomainUrl+'api/posts/'+$scope.newpost.id,  $scope.post) 
                  .then(function (data, status, headers, config) {
                    $scope.newpost = data.data;
                    growlService.growl('Post Posted Successfully!', 'inverse');
                    $scope.fd = new FormData(); 

                   
                  })
                  .catch(function(error) {
                  
                });

             
             
            })
            .catch(function(error) {
                
              });

            }; 
            $scope.CountryFilter=function(country)
            {
                
                $rootScope.filters[0].industry = "0";
                $rootScope.filters[0].globally = "0";
                $rootScope.filters[0].type ="0";
                $rootScope.filters[0].country = country;
                $rootScope.getNewPosts();
                $scope.country="";
               

            } 
            $scope.TypeFilter=function(type)
            {
                
                $rootScope.filters[0].country = "0";
                $rootScope.filters[0].industry = "0";
                $rootScope.filters[0].type =type;
                $rootScope.getNewPosts();
                $scope.type="";
                

            } 
            $scope.IndustryFilter=function(industry)
            {
                
                $rootScope.filters[0].industry=industry;
                $rootScope.filters[0].country = "0";
                $rootScope.filters[0].type ="0";
                $scope.industry ="0";
                $rootScope.getNewPosts();
               
               

            }
            $scope.GlobalOrLocal = function (filter)
            {

             if(filter === true)
              {
                  
                  $('#global').hide();
                  $('#local').show();
                  $rootScope.filters[0].globally="1";
                  $rootScope.filters[0].industry = "0";
                  $rootScope.filters[0].country = "0";
                  $rootScope.filters[0].type ="0";
                  $rootScope.getNewPosts();
              }
              else
              {
                $('#global').show();
                $('#local').hide();
                $rootScope.filters[0].globally="0";
                $rootScope.filters[0].industry = "0";
                $rootScope.filters[0].country = "0";
                $rootScope.filters[0].type ="0";
                $rootScope.getNewPosts();
              }
            };

   
    })
.directive('newPost', function(){
            return {
                restrict: 'AEC',
                templateUrl:'views/singlepost.html',
                replace: true,
                transclude: false,
                controller: 'newsfeedCtrl as newctrl',
                scope: {
                    newpost: '=newPost',

                }

            };
        });


