angular.module('BaiYin.common.showAlert', ['ionic', 'ionic-toast'])

    .service('showAlert', ['$ionicPopup','ionicToast', function ($ionicPopup,ionicToast) {
       /* if(!isApp){*/
            this.showMsg = function (error, title, template, okText) {
                if (error.msg) {
                    ionicToast.show(error.msg,'top',false,3000);
                } else {
                    ionicToast.show(template,'top',false,3000);
                    //$cordovaToast.showShortBottom(template);
                    // showAlert(title, template, okText)
                }
            };
        /*}else{
            this.showMsg = function (error, title, template, okText) {
                var showAlert = function (title, template, okText) {
                    var alertPopup = $ionicPopup.alert({
                        title: title,
                        okText: okText,
                        template: template
                    });
                    alertPopup.then(function (res) {
                    });
                };
                if (error.msg) {
                    showAlert(title, error.msg, okText)
                } else {
                    showAlert(title, template, okText)
                }
            };
        }*/

        return this;
    }])