angular.module('BaiYin.common.pageInit', [])

.factory('pageInitService', ['$q', 'loadingAnimation', '$http',
    function($q, loadingAnimation, $http) {
        var pageInit = {};
        pageInit.pageInit = function(apis) {
            loadingAnimation.showLoading('加载中...', 'loding', 0);
            var data = [];
            for (var i = 0; i < apis.length; i++) {
                data[i] = (function() {
                    return $http.get(apis[i]);
                })();
            };
            return $q.all(data).finally(function() {
                loadingAnimation.hideLoading();
            });
        };
        return pageInit;
    }
])