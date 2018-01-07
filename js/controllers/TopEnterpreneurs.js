/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
materialAdmin
 .controller('topenterprenuersCtrl', function($http , $scope ,$window, $rootScope){
      
           
            $scope.filters=[{country:"0" , industry:"0" ,time:"0" }];
            $scope.offset=0;
            $rootScope.topenterpreneurs = [];
            $scope.AutoloadedData=[];
            $scope.scrollEnd =0  ;
             $rootScope.StopNewsFeed = 2;
             $scope.CountryFilter=function(country)
            {
                
                $scope.filters[0].industry = "0";
                $scope.filters[0].time ="0";
                $scope.filters[0].country = country;
                $rootScope.getNewtopentreprenuers();
                $scope.country="";
             

            } 
            $scope.TimeFilter=function(time)
            {
                
                $scope.filters[0].country = "0";
                $scope.filters[0].industry = "0";
                $scope.filters[0].time = time;
                $rootScope.getNewtopentreprenuers();
                $scope.time="";
                

            } 
            $scope.IndustryFilter=function(industry)
            {
                
                $scope.filters[0].industry=industry;
                $scope.filters[0].country = "0";
                $scope.filters[0].time ="0";
                $scope.industry ="0";
                $rootScope.getNewtopentreprenuers();
           
               

            }
            $rootScope.gettopentreprenuers = function (){
                $scope.AutoloadedData =[];
                if( $scope.scrollEnd === 0)
                {
                 $scope.offset+=1;
                  $http({
                    method: 'GET',
                    url: $rootScope.RestDomainUrl+'api/user/topenterpreneurs?access_token='+localStorage.getItem('token')+'&filters[0][country]='+$scope.filters[0]['country'] +'&filters[0][industry]='+$scope.filters[0]['industry'] +'&filters[0][time]='+$scope.filters[0]['time'] +'&limit=10&offset=' + $scope.offset
                  }).then(function successCallback(response) {
                     
                       $scope.AutoloadedData = response.data;
                      
                        if(response.data  != "no new posts")
                        { 
                          for (  $top in  $scope.AutoloadedData )
                              {
                              
                                $rootScope.topenterpreneurs.push( $scope.AutoloadedData[$top]);
                              }
                        
                           console.log ($rootScope.topenterpreneurs);
                        }
                else
                {
                  $rootScope.scrollEnd =1 ;
                }

                }, function errorCallback(response) {
                 
                });
<<<<<<< HEAD
               
=======
                //  $http.get($rootScope.RestDomainUrl+'api/user/topenterpreneurs?access_token='+localStorage.getItem('token')+'&filters[0][country]='+$scope.filters[0]['country'] +'&filters[0][industry]='+$scope.filters[0]['industry'] +'&filters[0][time]='+$scope.filters[0]['time'] +'&limit=10&offset=' + $scope.offset) 
                // .success(function (data, status, headers, config) {
                  

                    if(data  != "NO Users available")
                    {
                      $scope.AutoloadedData=data;
                      for (var i=0 ;i< $scope.AutoloadedData.length ;i++)
                      {
                        $rootScope.topenterpreneurs.push( $scope.AutoloadedData[i] );
                      }
                       $scope.AutoloadedData =[];
                       console.log( $rootScope.topenterpreneurs);

                //     if(data  != "NO Users available")
                //     {
                //       $scope.AutoloadedData=data;
                //       for (var i=0 ;i< $scope.AutoloadedData.length ;i++)
                //       {
                //         alert("innn");
                //         $rootScope.topenterpreneurs.push( $scope.AutoloadedData[i] );
                //       }
                //        // $scope.AutoloadedData =[];
                //        console.log( $scope.AutoloadedData.length);

                      
                //     }
                //     else
                //     {
                //        $scope.scrollEnd =1 ;
                //     }
                   

                // })
                // .error(function (status) {
                //      console.log(status);

                // });
>>>>>>> 06f7a8418a0b160359fef6df88a110c6d5f27e87

              }
            };
             $rootScope.getNewtopentreprenuers = function (){

                 $rootScope.topenterpreneurs = [];
                 $scope.AutoloadedData=[];
                 $scope.offset=0;
                 $scope.scrollEnd =0  ;
                if( $scope.scrollEnd === 0)
                {
                  $scope.offset+=1;
                 $http.get($rootScope.RestDomainUrl+'api/user/topenterpreneurs?access_token='+localStorage.getItem('token')+'&filters[0][country]='+$scope.filters[0]['country'] +'&filters[0][industry]='+$scope.filters[0]['industry'] +'&filters[0][time]='+$scope.filters[0]['time'] +'&limit=10&offset=' + $scope.offset) 
                .success(function (data, status, headers, config) {
                  
                    if(data  != "NO Users available")
                    {
                      $scope.AutoloadedData=data;
                      for (var i=0 ;i< $scope.AutoloadedData.length ;i++)
                      {
                        $rootScope.topenterpreneurs.push( $scope.AutoloadedData[i] );
                      }
                       $scope.AutoloadedData =[];
                       console.log( $rootScope.topenterpreneurs);
                      
                    }
                    else
                    {
                       $scope.scrollEnd =1 ;
                    }
                   

                })
                .error(function (status) {
                     console.log(status);

                });
              }
            };
            $rootScope.gettopentreprenuers();
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
                    
                      $rootScope.gettopentreprenuers();
                     

                  }
                 



              });
          });

            
           
               
            
           


