angular.module('BaiYin.NewProblems', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('NewProblems', {
            url: '/NewProblems',
            controller: 'NewProblemsController',
            templateUrl: 'Problems/NewProblems/newProblems.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])

    .controller('NewProblemsController', ['$scope', 'showAlert', 'pageInitService', '$http', '$state',
        function($scope, showAlert, pageInitService, $http, $state) {
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApproveService&TransName=getUnApprvedList'
                ];
                $scope.nowDate = new Date()
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.listsMsg = result[0]
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            })

            $scope.doRefresh = function() {
                $http.get('ServiceName=ApproveService&TransName=getUnApprvedList')
                    .then(function(res) {
                        agentListMsg(res)
                        $scope.$broadcast('scroll.refreshComplete');
                        if (res.data.length == 10) {
                            $scope.loadNumber = 1;
                            $scope.hasMore = true;
                        } else {
                            $scope.hasMore = false;
                        }
                    }, function(error) {
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }

            $scope.valueCont = 'sie';
            $scope.selectWhich = function() {
                $scope.selectShow = !$scope.selectShow;
            }
            $scope.selectCont = function(val) {

                $scope.valueCont = val;
                console.log($scope.selectShow)
                $scope.selectShow = !$scope.selectShow;


            }
            $scope.conts = [
                { val: 'shijian ' },
                { val: 'shi' }
            ]




            function PreviewImage(imgFile) {
                var filextension = imgFile.value.substring(imgFile.value.lastIndexOf("."), imgFile.value.length);
                filextension = filextension.toLowerCase();
                if ((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
                    alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
                    imgFile.focus();
                } else {
                    var path;
                    if (document.all) //IE
                    {
                        imgFile.select();
                        path = document.selection.createRange().text;

                        document.getElementById("imgPreview").innerHTML = "";
                        document.getElementById("imgPreview").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")"; //使用滤镜效果  
                    } else //FF
                    {
                        path = imgFile.files[0].getAsDataURL();
                        document.getElementById("imgPreview").innerHTML = "<img id='img1' width='120px' height='100px' src='" + path + "'/>";
                        // document.getElementById("img1").src = path;
                    }
                }
            }



            function dochange1() {
                var thissrc;
                thissrc = this.form1.ImgFile1.value;
                strs = thissrc.toLowerCase();
                lens = strs.length;
                extname = strs.substring(lens - 4, lens);
                if (extname == ".jpg" || extname == ".gif" || extname == ".swf" || extname == ".png") {
                    document.getElementById(DoImgName1).src = thissrc;
                    console.log(thissrc)

                }
            }



        }
    ])