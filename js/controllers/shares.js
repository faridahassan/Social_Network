materialAdmin
.factory('$FB', ['$window', function($window) {
    return {
      init: function(fbId) {
        if (fbId) {
          this.fbId = fbId;
          $window.fbAsyncInit = function() {
            FB.init({
              appId: fbId,
              channelUrl: '',
              status: true,
              xfbml: true
            });
          };
          (function(d) {
            var js,
              id = 'facebook-jssdk',
              ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
              return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";

            ref.parentNode.insertBefore(js, ref);

          }(document));
        } else {
          throw ("FB App Id Cannot be blank");
        }
      }
    };

   }])
.directive('facebookg', ['$http', function($http) {
    return {
      scope: {
        callback: '=',
        shares: '='
      },
      transclude: true,
      // template: '<div class="facebookButton">' +
      //   '<div class="pluginButton">' +
      //   '<div class="pluginButtonContainer">' +
      //   '<div class="pluginButtonImage">' +
      //   '<button type="button">' +
      //   '<i class="pluginButtonIcon img sp_plugin-button-2x sx_plugin-button-2x_favblue"></i>' +
      //   '</button>' +
      //   '</div>' +
      //   '<span class="pluginButtonLabel">Share</span>' +
      //   '</div>' +
      //   '</div>' +
      //   '</div>' +
      //   '<div class="facebookCount">' +
      //   '<div class="pluginCountButton pluginCountNum">' +
      //   '<span ng-transclude></span>' +
      //   '</div>' +
      //   '<div class="pluginCountButtonNub"><s></s><i></i></div>' +
      //   '</div>',
      link: function(scope, element, attr) {
        attr.$observe('url', function() {
          if (attr.shares && attr.url) {
            $http.get('https://api.facebook.com/method/links.getStats?urls=' + attr.url + '&format=json').success(function(res) {
              var count = res[0] ? res[0].total_count.toString() : 0;
              var decimal = '';
              if (count.length > 6) {
                if (count.slice(-6, -5) != "0") {
                  decimal = '.' + count.slice(-6, -5);
                }
                count = count.slice(0, -6);
                count = count + decimal + 'M';
              } else if (count.length > 3) {
                if (count.slice(-3, -2) != "0") {
                  decimal = '.' + count.slice(-3, -2);
                }
                count = count.slice(0, -3);
                count = count + decimal + 'k';
              }
              scope.shares = count;
            }).error(function() {
              scope.shares = 0;
            });
          }
          element.unbind();
          element.bind('click', function(e) {
            FB.ui({
              method: 'share',
              href: attr.url
            }, function(response){
              if (scope.callback !== undefined && typeof scope.callback === "function") {
                scope.callback(response);
              }
            });
            e.preventDefault();
          });
        });
      }
    };
   }])
  .directive('twitterr', ['$timeout', function($timeout) {
    return {
      link: function(scope, element, attr) {
        var renderTwitterButton = debounce(function() {
          if (attr.url) {
            $timeout(function() {
              element[0].innerHTML = '';
              twttr.widgets.createShareButton(
                attr.url,
                element[0],
                function() {}, {
                  count: attr.count,
                  text: attr.text,
                  via: attr.via,
                  size: attr.size
                }
              );
            });
          }
        }, 75);
       attr.$observe('url', renderTwitterButton);
       attr.$observe('text', renderTwitterButton);
      }
    };
  }])
.directive('linkedinn', ['$timeout', '$http', '$window', function($timeout, $http, $window) {
    return {
      scope: {
        shares: '='
      },
      transclude: true,
     
      link: function(scope, element, attr) {
        var renderLinkedinButton = debounce(function() {
          if (attr.shares && attr.url) {
            $http.jsonp('https://www.linkedin.com/countserv/count/share?url=' + attr.url + '&callback=JSON_CALLBACK&format=jsonp').success(function(res) {
              scope.shares = res.count.toLocaleString();
            }).error(function() {
              scope.shares = 0;
            });
          }
          $timeout(function() {
            element.unbind();
            element.bind('click', function() {
              var url = encodeURIComponent(attr.url).replace(/'/g, "%27").replace(/"/g, "%22")
              $window.open("//www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + attr.title + "&summary=" + attr.summary);
            });
          });
        }, 100);
        attr.$observe('url', renderLinkedinButton);
        attr.$observe('title', renderLinkedinButton);
        attr.$observe('summary', renderLinkedinButton);
      }
    };
  }])