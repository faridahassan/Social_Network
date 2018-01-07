materialAdmin
    .config(function ($stateProvider, $urlRouterProvider ){
        $urlRouterProvider.otherwise("/login");    
        $stateProvider
         
              .state ('login', {
                url: '/login',
                templateUrl: 'login.html',
                data : {requireLogin : true },
            })
            //------------------------------
            // PAGES
            //------------------------------
           
            .state ('pages', {
                url: '/pages',
                templateUrl: 'views/common.html',
                data : {requireLogin : true },
            })
            //Profile
            .state ('pages.profile', {
                url: '/profile/:userid',
                templateUrl: 'views/profile.html',
                data : {requireLogin : true },
                   resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                ]
                            }
                        ])
                    }
                }
                
            })
            .state ('pages.myprofile', {
                url: '/myprofile/:userid',
                templateUrl: 'views/myprofile.html',
                data : {requireLogin : true },
                   resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                ]
                            }
                        ])
                    }
                }
                
            })
        
            .state ('pages.messages', {
                url: '/messages',
                templateUrl: 'views/messages.html',
                data : {requireLogin : true },
            })
            .state ('pages.topenterpreneurs', {
                url: '/topenterpreneurs',
                templateUrl: 'views/topenterpreneurs.html',
                data : {requireLogin : true },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                ]
                            }
                        ])
                    }
                }
            })
            .state ('pages.request', {
                url: '/resquest',
                templateUrl: 'views/request.html',
                data : {requireLogin : true },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                ]
                            }
                        ])
                    }
                }
            })
            .state ('pages.team', {
                url: '/team',
                templateUrl: 'views/team.html',
                data : {requireLogin : true },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                ]
                            }
                        ])
                    }
                }
            })
            .state ('pages.accountsetting', {
                url: '/accountsetting',
                templateUrl: 'views/accountsetting.html',
                data : {requireLogin : true },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                ]
                            }
                        ])
                    }
                }
            })
            .state ('pages.wall', {
                url: '/wall',
                templateUrl: 'views/wall.html',
                data : {requireLogin : true },
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                ]
                            }
                        ])
                    }
                }
            });
            
           
       
            
    })
    .factory('Auth',function() { return { isLoggedIn : false }; })
//    .run(function ($rootScope, $state, $location, Auth) {
//
//        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
//
//          var shouldLogin = toState.data !== undefined
//                        && toState.data.requireLogin 
//                        && !Auth.isLoggedIn ;
//
//          // NOT authenticated - wants any private stuff
//          if(shouldLogin)
//          {
//            window.location.href='http://localhost:9000/Symfony_AngularJs/recipo/login.html';
//            event.preventDefault();
//            return;
//          }
//
//        console.log(Auth.isLoggedIn);
//          // authenticated (previously) comming not to root main
//          if(Auth.isLoggedIn) 
//          {
//            var shouldGoToMain = fromState.name === ""
//                              && toState.name !== "pages.wall" ;
//
//            if (shouldGoToMain)
//            {
//                $state.go('pages.wall');
//                event.preventDefault();
//            } 
//            return;
//          }
//
//          // UNauthenticated (previously) comming not to root public 
//          var shouldGoToPublic = fromState.name === ""
//                            && toState.name !== "public"
//                            && toState.name !== "login" ;
//
//          if(shouldGoToPublic)
//          {
//              $state.go('login');
//              console.log('p');
//              event.preventDefault();
//          } 
//
//          // unmanaged
//        });
//    })
   
    
    

    
