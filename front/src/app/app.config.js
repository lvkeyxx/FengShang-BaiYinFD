angular.module('BaiYin.app.config', [
    'ionic'
])

/*
 *  正式
 */
//外网
/*.constant('outerNetUri', 'http://61.178.91.96:57001/AppSerivce/json?')

//内网
.constant('intranetUri', 'http://10.0.12.80:57001/AppSerivce/json?')*/

/*
 *  测试
 */
//外网
//.constant('outerNetUri', 'http://124.152.7.69:57001/AppSerivce/json?')
.constant('outerNetUri', 'http://192.168.1.109:81/AppSerivce/json?')
//
//内网
//.constant('intranetUri', 'http://10.0.12.73:57001/AppSerivce/json?')
.constant('intranetUri', 'http://192.168.1.109:81/AppSerivce/json?')

.constant('AppDefaultRootUrl', '/blankPage')

.constant('HTTP_COMMON_ERROR_MESSAGE_INTRANET', '网络异常(内网)!')

.constant('HTTP_COMMON_ERROR_MESSAGE_OUTERNET', '网络异常(外网)!')

//configs
.config(['$ionicConfigProvider', '$provide', '$httpProvider', '$urlRouterProvider', 'AppDefaultRootUrl', '$locationProvider',
    function($ionicConfigProvider, $provide, $httpProvider, $urlRouterProvider, AppDefaultRootUrl, $locationProvider) {
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.navBar.positionPrimaryButtons('left')
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.backButton.icon('backBtn');
        $ionicConfigProvider.scrolling.jsScrolling(true);
        //防止ios滑跑
        $ionicConfigProvider.views.swipeBackEnabled(false);
        $httpProvider.defaults.timeout = 500;

        $provide.decorator('ngClickDirective', ['$delegate', '$timeout', function($delegate, $timeout) {
            var original = $delegate[0].compile;
            var delay = 100;
            $delegate[0].compile = function(element, attrs, transclude) {

                var disabled = false;

                function onClick(evt) {
                    if (disabled) {
                        evt.preventDefault();
                        evt.stopImmediatePropagation();
                    } else {
                        disabled = true;
                        $timeout(function() { disabled = false; }, delay, false);
                    }
                }
                element.on('click', onClick);

                return original(element, attrs, transclude);
            };
            return $delegate;
        }]);

        /**
         * 重定向
         */
        $urlRouterProvider.otherwise(AppDefaultRootUrl);

        /**
         * [enabled description]
         * @type {Boolean}
         * 开启html5的history api
         */

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);
