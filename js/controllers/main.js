materialAdmin
    // =========================================================================
    // Base controller for common functions
    // =========================================================================

    .controller('materialadminCtrl', function($timeout, $state, $rootScope,growlService){
        //Welcome Message
//        growlService.growl('Welcome back Mallinda!', 'inverse')
        $rootScope.SecurityCheck = function ()
        {
            if(!localStorage.getItem('user.id'))
            {
                 window.location.href=$rootScope.AngularDomainUrl+'login.html';
                 // alert("inn");
            }

        }; 
         $rootScope.logout = function ()
        {
            localStorage.clear();
            window.location.href=$rootScope.AngularDomainUrl+'login.html';

        };
         $rootScope.SecurityCheck(); 
        
        // Detact Mobile Browser
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
           angular.element('html').addClass('ismobile');
        }

        // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
        this.sidebarToggle = {
            left: false,
            right: false
        }

        // By default template has a boxed layout
        this.layoutType = localStorage.getItem('ma-layout-status');
        
        // For Mainmenu Active Class
        this.$state = $state;    
        
        //Close sidebar on click
        this.sidebarStat = function(event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
                this.sidebarToggle.right = false;
            }
        }
        
        //Listview Search (Check listview pages)
        this.listviewSearchStat = false;
        
        this.lvSearch = function() {
            this.listviewSearchStat = true; 
        }
        
        //Listview menu toggle in small screens
        this.lvMenuStat = false;
        

        
        this.wallImage = false;
        this.wallVideo = false;
        this.wallLink = false;
    })


    // =========================================================================
    // Header
    // =========================================================================
    .controller('headerCtrl', function($timeout, messageService){
    
         // Top Search
        this.openSearch = function(){
            angular.element('#header').addClass('search-toggled');
            //growlService.growl('Welcome back Mallinda Hollaway', 'inverse');
        }

        this.closeSearch = function(){
            angular.element('#header').removeClass('search-toggled');
        }
        
        // Get messages and notification for header
        this.img = messageService.img;
        this.user = messageService.user;
        this.user = messageService.text;

        this.messageResult = messageService.getMessage(this.img, this.user, this.text);


        //Clear Notification
        this.clearNotification = function($event) {
            $event.preventDefault();
            
            var x = angular.element($event.target).closest('.listview');
            var y = x.find('.lv-item');
            var z = y.size();
            
            angular.element($event.target).parent().fadeOut();
            
            x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
            x.find('.grid-loading').fadeIn(1500);
            var w = 0;
            
            y.each(function(){
                var z = $(this);
                $timeout(function(){
                    z.addClass('animated fadeOutRightBig').delay(1000).queue(function(){
                        z.remove();
                    });
                }, w+=150);
            })
            
            $timeout(function(){
                angular.element('#notifications').addClass('empty');
            }, (z*150)+200);
        }
        
        // Clear Local Storage
        this.clearLocalStorage = function() {
            
            //Get confirmation, if confirmed clear the localStorage
            swal({   
                title: "Are you sure?",   
                text: "All your saved localStorage values will be removed",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#F44336",   
                confirmButtonText: "Yes, delete it!",   
                closeOnConfirm: false 
            }, function(){
                localStorage.clear();
                swal("Done!", "localStorage is cleared", "success"); 
            });
            
        }
        
        //Fullscreen View
        this.fullScreen = function() {
            //Launch
            function launchIntoFullscreen(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            //Exit
            function exitFullscreen() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }

            if (exitFullscreen()) {
                launchIntoFullscreen(document.documentElement);
            }
            else {
                launchIntoFullscreen(document.documentElement);
            }
        }
    
    })



    // =========================================================================
    // Recent Items Widget
    // =========================================================================

    .controller('recentitemCtrl', function(recentitemService){
        
        //Get Recent Items Widget Data
        this.id = recentitemService.id;
        this.name = recentitemService.name;
        this.parseInt = recentitemService.price;
        
        this.riResult = recentitemService.getRecentitem(this.id, this.name, this.price);
    })


    // =========================================================================
    // Recent Posts Widget
    // =========================================================================
    
    .controller('recentpostCtrl', function(recentpostService){
        
        //Get Recent Posts Widget Items
        this.img = recentpostService.img;
        this.user = recentpostService.user;
        this.text = recentpostService.text;
        this.rpResult = recentpostService.getRecentpost(this.img, this.user, this.text);
    })




//=================================================
    // LOGIN & Registration 
    //=================================================
  
    
   .controller('loginCtrl',['$scope', 'Auth' ,'$http','$location','$rootScope',function($scope, Auth  , $http , $window  , $rootScope) 
    { 
      //Status
   
        this.login = 1;
        this.register = 0;
        this.forgot = 0;
        
        $scope.user={firstname:"" , lastname:"" , email:"" , password:"" , businessurl:"" , businessoverview:""};
        $scope.invitationUser ={fullname:""  , email:"" , country:""};
        $scope.notify="";
        // localStorage.clear();

        $scope.authoniticateLogin = function() { 
        var user = $http.get($rootScope.RestDomainUrl+'oauth/v2/token?client_id=1_25gut34m580044kgo4kow840skswkk048w8ckoggo408kgkocc&client_secret=4qwmur42v7k04sw0ks0g8socww0gc080ksgo4ocskgkk04kog4&grant_type=password&username='+$scope.email+'&password='+$scope.password) 
            .then(function(response) {
                // Store the username, get the profile.
             localStorage.setItem('token',response.data.access_token);

             $http.get($rootScope.RestDomainUrl+'api/user/loggeduser?access_token='+localStorage.getItem('token')).then(
                    function (response){
                         console.log(response);
                        localStorage.setItem('user.id', response.data.id);
                        localStorage.setItem('user.firstname', response.data.firstname);
                        localStorage.setItem('user.lastname', response.data.lastname);
                        localStorage.setItem('user.imageurl', response.data.image);
                        $rootScope.User={ id:  parseInt(localStorage.getItem('user.id')) ,firstname : localStorage.getItem('user.firstname') ,lastname: localStorage.getItem('user.lastname') , imageurl: localStorage.getItem('user.imageurl') };
                        window.location.href=$rootScope.AngularDomainUrl+'index.html#/pages/wall';  
                    });
             })
             .catch(function(error) {
                 $scope.notify="Email or Password is wrong.";
              });
              
        };

         $scope.register = function() {
           
           $http.post($rootScope.RestDomainUrl+'api/users?firstname='+$scope.user.firstname+'&lastname='+$scope.user.lastname+'&email='+$scope.user.email+'&password='+$scope.user.password +'&businessurl='+$scope.user.businessurl +'&businessoverview='+$scope.user.businessoverview) 
            .then(function (data, status, headers, config) {
                console.log(data);
                 if(data.data === "Sorry, This email already exists.")
                    {
                      $scope.notifyregistration = "Sorry, This email already exists.";
                     
                    }
                    else
                    {
              
                        $http.get($rootScope.RestDomainUrl+'oauth/v2/token?client_id=1_25gut34m580044kgo4kow840skswkk048w8ckoggo408kgkocc&client_secret=4qwmur42v7k04sw0ks0g8socww0gc080ksgo4ocskgkk04kog4&grant_type=password&username='+$scope.user.email+'&password='+$scope.user.password) 
                        .then(function (data, status, headers, config) {
                          localStorage.setItem('token', data.data.access_token);
                          console.log(data.data.access_token);
                            $http.get($rootScope.RestDomainUrl+'api/user/loggeduser?access_token='+localStorage.getItem('token')).then(
                                function (response){
                                    localStorage.setItem('user.id', response.data.id);
                                    localStorage.setItem('user.firstname', response.data.firstname);
                                    localStorage.setItem('user.lastname', response.data.lastname);
                                    localStorage.setItem('user.imageurl', response.data.image);
                                    localStorage.setItem('user.businessurl', response.data.businessurl);
                                    localStorage.setItem('user.logourl', response.data.logourl);
                                    $rootScope.User={ id:  parseInt(localStorage.getItem('user.id')) ,firstname : localStorage.getItem('user.firstname') ,lastname: localStorage.getItem('user.lastname') , imageurl: localStorage.getItem('user.imageurl') , logourl: localStorage.getItem('user.logourl')};
                                     // console.log($rootScope.User);
                                     window.location.href=$rootScope.AngularDomainUrl+'profile.html';

                                });
                        
                                });
                    }
                })
                 .catch(function(error) {
                               
                              });
                        };
       
        $scope.inviationRequest = function ()
        {
                $http.get($rootScope.RestDomainUrl+'api/user/joinrequest?name='+$scope.invitationUser.fullname+'&email=' +$scope.invitationUser.email +'&country='+$scope.invitationUser.country)
                .then(function(response) {
                   window.location.href=$rootScope.AngularDomainUrl+'login-thankyou.html';  
                  
                 })
                 .catch(function(error) {
                     // $scope.notify="Email or Password is wrong.";
                  });

        };
        //  $scope.GenerateBusinessContent = function(url) {
        //     $scope.url ={url:url};
        //     console.log(url);
        //     $http({ method: 'POST' , 
        //       url :$rootScope.RestDomainUrl+'api/users/businesspulleds?access_token='+localStorage.getItem('token') , 
        //      data: $scope.url
        //     }) 
        //     .then(function (data, status, headers, config) {

        //           $scope.editOverview = 1 ;
        //           $scope.user.businessoverview = data.data.description;
        //           $scope.user.logourl = data.data.logo;
        //      })
        //      .catch(function(error) {
        //       console.log(error);
                  
        //     });
           
        // }; 
            

    }])
    



    //Add event Controller (Modal Instance)
    .controller('addeventCtrl', function($scope, $modalInstance, calendarData){
        
        //Calendar Event Data
        $scope.calendarData = {
            eventStartDate: calendarData[0],
            eventEndDate:  calendarData[1]
        };
    
        //Tags
        $scope.tags = [
            'bgm-teal',
            'bgm-red',
            'bgm-pink',
            'bgm-blue',
            'bgm-lime',
            'bgm-green',
            'bgm-cyan',
            'bgm-orange',
            'bgm-purple',
            'bgm-gray',
            'bgm-black',
        ]
        
        //Select Tag
        $scope.currentTag = '';
        
        $scope.onTagClick = function(tag, $index) {
            $scope.activeState = $index;
            $scope.activeTagColor = tag;
        } 
        
        //Add new event
        $scope.addEvent = function() {
            if ($scope.calendarData.eventName) {

                //Render Event
                $('#calendar').fullCalendar('renderEvent',{
                    title: $scope.calendarData.eventName,
                    start: $scope.calendarData.eventStartDate,
                    end:  $scope.calendarData.eventEndDate,
                    allDay: true,
                    className: $scope.activeTagColor

                },true ); //Stick the event

                $scope.activeState = -1;
                $scope.calendarData.eventName = '';     
                $modalInstance.close();
            }
        }
        
        //Dismiss 
        $scope.eventDismiss = function() {
            $modalInstance.dismiss();
        }
    })





