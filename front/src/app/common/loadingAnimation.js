angular.module('BaiYin.common.loading', [])

.service('loadingAnimation', ['$ionicLoading', '$timeout', function($ionicLoading, $timeout) {

    this.showLoading = function(template, content, time) {
        $ionicLoading.show({
            template: "加载中...",
            content: content,
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: time
        });

    };
    this.hideLoading = function() {
        $ionicLoading.hide();
    }
    return this;
}])