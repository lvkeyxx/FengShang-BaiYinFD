(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('Agents/Agents.tpl.html',
    '<ion-view class="agents">\n' +
    '    <ion-nav-title>代办列表</ion-nav-title>\n' +
    '    <ion-content class="padding">\n' +
    '        <div class="list">\n' +
    '            <a class="item item-icon-left" ng-click="erpAgents(item)">\n' +
    '                <i class="icon ion-ios-paper-outline"></i>\n' +
    '                <h2>ERP待办<span class="c_red">{{listLength}}</span> </h2>\n' +
    '                <p></p>\n' +
    '            </a>\n' +
    '            <a class="item item-icon-left" ng-click="erpAgents(item)">\n' +
    '                <i class="icon ion-compose"></i>\n' +
    '                <h2>OA待办<span class="c_red">{{listLength}}</span></h2>\n' +
    '                <p></p>\n' +
    '            </a>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('AllLeave/Leaves.tpl.html',
    '<ion-view class="agents">\n' +
    '    <ion-nav-title>业务申请</ion-nav-title>\n' +
    '    <ion-content class="padding">\n' +
    '        <div class="list">\n' +
    '            <a class="item item-icon-left" ng-click="goLeaves(1)">\n' +
    '                <i class="icon ion-ios-paper-outline"></i>\n' +
    '                <h2>休假申请<!-- <span class="c_red">{{listLength}}</span> --> </h2>\n' +
    '                <p></p>\n' +
    '            </a>\n' +
    '            <a class="item item-icon-left" ng-click="goLeaves(2)">\n' +
    '                <i class="icon ion-compose"></i>\n' +
    '                <h2>出差申请<!-- <span class="c_red">{{listLength}}</span> --></h2>\n' +
    '                <p></p>\n' +
    '            </a>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/attence.tpl.html',
    '<ion-view class="attenceCSS">\n' +
    '    <ion-nav-title>{{DeptName}}</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="attence">\n' +
    '            <div class="attenceTop">\n' +
    '                <div class="dateShow">\n' +
    '                    <div class="weekShow">{{homePageDate.week}}</div>\n' +
    '                    <div class="dayShow">{{homePageDate.day}}</div>\n' +
    '                    <div class="name">{{UserName}}</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="bluetooth">\n' +
    '                <i class="blueToothIcon"></i><em id="blueToothAddress"></em>\n' +
    '                <button id="searchBtnBloot" ng-hide="searchBtn" class="searchBlootBtn" ng-click="searchBlueTooth()">搜索</button>\n' +
    '            </div>\n' +
    '            <div class="punchClock">\n' +
    '                <div class="clockIn">\n' +
    '                    <div class="clockinIcon"><!--<img src="../images/attence/clockIn_icon.png">--></div>\n' +
    '                    <div class="clockinDes">\n' +
    '                        <div class="clockinname">上班</div>\n' +
    '                        <div class="clockinTime">{{Go_START_TIME}}</div>\n' +
    '                    </div>\n' +
    '                    <div class="clockinShow">\n' +
    '                        <span ng-hide="sbdktimeShow" id="clockInid">{{punckClockOn.clockTips}}</span>\n' +
    '                        <button id="sbPunchClock" class="clockingreyBtn" ng-click="!canClickInBtn || toClockIn();" ng-hide="clockinBtn">打卡</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="clockout">\n' +
    '                    <div class="clockoutIcon"><!--<img src="../images/attence/clockOut_icon.png">--></div>\n' +
    '                    <div class="clockoutDes">\n' +
    '                        <div class="clockoutname">下班</div>\n' +
    '                        <div class="clockoutTime">{{Go_END_TIME}}</div>\n' +
    '                    </div>\n' +
    '                    <div class="clockoutShow">\n' +
    '                        <span ng-hide="xbdktimeShow" id="clockOutid">{{punckClockOff.clockTips}}1</span>\n' +
    '                        <span ng-hide="xbdktimeShow">\n' +
    '                            <a href="" class="upClockoutBtn" ng-click="toClockupdate()">更新打卡></a>\n' +
    '                        </span>\n' +
    '                        <button id="xbPunchClock" class="clockoutgreyBtn" ng-click="!canClickOutBtn || toClockout();" ng-hide="clockoutBtn">打卡</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!--音频声音-->\n' +
    '            <!--<audio id="bgMusic">-->\n' +
    '                <!--<source src="../images/2946.wav" type="audio/mp3">-->\n' +
    '            <!--</audio>-->\n' +
    '            <div class="navList">\n' +
    '                <ul>\n' +
    '                    <li class="col col-33" ng-click="toMyattence()">\n' +
    '                        <div class="myattence_img"></div>\n' +
    '                        <p>我的考勤</p>\n' +
    '                    </li>\n' +
    '                    <li class="col col-33" ng-click="tocountAttence()">\n' +
    '                        <div class="count_img"></div>\n' +
    '                        <p>考勤统计</p>\n' +
    '                    </li>\n' +
    '                    <li class="col col-33" ng-click="tofillCause()">\n' +
    '                        <div class="reason_img"></div>\n' +
    '                        <p>缺勤事由</p>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('bulletinBoard/bulletinBoard.tpl.html',
    '<ion-view class="bulletinBoardCSS" on-tap="data.showReorder = false">\n' +
    '    <ion-nav-title>公告</ion-nav-title>\n' +
    '    <!-- <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="bulletinBoardList">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>排序号</th>\n' +
    '                    <th>标题</th>\n' +
    '                </tr>\n' +
    '                <tr show-reorder="data.showReorder" on-hold="data.showReorder = !data.showReorder" \n' +
    '                	ng-repeat=" board in tList track by $index">\n' +
    '                    <td>{{board.SORT}}</td>\n' +
    '                    <td ng-click="toEdit(board.LINE_NO)">{{board.NEWS_TITLE}}</td>\n' +
    '                    <td class="button-assertive" ng-click="onItemDelete(board)">\n' +
    '			            delete\n' +
    '			        </td>\n' +
    '			        <td class="ion-navicon" on-reorder="moveItem(board, $fromIndex, $toIndex)"></td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content> -->\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '    	<div class="tips">\n' +
    '            <span>提示：点击公告标题编辑公告</span>\n' +
    '        </div>\n' +
    '        <div class="bulletinBoardList">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>序号</th>\n' +
    '                    <th>标题</th>\n' +
    '                </tr>\n' +
    '             </table>\n' +
    '			<ion-list class="ionList" show-reorder="data.showReorder" on-hold="data.showReorder = !data.showReorder">\n' +
    '		        <ion-item class="item-remove-animate item-text-wrap" \n' +
    '		        	ng-repeat="board in tList track by $index"  board="board"\n' +
    '		                  ng-click="toEdit(board.LINE_NO)">\n' +
    '		                  <!-- on-drag-up="moveItem(board, $fromIndex, $toIndex)"\n' +
    '		                  on-drag-down="moveItem(board, $fromIndex, $toIndex)" -->\n' +
    '          			<span class="titleSpan">{{board.SORT }}</span>\n' +
    '          			<span class="textSpan">{{board.NEWS_TITLE}}</span>\n' +
    '          			<!-- <ion-option-button class="button-assertive" ng-click="onItemDelete(board)">\n' +
    '            			delete\n' +
    '          			</ion-option-button> -->\n' +
    '          			<ion-reorder-button class="ion-navicon" on-reorder="moveItem(board, $fromIndex, $toIndex)"></ion-reorder-button>\n' +
    '		        </ion-item>\n' +
    '		      </ion-list>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('companyNewsDetails/companyNewsDetails.tpl.html',
    '<ion-view class="companyNewsDetailsCSS">\n' +
    '    <ion-nav-title>{{gsxw}}</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="title ">{{title.FILETITLE}}</div>\n' +
    '        <div class="timePublic">{{data.SOURCEADDR}}&nbsp;&nbsp;{{data.PUBDATE | date : "yyyy年MM月dd日"+"发布"}}</div>\n' +
    '        <div class="contentText" ng-bind-html="data.content"></div>\n' +
    '      <!--   <div ng-if="reviewShow">\n' +
    '            <div class="clearfix companyNewReview">\n' +
    '                <button ng-click="likeM(data.ID)" class="reviewBtn1">点赞</button>\n' +
    '                <button ng-click="reviewM()" class="reviewBtn2">评论</button>\n' +
    '            </div>\n' +
    '            <div style="margin-top: 50px;">\n' +
    '                <span class="reviewCont"></span>\n' +
    '                <span ng-repeat="pinName in contMsg track by $index">{{pinName.USERNAME}}&nbsp;&nbsp;&nbsp;&nbsp;</span>\n' +
    '            </div>\n' +
    '            <div ng-show="pingLunMsg">\n' +
    '                <textarea placeholder="评论：" class="pingLun" ng-model="pingNews"></textarea>\n' +
    '                <div class="clearfix" style="display: flex;justify-content: space-between;">\n' +
    '                    <button ng-click="cancleBtn1()" class="button " style="width: 30%;background-color: #ff6e6e;color: white;">取消</button>\n' +
    '                    <button ng-click="publishBtn(pingNews)" class="button button-calm" style="width: 30%;">发表</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="clearfix pingLunCont" ng-repeat="comment in comments">\n' +
    '                <button class="replyCss" ng-click="replyMsg(comment)" style="color: green;">回复</button>\n' +
    '                <div style="color:blue;padding-left: 10px;">\n' +
    '                    <span style="margin-right: 6px;">{{comment.userName}}</span><span>{{comment.createTime}}</span>\n' +
    '                </div>\n' +
    '                <div style="padding-left: 10px;margin-top: 6px;">{{comment.comment}}</div>\n' +
    '                <div style="margin-left: 25px;margin-top: 8px;margin-bottom: 6px;" ng-repeat="com in comment.pinglun">\n' +
    '                    <span style="color: blue;">{{com.USERNAME}}: </span><span>{{com.COMMENTS}}</span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div id="borrom" ng-if="replyContMsg">\n' +
    '                <textarea class="replyMsgCss" ng-model="huiNews" placeholder="回复 {{backName.userName}}："></textarea>\n' +
    '                <div class="clearfix" style="display: flex;justify-content: space-between;">\n' +
    '                    <button ng-click="cancleBtn2()" class="button " style="width: 30%;background-color: #ff6e6e;color: white;">取消</button>\n' +
    '                    <button ng-click="replyBtn2(backName,huiNews)" class="button button-calm" style="width: 30%;">回复</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div> -->\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('EleTrad/EleTrad.tpl.html',
    '<ion-view class="EleTradCSS">\n' +
    '    <ion-nav-title>现货交易</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="Eletradbody">\n' +
    '            <div class="electricSelect">\n' +
    '                <input type="text" class="rightselect" contenteditable="true" id="EleTradID" readonly ng-click="selectEletrad()">\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="graph">\n' +
    '            <div class="graphImg">\n' +
    '                <powerline id="EleTradst" legend="legend" item="item" data="data">\n' +
    '                </powerline>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="marketrbased clearfix">\n' +
    '            <div class="rft">单位：万千瓦时、元/兆瓦时</div>\n' +
    '        </div>\n' +
    '        <div class="graphList">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>日期</th>\n' +
    '                    <th>交易电量</th>\n' +
    '                    <th>交易电价</th>\n' +
    '                    <th>出清电量</th>\n' +
    '                    <th>出清电价</th>\n' +
    '                </tr>\n' +
    '                <tr >\n' +
    '                    <td>2018-05-22</td>\n' +
    '                    <td>41.62<!--{{gsvalue.DAY_ELE_AMOUNT | number:2}} ng-repeat="gsvalue in gsCompanyPower track by $index"--></td>\n' +
    '                    <td>140</td>\n' +
    '                    <td>32.99</td>\n' +
    '                    <td>163</td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('erp/erp.tpl.html',
    '<ion-view class="erpCSS">\n' +
    '    <ion-nav-title>ERP审批</ion-nav-title>\n' +
    '    <ion-content class="padding" has-header="true">\n' +
    '        <div ng-repeat="item in todoList" class="card" ng-click="toDetailsPage(item);">\n' +
    '            <div>{{item.LU_DESCRIPTION}}</div>\n' +
    '            <div class="time text">\n' +
    '                    {{item.OBJVERSION.substr(0, 4)}}年\n' +
    '                    {{item.OBJVERSION.substr(4, 2)}}月\n' +
    '                    {{item.OBJVERSION.substr(6, 2)}}日\n' +
    '            </div>\n' +
    '            <div class="text" ng-bind-html="item.MSG_INFO"></div>\n' +
    '            <div class="details text">\n' +
    '                <span>详情</span>\n' +
    '                <span>\n' +
    '                    <i class="icon ion-chevron-right"></i>\n' +
    '                </span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <ion-infinite-scroll ng-if="hasMore" on-infinite="getTodoList();" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '    <ion-footer-bar>\n' +
    '        <span ng-click="toMyApplyPage();">我申请的</span>\n' +
    '        <span ng-click="toMyJudgePage();">我审批的</span>\n' +
    '    </ion-footer-bar>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('facilityInfo/facilityInfo.tpl.html',
    '<ion-view class="facilityInfoCSS">\n' +
    '    <ion-nav-title>设备台账</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="loadLists">\n' +
    '            <div class="facilityList">\n' +
    '                <div class="scanQRcode">\n' +
    '                    <input type="text" placeholder="请扫描设备二维码" class="scanCode"\n' +
    '                           ng-click="toScanCode()" readonly>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('KPI/KPI.tpl.html',
    '<ion-view class="KPICSS">\n' +
    '    <ion-nav-title>生产指标(全公司 万KW·h)</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button-icon icon ion-rqselect" ng-click="openPopover()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="kpiList">\n' +
    '            <ul>\n' +
    '                <li class="col col-33">\n' +
    '                    日发电量\n' +
    '                    <span>{{(allm.DAY_ELE_AMOUNT)|number:2}}</span>\n' +
    '                </li>\n' +
    '                <li class="col col-33">\n' +
    '                    月发电量\n' +
    '                    <span>{{(allm.MONTH_ELE_AMOUNT)|number:2}}</span>\n' +
    '                </li>\n' +
    '                <li class="col col-33">\n' +
    '                    年发电量\n' +
    '                    <span>{{(allm.YEAR_ELE_AMOUNT)|number:2}}</span>\n' +
    '                </li>\n' +
    '                <li class="col col-33">\n' +
    '                    日限负荷损失电量\n' +
    '                    <span>{{(allm.DAY_LOSS_AMOUNT)|number:2}}</span>\n' +
    '                </li>\n' +
    '                <li class="col col-33">\n' +
    '                    月限负荷损失电量\n' +
    '                    <span>{{(allm.MONTH_LOSS_AMOUNT)|number:2}}</span>\n' +
    '                </li>\n' +
    '                <li class="col col-33">\n' +
    '                    年限负荷损失电量\n' +
    '                    <span>{{(allm.YEAR_LOSS_AMOUNT)|number:2}}</span>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <div class="">\n' +
    '            <div class="graph">\n' +
    '                <div class="timeDes">{{dateStr}}</div>\n' +
    '                <div class="graphImg">\n' +
    '                    <line1 id="main1" legend="legend" item="item" data="data"></line1>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="infoList">\n' +
    '            <div class="dayList">\n' +
    '                <!--<div class="iconbtn">\n' +
    '                    <span class="yearIcon"></span>\n' +
    '                    <button class="dltbBtn"><i class="dltbicon"></i></button>\n' +
    '                </div>-->\n' +
    '                <!--<div class="litop">\n' +
    '                    <div class="relativeRatio">同比：<em>-52.5%</em></div>\n' +
    '                </div>-->\n' +
    '                <div class="allshow">\n' +
    '                    <ul class="allshowul">\n' +
    '                        <li class="name" style="width: 50%">项目现场名称</li>\n' +
    '                        <li class="" style="width: 20%">日发电量</li>\n' +
    '                        <li class="" style="width: 30%">日限负荷损失<br>电量(万KW·h)</li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <div class="lifoot">\n' +
    '                    <ul class="dayequally" ng-repeat="x in daylist track by $index">\n' +
    '                        <li class="name" style="width: 50%">{{x.CONTRACT}}</li>\n' +
    '                        <li class="" style="width: 20%">{{(x.DAY_ELE_AMOUNT)|number:2}}</li>\n' +
    '                        <li class="" style="width: 30%">{{(x.DAY_LOSS_AMOUNT)|number:2}}</li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('MarketbasedTrad/MarketbasedTrad.tpl.html',
    '<ion-view class="MarketbasedTradCSS">\n' +
    '    <ion-nav-title>市场化交易</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="selectMounths">\n' +
    '            <button class="leftSelect" ng-click="getPrebasedMonth(nowMounth)" id="countMouthShowID"></button>\n' +
    '            {{nowMounth | date : "yyyy-MM"}}\n' +
    '            <button class="markbasedSelect" ng-click="getNextbasedMonth(nowMounth)"></button>\n' +
    '            <div class="selectGlassMounth" ng-click="goMarketbasedTradindex()">\n' +
    '                <!--<div class="commitBtn" ></div>-->\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="marketList">\n' +
    '            <table>\n' +
    '                <div class="marketright">单位：(万千瓦时)</div>\n' +
    '                <tr>\n' +
    '                    <th>\n' +
    '                        <span>域名称</span>\n' +
    '                    </th>\n' +
    '                    <th>\n' +
    '                        <span>交易年月</span>\n' +
    '                    </th>\n' +
    '                    <th>\n' +
    '                        <span>申报电量</span>\n' +
    '                    </th>\n' +
    '                    <th>出清电量</th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="ketList in elemarketList">\n' +
    '                    <td>{{ketList.CONTRANCT_NAME}}</td>\n' +
    '                    <td>{{ketList.TRADE_MONTH}}</td>\n' +
    '                    <td>{{ketList.APPLY_CHARGE_VALUE |number:0}}</td>\n' +
    '                    <td>{{ketList.CLEARING_CHARGE_VALUE |number:0}}</td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td colspan=2>合计(全厂)</td>\n' +
    '                    <td>{{APPLY_CHARGE_VALUE_SUM |number:0}}</td>\n' +
    '                    <td>{{CLEARING_CHARGE_VALUE_SUM |number:0}}</td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('load/load.tpl.html',
    '<ion-view class="loadCSS">\n' +
    '    <ion-nav-title>负荷</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button-icon icon ion-fhfx" ng-click="goHistoryInfo()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-tabs class="tabs-icon-only tabs-positive tabs-top mortgagetab">\n' +
    '        <ion-tab title="全厂" ng-click="toQcData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="graph">\n' +
    '                    <div class="timeDes"><i id="tdes"></i><em ng-click="toNearHour()">查看近一小时数据</em></div>\n' +
    '                    <div class="graphImg">\n' +
    '                        <line id="main" legend="legend" item="item" data="data"></line>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>类型</th>\n' +
    '                            <th>实时负荷(MW)</th>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>全厂</td>\n' +
    '                            <td>{{((totalLoad.TOTAL_POWER - 0) < 0 ? 0 : ((totalLoad.TOTAL_POWER - 0) > 999) ? 999 : totalLoad.TOTAL_POWER|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>甘</td>\n' +
    '                            <td>{{((fcLoad.GS_POWER - 0) < 0 ? 0 : ((fcLoad.GS_POWER - 0) > 999) ? 999 :fcLoad.GS_POWER|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>青</td>\n' +
    '                            <td>{{((fcLoad.QH_POWER - 0) < 0 ? 0 : ((fcLoad.QH_POWER - 0) > 999) ? 999 :fcLoad.QH_POWER|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>宁</td>\n' +
    '                            <td>{{((fcLoad.NX_POWER - 0) < 0 ? 0 : ((fcLoad.NX_POWER - 0) > 999) ? 999 :fcLoad.NX_POWER|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>新</td>\n' +
    '                            <td>{{((fcLoad.XJ_POWER - 0) < 0 ? 0 : ((fcLoad.XJ_POWER - 0) > 999) ? 999 :fcLoad.XJ_POWER|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="甘" ng-click="toGsData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="graph">\n' +
    '                    <div class="timeDes">{{timeDes}}<em ng-click="toNearHour()">查看近一小时数据</em></div>\n' +
    '                    <div class="graphImg">\n' +
    '                        <line id="GSmain" legend="legend" item="item" data="data"></line>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>类型</th>\n' +
    '                            <th>风速/光照强度(m/s w/m2)</th>\n' +
    '                            <th>AGC值</th>\n' +
    '                            <th>实时负荷(MW)</th>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>捡&nbsp;&nbsp;财&nbsp;&nbsp;塘</td>\n' +
    '                            <td>{{gsLoad.JCT_FSGZQD|number:2}}</td>\n' +
    '                            <td>{{gsLoad.JCT_AGCZ|number:2}}</td>\n' +
    '                            <td>{{((gsLoad.JCT_SSFH - 0) < 0 ? 0 : ((gsLoad.JCT_SSFH - 0) > 999) ? 999 :gsLoad.JCT_SSFH|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>酒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一</td>\n' +
    '                            <td>{{gsLoad.BDQD_FSGZQD|number:2}}</td>\n' +
    '                            <td>{{gsLoad.BDQD_AGCZ|number:2}}</td>\n' +
    '                            <td>{{((gsLoad.BDQD_SSFH - 0) < 0 ? 0 : ((gsLoad.BDQD_SSFH - 0) > 999) ? 999 :gsLoad.BDQD_SSFH|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>酒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二</td>\n' +
    '                            <td>{{gsLoad.QDDE_FSGZQD|number:2}}</td>\n' +
    '                            <td>{{gsLoad.QDDE_AGCZ|number:2}}</td>\n' +
    '                            <td>{{((gsLoad.QDDE_SSFH - 0) < 0 ? 0 : ((gsLoad.QDDE_SSFH - 0) > 999) ? 999 :gsLoad.QDDE_SSFH|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>敦煌光伏</td>\n' +
    '                            <td>{{gsLoad.DH_FSGZQD|number:2}}</td>\n' +
    '                            <td>--</td>\n' +
    '                            <td>{{((gsLoad.DH_SSFH - 0) < 0 ? 0 : ((gsLoad.DH_SSFH - 0) > 999) ? 999 :gsLoad.DH_SSFH|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="青" ng-click="toQhData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="graph">\n' +
    '                    <div class="timeDes">{{timeDes}}<em ng-click="toNearHour()">查看近一小时数据</em></div>\n' +
    '                    <div class="graphImg">\n' +
    '                        <line id="QHmain" legend="legend" item="item" data="data"></line>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>类型</th>\n' +
    '                            <th>风速/光照强度(m/s w/m2)</th>\n' +
    '                            <th>AGC值</th>\n' +
    '                            <th>实时负荷(MW)</th>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>贝&nbsp;&nbsp;壳&nbsp;&nbsp;梁</td>\n' +
    '                            <td>--</td>\n' +
    '                            <td>--</td>\n' +
    '                            <td>--</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>格&nbsp;&nbsp;尔&nbsp;&nbsp;木</td>\n' +
    '                            <td>--</td>\n' +
    '                            <td>--</td>\n' +
    '                            <td>--</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="宁" ng-click="toNxData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="graph">\n' +
    '                    <div class="timeDes">{{timeDes}}<em ng-click="toNearHour()">查看近一小时数据</em></div>\n' +
    '                    <div class="graphImg">\n' +
    '                        <line id="NXmain" legend="legend" item="item" data="data"></line>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>类型</th>\n' +
    '                            <th>风速/光照强度(m/s w/m2)</th>\n' +
    '                            <th>AGC值</th>\n' +
    '                            <th>实时负荷(MW)</th>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>石&nbsp;&nbsp;嘴&nbsp;&nbsp;山</td>\n' +
    '                            <td>--</td>\n' +
    '                            <td>--</td>\n' +
    '                            <td>--</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="新" ng-click="toXjData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="graph">\n' +
    '                    <div class="timeDes">{{timeDes}}<em ng-click="toNearHour()">查看近一小时数据</em></div>\n' +
    '                    <div class="graphImg">\n' +
    '                        <line id="XJmain" legend="legend" item="item" data="data"></line>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>类型</th>\n' +
    '                            <th>风速/光照强度(m/s w/m2)</th>\n' +
    '                            <th>AGC值</th>\n' +
    '                            <th>实时负荷(MW)</th>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>三&nbsp;&nbsp;塘&nbsp;&nbsp;湖</td>\n' +
    '                            <td>{{xjLoad.STH_FSGZQD|number:2}}</td>\n' +
    '                            <td>{{xjLoad.STH_AGCZ|number:2}}</td>\n' +
    '                            <td>{{((xjLoad.STH_SSFH - 0) < 0 ? 0 : ((xjLoad.STH_SSFH - 0) > 999) ? 999 :xjLoad.STH_SSFH|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>淖&nbsp;&nbsp;毛&nbsp;&nbsp;湖</td>\n' +
    '                            <td>{{xjLoad.NMHN_FSGZQD|number:2}}</td>\n' +
    '                            <td>{{xjLoad.NMHN_AGCZ|number:2}}</td>\n' +
    '                            <td>{{((xjLoad.NMHN_SSFH - 0) < 0 ? 0 : ((xjLoad.NMHN_SSFH - 0) > 999) ? 999 :xjLoad.NMHN_SSFH|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>小&nbsp;&nbsp;草&nbsp;&nbsp;湖</td>\n' +
    '                            <td>{{xjLoad.XCHB_FSGZQD|number:2}}</td>\n' +
    '                            <td>{{xjLoad.XCHB_AGCZ|number:2}}</td>\n' +
    '                            <td>{{((xjLoad.XCHB_SSFH - 0) < 0 ? 0 : ((xjLoad.XCHB_SSFH - 0) > 999) ? 999 :xjLoad.XCHB_SSFH|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>烟&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;墩</td>\n' +
    '                            <td>{{xjLoad.YD_FSGZQD|number:2}}</td>\n' +
    '                            <td>--</td>\n' +
    '                            <td>{{((xjLoad.YD_SSFH - 0) < 0 ? 0 : ((xjLoad.YD_SSFH - 0) > 999) ? 999 :xjLoad.YD_SSFH|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>景&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;峡</td>\n' +
    '                            <td>{{xjLoad.JX_FSGZQD|number:2}}</td>\n' +
    '                            <td>--</td>\n' +
    '                            <td>{{((xjLoad.JX_SSFH - 0) < 0 ? 0 : ((xjLoad.JX_SSFH - 0) > 999) ? 999 :xjLoad.JX_SSFH|number:2)}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('News/News.tpl.html',
    '<ion-view class="NewsCSS">\n' +
    '    <ion-nav-title>{{title}}</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="newsList">\n' +
    '            <ul ng-repeat="cont in newslist track by $index" ng-click="toDetail(cont,$index)">\n' +
    '                <li class="msg_colo" ng-model="gsxw" ng-style="newslistLi">{{cont.FILETITLE}}</li>\n' +
    '                <li class="date_m" ng-model="gsxw"><i class="date_m_icon"></i>{{cont.PUBDATE | date : "MM月dd日" }}</li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <ion-infinite-scroll ng-if="hasMore" on-infinite="loadMore()" distance="10%" immediate-check="false">\n' +
    '        </ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OffLine/OffLine.tpl.html',
    '<ion-view class="OffLineCSS">\n' +
    '    <ion-nav-title>离线巡查</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="osiList" ng-hide="osiListHide">\n' +
    '            <div class="query">\n' +
    '                <div class="scanQRcode">\n' +
    '                    <input type="text" ng-hide="inputHide" placeholder="请扫描设备二维码" class="scanCode" ng-click="toScanCode()"\n' +
    '                            readonly>\n' +
    '                </div>\n' +
    '                <div class="scanSearch" ng-hide="searchsBlueHide">\n' +
    '                    <button class="searchBlootBtn" ng-click="searchsBlueTooth()">搜索</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <ion-list>\n' +
    '                <ion-item ng-repeat="item in patrolRoteListData" item="item" class="item-remove-animate" ng-click="toOsiLine(item)">\n' +
    '                    {{item.DESCRIPTION}}({{item.INSPECT_TYPE}})\n' +
    '                    <span class="item-note ng-binding">{{item.INSPECTED}}/{{item.INSPECT}}</span>\n' +
    '                </ion-item>\n' +
    '            </ion-list>\n' +
    '        </div>\n' +
    '        <div class="position" ng-hide="positionHide">\n' +
    '            <i class="position_icon"></i>位置：{{patrolHomeData.ADDRESS}}\n' +
    '            <span style="display: block;">\n' +
    '                描述：{{patrolHomeData.DESCRIPTION}}\n' +
    '            </span>\n' +
    '            <span style="display: block;">\n' +
    '                设备名称：{{patrolHomeData.MCH_NAME}}\n' +
    '            </span>\n' +
    '            <button class="qdBtn" ng-click="OffLineSign()">签到</button>\n' +
    '            <button class="qdBtn" ng-click="goBack()">返回</button>\n' +
    '        </div>\n' +
    '        <div class="position" ng-hide="uanddHide">\n' +
    '            <button class="qdBtn" ng-click="OffLineDownload()">下载</button>\n' +
    '            <button class="qdBtn" ng-click="OffLineLook()">查看我的巡查记录</button>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OSI/OSI.tpl.html',
    '<ion-view class="OSICSS">\n' +
    '    <ion-nav-title>现场巡查</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button-icon icon ion-timedimension" ng-click="toOsiHistory()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="osiList" ng-hide="osiListHide">\n' +
    '            <div class="query">\n' +
    '                <div class="scanQRcode">\n' +
    '                    <input type="text" ng-hide="inputHide" placeholder="请扫描设备二维码" class="scanCode" ng-click="toScanCode()"\n' +
    '                            readonly>\n' +
    '                </div>\n' +
    '                <div class="scanSearch" ng-hide="searchsBlueHide">\n' +
    '                    <button class="searchBlootBtn" ng-click="searchsBlueTooth()">搜索</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="content">\n' +
    '                <ul class="list">\n' +
    '                    <li ng-repeat="patrolRoteData in patrolRoteListData" class="item item-icon-right" ng-click="toOsiLine(patrolRoteData)">\n' +
    '                        {{patrolRoteData.DESCRIPTION}}({{patrolRoteData.INSPECT_TYPE}})\n' +
    '                        <span class="item-note ng-binding">{{patrolRoteData.INSPECTED}}/{{patrolRoteData.INSPECT}}</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="position" ng-hide="positionHide">\n' +
    '            <i class="position_icon"></i>位置：{{patrolHomeData.ADDRESS}}\n' +
    '            <span style="display: block;">\n' +
    '                描述：{{patrolHomeData.DESCRIPTION}}\n' +
    '            </span>\n' +
    '            <span style="display: block;">\n' +
    '                设备名称：{{patrolHomeData.MCH_NAME}}\n' +
    '            </span>\n' +
    '            <button class="qdBtn" ng-click="patrolSign()">签到</button>\n' +
    '            <button class="qdBtn" ng-click="goBack()">返回</button>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('power/power.tpl.html',
    '<ion-view class="powerCSS">\n' +
    '    <ion-nav-title>电量</ion-nav-title>\n' +
    '    <ion-tabs class="tabs-icon-only tabs-positive tabs-top mortgagetab">\n' +
    '        <ion-tab title="全厂" ng-click="toQcData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="loadList">\n' +
    '                    <div class="dayList" ng-click="toDayInfo()">\n' +
    '                        <div class="iconbtn">\n' +
    '                            <span class="yearIcon"></span>\n' +
    '                        </div>\n' +
    '                        <div class="litop">\n' +
    '                            <div class="relativeRatio"><span class="powertime">{{companyPower.YEARS_TODAY_DATE}}</span><span class="powerright">环比:{{companyPower.DAY_COMPARED_WITH_SAME|number:2}}%</span></div>\n' +
    '                        </div>\n' +
    '                        <div class="allshow">\n' +
    '                            <ul class="allshowul">\n' +
    '                                <!--<li class="col col-33">&nbsp</li>-->\n' +
    '                                <li class="num col col-66">{{(companyPower.DAY_ELE_AMOUNT)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">(万KW·h)</li>\n' +
    '                            </ul>\n' +
    '                        </div>\n' +
    '                        <div class="lifoot">\n' +
    '                            <ul class="dayequally">\n' +
    '                                <li class="col col-33">日平均负荷数</li>\n' +
    '                                <li class="num col col-33">{{(companyPower.DAY_ELE_AVG_CAPACITY)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">MW</li>\n' +
    '                            </ul>\n' +
    '                            <ul class="dayequally">\n' +
    '                                <li class="col col-33">日利用小时数</li>\n' +
    '                                <li class="num col col-33">{{(companyPower.DAY_USE_HOUR)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">h</li>\n' +
    '                            </ul>\n' +
    '                            <ul class="dayequally">\n' +
    '                                <li class="col col-33">昨日电量</li>\n' +
    '                                <li class="num col col-33">{{(companyPower.YESTODAY_ELE_AMOUNT)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">(万KW·h)</li>\n' +
    '                            </ul>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="monthList" ng-click="toMounthInfo()">\n' +
    '                        <div class="iconbtn">\n' +
    '                            <span class="mounthIcon"></span>\n' +
    '                        </div>\n' +
    '                        <div class="litop">\n' +
    '                            <div class="relativeRatio"> <span class="powertime">{{companyPower.YEARS_TODAY_DATE|date:"yyyy-MM" }}</span><span class="powerright">同比：{{companyPower.MONTH_COMPARED_PERIOD_SAME|number:2}}%<br>环比：{{companyPower.MONTH_COMPARED_WITH_SAME|number:2}}%</span></div>\n' +
    '                        </div>\n' +
    '                        <div class="allshow">\n' +
    '                            <ul class="allshowul">\n' +
    '                                <!--<li class="col col-33">&nbsp;</li>-->\n' +
    '                                <li class="num col col-66">{{(companyPower.MONTH_ELE_AMOUNT)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">(万KW·h)</li>\n' +
    '                            </ul>\n' +
    '                        </div>\n' +
    '                        <div class="lifoot">\n' +
    '                            <ul class="dayequally">\n' +
    '                                <li class="col col-33">月计划电量</li>\n' +
    '                                <li class="num col col-33">{{(companyPower.MONTH_PLAN_AMOUNT)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">(万KW·h)</li>\n' +
    '                            </ul>\n' +
    '                            <ul class="dayequally">\n' +
    '                                <li class="col col-33">月计划完成率</li>\n' +
    '                                <li class="num col col-33">{{(companyPower.MONTH_PLAN_COMPLETE)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">%</li>\n' +
    '                            </ul>\n' +
    '                            <ul class="dayequally">\n' +
    '                                <li class="col col-33">月利用小时数</li>\n' +
    '                                <li class="num col col-33">{{(companyPower.MONTH_USE_HOUR)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">h</li>\n' +
    '                            </ul>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="yearList" ng-click="toYearInfo()">\n' +
    '                        <div class="iconbtn">\n' +
    '                            <span class="yearIcon"></span>\n' +
    '                        </div>\n' +
    '                        <div class="litop">\n' +
    '                            <div class="relativeRatio"><span class="powertime">{{companyPower.YEARS_TODAY_DATE|date:"yyyy" }}年</span><span class="powerright">同比：{{(companyPower.YEAR_COMPARED_WITH_SAME)|number:2}}%</span></div>\n' +
    '                        </div>\n' +
    '                        <div class="allshow">\n' +
    '                            <ul class="allshowul">\n' +
    '                                <!--<li class="col col-33">&nbsp;</li>-->\n' +
    '                                <li class="num col col-66">{{(companyPower.YEAR_ELE_AMOUNT)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">(万KW·h)</li>\n' +
    '                            </ul>\n' +
    '                        </div>\n' +
    '                        <div class="lifoot">\n' +
    '                            <ul class="dayequally">\n' +
    '                                <li class="col col-33">年计划电量</li>\n' +
    '                                <li class="num col col-33">{{(companyPower.YEAR_PLAN_AMOUNT)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">(万KW·h)</li>\n' +
    '                            </ul>\n' +
    '                            <ul class="dayequally">\n' +
    '                                <li class="col col-33">年计划完成率</li>\n' +
    '                                <li class="num col col-33">{{(companyPower.YEAR_PLAN_COMPLETE)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">%</li>\n' +
    '                            </ul>\n' +
    '                            <ul class="dayequally">\n' +
    '                                <li class="col col-33">年利用小时数</li>\n' +
    '                                <li class="num col col-33">{{(companyPower.YEAR_USE_HOUR)|number:2}}</li>\n' +
    '                                <li class="unit col col-33">h</li>\n' +
    '                            </ul>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="甘" ng-click="toGsData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="graph">\n' +
    '                    <div class="graphImg">\n' +
    '                        <powerline id="gszst" legend="legend" item="item" data="data">\n' +
    '                        </powerline>\n' +
    '                        <button id="weekGs" class="my_dc dcnone" ng-click="toweekGs()">周统计</button>\n' +
    '                        <button id="dateGs" class="yue_dc dcactive" ng-click="todateGs()">日统计</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>类型</th>\n' +
    '                            <th>日发电量(万KW·h)</th>\n' +
    '                            <th>月发电量(万KW·h)</th>\n' +
    '                            <th>年发电量(万KW·h)</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="gsvalue in gsCompanyPower track by $index">\n' +
    '                            <td>{{gsvalue.CONTRACT_NAME}}</td>\n' +
    '                            <td>{{gsvalue.DAY_ELE_AMOUNT | number:2}}</td>\n' +
    '                            <td>{{gsvalue.MONTH_ELE_AMOUNT | number:2}}</td>\n' +
    '                            <td>{{gsvalue.YEAR_ELE_AMOUNT | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="青" ng-click="toQhData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="graph">\n' +
    '                    <div class="graphImg">\n' +
    '                        <powerline id="qhzst" legend="legend" item="item" data="data"></powerline>\n' +
    '                        <button id="weekQh" class="my_dc dcnone" ng-click="toweekQh()">周统计</button>\n' +
    '                        <button id="dateQh" class="yue_dc dcactive" ng-click="todateQh()">日统计</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>类型</th>\n' +
    '                            <th>日发电量(万KW·h)</th>\n' +
    '                            <th>月发电量(万KW·h)</th>\n' +
    '                            <th>年发电量(万KW·h)</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="qhvalue in qhCompanyPower track by $index">\n' +
    '                            <td>{{qhvalue.CONTRACT_NAME}}</td>\n' +
    '                            <td>{{qhvalue.DAY_ELE_AMOUNT | number:2}}</td>\n' +
    '                            <td>{{qhvalue.MONTH_ELE_AMOUNT | number:2}}</td>\n' +
    '                            <td>{{qhvalue.YEAR_ELE_AMOUNT | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="宁" ng-click="toNxData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="graph">\n' +
    '                    <div class="graphImg">\n' +
    '                        <powerline id="nxzst" legend="legend" item="item" data="data"></powerline>\n' +
    '                        <button id="weekNx" class="my_dc dcnone" ng-click="toweekNx()">周统计</button>\n' +
    '                        <button id="dateNx" class="yue_dc dcactive" ng-click="todateNx()">日统计</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>类型</th>\n' +
    '                            <th>日发电量(万KW·h)</th>\n' +
    '                            <th>月发电量(万KW·h)</th>\n' +
    '                            <th>年发电量(万KW·h)</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="nxvalue in nxCompanyPower track by $index">\n' +
    '                            <td>{{nxvalue.CONTRACT_NAME}}</td>\n' +
    '                            <td>{{nxvalue.DAY_ELE_AMOUNT | number:2}}</td>\n' +
    '                            <td>{{nxvalue.MONTH_ELE_AMOUNT | number:2}}</td>\n' +
    '                            <td>{{nxvalue.YEAR_ELE_AMOUNT | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="新" ng-click="toXjData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="graph">\n' +
    '                    <div class="graphImg">\n' +
    '                        <powerline id="xjzst" legend="legend" item="item" data="data"></powerline>\n' +
    '                        <button id="weekXj" class="xj_dc dcnone" ng-click="toweekXj()">周统计</button>\n' +
    '                        <button id="dateXj" class="xjyue_dc dcactive" ng-click="todateXj()">日统计</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>类型</th>\n' +
    '                            <th>日发电量(万KW·h)</th>\n' +
    '                            <th>月发电量(万KW·h)</th>\n' +
    '                            <th>年发电量(万KW·h)</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="xjvalue in xjCompanyPower track by $index">\n' +
    '                            <td>{{xjvalue.CONTRACT_NAME}}</td>\n' +
    '                            <td>{{xjvalue.DAY_ELE_AMOUNT | number:2}}</td>\n' +
    '                            <td>{{xjvalue.MONTH_ELE_AMOUNT | number:2}}</td>\n' +
    '                            <td>{{xjvalue.YEAR_ELE_AMOUNT | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('Problems/Problems.tpl.html',
    '<ion-view class="agentsList">\n' +
    ' <ion-nav-title>隐患列表</ion-nav-title>\n' +
    '  <ion-nav-buttons side="right">\n' +
    '      <button class="button" ng-click="newProblems()">\n' +
    '        新建\n' +
    '      </button>\n' +
    '    </ion-nav-buttons>\n' +
    ' <ion-content>\n' +
    '  <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()"></ion-refresher>\n' +
    '   <div class="agentList">\n' +
    '     <div>隐患</div>\n' +
    '     <div class=\'handleTime\'>发现时间</div>\n' +
    '   </div>\n' +
    '   <div class="agentsDetail" ng-repeat="item in items" ng-click="agentsItem(item)" >\n' +
    '     <div class="agentsTitle">\n' +
    '     <span class="bagDian"></span>\n' +
    '     {{item.TITLE}}\n' +
    '     </div>\n' +
    '     <div  class="agentsData">{{item.CREATED_DATE | date : "MM月dd日HH时mm分" }}\n' +
    '      <span class="bagImg"></span>\n' +
    '     </div>\n' +
    '   </div>\n' +
    '      <ion-infinite-scroll ng-if="hasMore" on-infinite="loadMore()" distance="1%"\n' +
    '       immediate-check="false">\n' +
    '      </ion-infinite-scroll>\n' +
    ' </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('SettlementTrad/SettlementTrad.tpl.html',
    '<ion-view class="SettlementTradCSS">\n' +
    '    <ion-nav-title>结算电量</ion-nav-title>\n' +
    '    <ion-tabs class="tabs-icon-only tabs-positive tabs-top mortgagetab">\n' +
    '        <ion-tab title="全厂" ng-click="setTlementQc()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="setElementSelectMounth">\n' +
    '                    <button class="setElementleftSelect" ng-click="getPresetTlementYear(nowElementYear)" id="setTlementYearShowID"></button>\n' +
    '                    <span ng-click="chooseNewYear()">{{nowElementYear}}年</span>\n' +
    '                    <button class="setTlementrightSelect" ng-click="getNextsetTlementYear(nowElementYear)" style="display: none"></button>\n' +
    '                </div>\n' +
    '                <div class="countResult">\n' +
    '                    <div class="ydNum">\n' +
    '                        <line id="SettlementmainQC" legend="legend"  data="data"></line>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="marketrbased clearfix">\n' +
    '                    <div class="rft">单位：(万千瓦时)(元/兆瓦时)</div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>月份</th>\n' +
    '                            <th>结算电量</th>\n' +
    '                            <th>结算电价</th>\n' +
    '                            <th>市场化电量</th>\n' +
    '                            <th>市场化电价</th>\n' +
    '                            <th>基础电量</th>\n' +
    '                            <th>基础电价</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="elementList in getElementTradList track by $index" ng-click="getElementToTrandMonth(elementList)">\n' +
    '                            <td>{{elementList.TRADE_MONTH}}</td>\n' +
    '                            <td>{{elementList.TOTAL_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.AVG_CHARGE_PRVICE | number:2}}</td>\n' +
    '                            <td>{{elementList.MARKET_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.MARKET_CHARGE_PRICE | number:2}}</td>\n' +
    '                            <td>{{elementList.BASE_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.BASE_CHARGE_PRICE | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="elementAllList in getElementTradAllList track by $index">\n' +
    '                            <td>合计</td>\n' +
    '                            <td>{{elementAllList.TOTAL_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.AVG_CHARGE_PRVICE | number:2}}</td>\n' +
    '                            <td>{{elementAllList.MARKET_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.RIGHTS_CHARGE_PRICE | number:2}}</td>\n' +
    '                            <td>{{elementAllList.BASE_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.BASE_CHARGE_PRICE | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="甘" ng-click="setTlementGs()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="setElementSelectMounth">\n' +
    '                    <button class="setElementleftSelect" ng-click="getPresetTlementYear(nowElementYear)"></button>\n' +
    '                    <span ng-click="chooseNewYear()">{{nowElementYear}}年</span>\n' +
    '                    <button class="setTlementrightSelect" ng-click="getNextsetTlementYear(nowElementYear)" style="display: none"></button>\n' +
    '                    <div class="setElementGlassMounth">\n' +
    '                        <input class="setElementCount" type="text" placeholder="请选择所在域" ng-click="toSelectField()" value="{{getElementTradDepartValue}}" readonly>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="countResult">\n' +
    '                    <div class="ydNum">\n' +
    '                        <line id="SettlementmainGS" legend="legend"  data="data"></line>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="marketrbased clearfix">\n' +
    '                    <div class="rft">单位：(万千瓦时)(元/兆瓦时)</div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>月份</th>\n' +
    '                            <th>结算电量</th>\n' +
    '                            <th>结算电价</th>\n' +
    '                            <th>市场化电量</th>\n' +
    '                            <th>市场化电价</th>\n' +
    '                            <th>基础电量</th>\n' +
    '                            <th>基础电价</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="elementList in getElementTradList track by $index" ng-click="getElementToTrandMonth(elementList)">\n' +
    '                            <td>{{elementList.TRADE_MONTH}}</td>\n' +
    '                            <td>{{elementList.TOTAL_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.AVG_CHARGE_PRVICE | number:2}}</td>\n' +
    '                            <td>{{elementList.MARKET_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.MARKET_CHARGE_PRICE | number:2}}</td>\n' +
    '                            <td>{{elementList.BASE_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.BASE_CHARGE_PRICE | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="elementAllList in getElementTradAllList track by $index">\n' +
    '                            <td>合计</td>\n' +
    '                            <td>{{elementAllList.TOTAL_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.AVG_CHARGE_PRVICE | number:2}}</td>\n' +
    '                            <td>{{elementAllList.MARKET_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.RIGHTS_CHARGE_PRICE | number:2}}</td>\n' +
    '                            <td>{{elementAllList.BASE_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.BASE_CHARGE_PRICE | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="青" ng-click="setTlementQh()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="setElementSelectMounth">\n' +
    '                    <button class="setElementleftSelect" ng-click="getPresetTlementYear(nowElementYear)"></button>\n' +
    '                    <span ng-click="chooseNewYear()">{{nowElementYear}}年</span>\n' +
    '                    <button class="setTlementrightSelect" ng-click="getNextsetTlementYear(nowElementYear)" style="display: none"></button>\n' +
    '                    <div class="setElementGlassMounth">\n' +
    '                        <input class="setElementCount" type="text" placeholder="请选择所在域" ng-click="toSelectField()"  readonly>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="countResult">\n' +
    '                    <div class="ydNum">\n' +
    '                        <line id="SettlementmainQH" legend="legend"  data="data"></line>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="marketrbased clearfix">\n' +
    '                    <div class="rft">单位：(万千瓦时)(元/兆瓦时)</div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>月份</th>\n' +
    '                            <th>结算电量</th>\n' +
    '                            <th>结算电价</th>\n' +
    '                            <th>市场化电量</th>\n' +
    '                            <th>市场化电价</th>\n' +
    '                            <th>基础电量</th>\n' +
    '                            <th>基础电价</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="elementList in getElementTradList track by $index" ng-click="getElementToTrandMonth(elementList)">\n' +
    '                            <td>{{elementList.TRADE_MONTH}}</td>\n' +
    '                            <td>{{elementList.TOTAL_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.AVG_CHARGE_PRVICE | number:2}}</td>\n' +
    '                            <td>{{elementList.MARKET_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.MARKET_CHARGE_PRICE | number:2}}</td>\n' +
    '                            <td>{{elementList.BASE_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.BASE_CHARGE_PRICE | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="elementAllList in getElementTradAllList track by $index">\n' +
    '                            <td>合计</td>\n' +
    '                            <td>{{elementAllList.TOTAL_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.AVG_CHARGE_PRVICE | number:2}}</td>\n' +
    '                            <td>{{elementAllList.MARKET_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.RIGHTS_CHARGE_PRICE | number:2}}</td>\n' +
    '                            <td>{{elementAllList.BASE_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.BASE_CHARGE_PRICE | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="宁" ng-click="setTlementNx()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="setElementSelectMounth">\n' +
    '                    <button class="setElementleftSelect" ng-click="getPresetTlementYear(nowElementYear)"></button>\n' +
    '                    <span ng-click="chooseNewYear()">{{nowElementYear}}年</span>\n' +
    '                    <button class="setTlementrightSelect" ng-click="getNextsetTlementYear(nowElementYear)" style="display: none"></button>\n' +
    '                    <div class="setElementGlassMounth">\n' +
    '                        <input class="setElementCount" type="text" placeholder="请选择所在域" ng-click="toSelectField()" value="{{getElementTradDepartValue}}" readonly>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="countResult">\n' +
    '                    <div class="ydNum">\n' +
    '                        <line id="SettlementmainNX" legend="legend"  data="data"></line>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="marketrbased clearfix">\n' +
    '                    <div class="rft">单位：(万千瓦时)(元/兆瓦时)</div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>月份</th>\n' +
    '                            <th>结算电量</th>\n' +
    '                            <th>结算电价</th>\n' +
    '                            <th>市场化电量</th>\n' +
    '                            <th>市场化电价</th>\n' +
    '                            <th>基础电量</th>\n' +
    '                            <th>基础电价</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="elementList in getElementTradList track by $index" ng-click="getElementToTrandMonth(elementList)">\n' +
    '                            <td>{{elementList.TRADE_MONTH}}</td>\n' +
    '                            <td>{{elementList.TOTAL_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.AVG_CHARGE_PRVICE | number:2}}</td>\n' +
    '                            <td>{{elementList.MARKET_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.MARKET_CHARGE_PRICE | number:2}}</td>\n' +
    '                            <td>{{elementList.BASE_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.BASE_CHARGE_PRICE | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="elementAllList in getElementTradAllList track by $index">\n' +
    '                            <td>合计</td>\n' +
    '                            <td>{{elementAllList.TOTAL_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.AVG_CHARGE_PRVICE | number:2}}</td>\n' +
    '                            <td>{{elementAllList.MARKET_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.RIGHTS_CHARGE_PRICE | number:2}}</td>\n' +
    '                            <td>{{elementAllList.BASE_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.BASE_CHARGE_PRICE | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="新" ng-click="setTlementXj()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="setElementSelectMounth">\n' +
    '                    <button class="setElementleftSelect" ng-click="getPresetTlementYear(nowElementYear)"></button>\n' +
    '                    <span ng-click="chooseNewYear()">{{nowElementYear}}年</span>\n' +
    '                    <button class="setTlementrightSelect" ng-click="getNextsetTlementYear(nowElementYear)" style="display: none"></button>\n' +
    '                    <div class="setElementGlassMounth">\n' +
    '                        <input class="setElementCount" type="text" placeholder="请选择所在域" ng-click="toSelectField()" value="{{getElementTradDepartValue}}" readonly>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="countResult">\n' +
    '                    <div class="ydNum">\n' +
    '                        <line id="SettlementmainXJ" legend="legend"  data="data"></line>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="marketrbased clearfix">\n' +
    '                    <div class="rft">单位：(万千瓦时)(元/兆瓦时)</div>\n' +
    '                </div>\n' +
    '                <div class="graphList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>月份</th>\n' +
    '                            <th>结算电量</th>\n' +
    '                            <th>结算电价</th>\n' +
    '                            <th>市场化电量</th>\n' +
    '                            <th>市场化电价</th>\n' +
    '                            <th>基础电量</th>\n' +
    '                            <th>基础电价</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="elementList in getElementTradList track by $index" ng-click="getElementToTrandMonth(elementList)">\n' +
    '                            <td>{{elementList.TRADE_MONTH}}</td>\n' +
    '                            <td>{{elementList.TOTAL_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.AVG_CHARGE_PRVICE | number:2}}</td>\n' +
    '                            <td>{{elementList.MARKET_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.MARKET_CHARGE_PRICE | number:2}}</td>\n' +
    '                            <td>{{elementList.BASE_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementList.BASE_CHARGE_PRICE | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="elementAllList in getElementTradAllList track by $index">\n' +
    '                            <td>合计</td>\n' +
    '                            <td>{{elementAllList.TOTAL_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.AVG_CHARGE_PRVICE | number:2}}</td>\n' +
    '                            <td>{{elementAllList.MARKET_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.RIGHTS_CHARGE_PRICE | number:2}}</td>\n' +
    '                            <td>{{elementAllList.BASE_CHARGE_VALUE | number:0}}</td>\n' +
    '                            <td>{{elementAllList.BASE_CHARGE_PRICE | number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '\n' +
    '                <div style="height: 110px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('spotTransaction/spotTransaction.tpl.html',
    '<ion-view class="spotTransactionCSS">\n' +
    '    <ion-nav-title>现货交易</ion-nav-title>\n' +
    '    <ion-tabs class="tabs-icon-only tabs-positive tabs-top mortgagetab">\n' +
    '        <ion-tab title="日统计" ng-click="toSpotDay()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="selectMounth">\n' +
    '                    <button class="selectDateBtn" ng-click="openDatePicker()" id="countDayId">{{now | date : "yyyy-MM-dd"}}</button>\n' +
    '                </div>\n' +
    '                <div class="spotmarketList">\n' +
    '                    <div class="spottransatright">单位：(万千瓦时)(元/兆瓦时)</div>\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>\n' +
    '                                <span>域名称</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>申报电量</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>申报电价</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>出清电量</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>出清电价</span>\n' +
    '                            </th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="spotList in spotTradList">\n' +
    '                            <td>{{spotList.CONTRACT_NAME}}</td>\n' +
    '                            <td>{{spotList.APPLY_CHARGE_VALUE |number:0}}</td>\n' +
    '                            <td>{{spotList.APPLY_CHARGE_PRICE |number:2}}</td>\n' +
    '                            <td>{{spotList.CLEARING_CHARGE_VALUE |number:0}}</td>\n' +
    '                            <td>{{spotList.CLEARING_CHARGE_PRICE |number:2}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>合计(全厂)</td>\n' +
    '                            <td>{{APPLY_CHARGE_VALUE_SUM |number:0}}</td>\n' +
    '                            <td>{{APPLY_CHARGE_PRICE_SUM |number:2}}</td>\n' +
    '                            <td>{{CLEARING_CHARGE_VALUE_SUM |number:0}}</td>\n' +
    '                            <td>{{CLEARING_CHARGE_PRICE_SUM |number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="月统计" ng-click="tospotCountMounth()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="selectMounth">\n' +
    '                    <button class="leftSelect" ng-click="getPreMonth(nowMounth)" id="countMouthShowID"></button>\n' +
    '                    {{nowMounth | date : "yyyy-MM"}}\n' +
    '                    <button id="monthSelect" class="monthSelect" ng-click="getNextMonth(nowMounth)" style="display: none"></button>\n' +
    '                </div>\n' +
    '                <div class="spotmarketList">\n' +
    '                    <div class="spottransatright">单位：(万千瓦时)(元/兆瓦时)</div>\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>\n' +
    '                                <span>域名称</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>申报电量</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>申报电价</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>出清电量</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>出清电价</span>\n' +
    '                            </th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="spotList in spotTradList">\n' +
    '                            <td>{{spotList.CONTRACT_NAME}}</td>\n' +
    '                            <td>{{spotList.APPLY_CHARGE_VALUE |number:0}}</td>\n' +
    '                            <td>{{spotList.APPLY_CHARGE_PRICE |number:2}}</td>\n' +
    '                            <td>{{spotList.CLEARING_CHARGE_VALUE |number:0}}</td>\n' +
    '                            <td>{{spotList.CLEARING_CHARGE_PRICE |number:2}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>合计(全厂)</td>\n' +
    '                            <td>{{APPLY_CHARGE_VALUE_SUM |number:0}}</td>\n' +
    '                            <td>{{APPLY_CHARGE_PRICE_SUM |number:2}}</td>\n' +
    '                            <td>{{CLEARING_CHARGE_VALUE_SUM |number:0}}</td>\n' +
    '                            <td>{{CLEARING_CHARGE_PRICE_SUM |number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="年统计" ng-click="tospotCountYear()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="selectMounth">\n' +
    '                    <button class="leftSelect" ng-click="getPreYear(nowYear)" id="countYearShowID"></button>\n' +
    '                    {{nowYear}}年\n' +
    '                    <button id="yearSelect" class="yearSelect" ng-click="getNextYear(nowYear)" style="display: none"></button>\n' +
    '                </div>\n' +
    '                <div class="spotmarketList">\n' +
    '                    <div class="spottransatright">单位：(万千瓦时)(元/兆瓦时)</div>\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>\n' +
    '                                <span>域名称</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>申报电量</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>申报电价</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>出清电量</span>\n' +
    '                            </th>\n' +
    '                            <th>\n' +
    '                                <span>出清电价</span>\n' +
    '                            </th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="spotList in spotTradList">\n' +
    '                            <td>{{spotList.CONTRACT_NAME}}</td>\n' +
    '                            <td>{{spotList.APPLY_CHARGE_VALUE |number:0}}</td>\n' +
    '                            <td>{{spotList.APPLY_CHARGE_PRICE |number:2}}</td>\n' +
    '                            <td>{{spotList.CLEARING_CHARGE_VALUE |number:0}}</td>\n' +
    '                            <td>{{spotList.CLEARING_CHARGE_PRICE |number:2}}</td>\n' +
    '                        </tr>\n' +
    '                        <tr>\n' +
    '                            <td>合计(全厂)</td>\n' +
    '                            <td>{{APPLY_CHARGE_VALUE_SUM |number:0}}</td>\n' +
    '                            <td>{{APPLY_CHARGE_PRICE_SUM |number:2}}</td>\n' +
    '                            <td>{{CLEARING_CHARGE_VALUE_SUM |number:0}}</td>\n' +
    '                            <td>{{CLEARING_CHARGE_PRICE_SUM |number:2}}</td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('taskManage/taskManage.tpl.html',
    '<ion-view class="taskManageCSS">\n' +
    '    <ion-nav-title>\n' +
    '        <div class="taskTitle">\n' +
    '            <span ng-style="spanUsually" ng-click="toUsually()">日常</span>\n' +
    '            <span ng-style="spanSpecial" ng-click="toSpecial()">专项</span>\n' +
    '        </div>\n' +
    '    </ion-nav-title>\n' +
    '    <ion-tabs class="tabs-icon-only tabs-positive tabs-top mortgagetab" ng-hide="rcrwHide">\n' +
    '        <ion-tab title="全部" ng-click="toAllData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="allTask">\n' +
    '                    <ul>\n' +
    '                        <li ng-repeat="daily in DailyList[0]">\n' +
    '                            <h3>{{daily.ITEM_NAME}}<em>{{daily.STATE}}</em></h3>\n' +
    '                            <span>负责部门：{{daily.RESPONSER_DEPT}}</span>\n' +
    '                            <span>监督部门：{{daily.SUPERVISER_DEPT}}</span>\n' +
    '                            <span>安排时间：{{daily.CREATE_TIME}}</span>\n' +
    '                            <span>计划完成时间：{{daily.PLAN_FINISH_TIME}}</span>\n' +
    '                            <span>实际完成时间：{{daily.REAL_FINISH_TIME}}</span>\n' +
    '                            <span>备注：{{daily.REMARK}}</span>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <ion-infinite-scroll ng-if="hasDaily[0]" on-infinite="getDailyData(0);" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="处理中" ng-click="toClzData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="allTask">\n' +
    '                    <ul>\n' +
    '                        <li ng-repeat="daily in DailyList[1]">\n' +
    '                            <h3>{{daily.ITEM_NAME}}<em>{{daily.STATE}}</em></h3>\n' +
    '                            <span>负责部门：{{daily.RESPONSER_DEPT}}</span>\n' +
    '                            <span>监督部门：{{daily.SUPERVISER_DEPT}}</span>\n' +
    '                            <span>安排时间：{{daily.ITEM_NAME}}</span>\n' +
    '                            <span>计划完成时间：{{daily.PLAN_FINISH_TIME}}</span>\n' +
    '                            <span>实际完成时间：{{daily.REAL_FINISH_TIME}}</span>\n' +
    '                            <span>备注：{{daily.det}}</span>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <ion-infinite-scroll ng-if="hasDaily[1]" on-infinite="getDailyData(1);" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="已完成" ng-click="toYwcData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="allTask">\n' +
    '                    <ul>\n' +
    '                        <li ng-repeat="daily in DailyList[2]">\n' +
    '                            <h3>{{daily.ITEM_NAME}}<em>{{daily.STATE}}</em></h3>\n' +
    '                            <span>负责部门：{{daily.RESPONSER_DEPT}}</span>\n' +
    '                            <span>监督部门：{{daily.SUPERVISER_DEPT}}</span>\n' +
    '                            <span>安排时间：{{daily.ITEM_NAME}}</span>\n' +
    '                            <span>计划完成时间：{{daily.PLAN_FINISH_TIME}}</span>\n' +
    '                            <span>实际完成时间：{{daily.REAL_FINISH_TIME}}</span>\n' +
    '                            <span>备注：{{daily.det}}</span>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <ion-infinite-scroll ng-if="hasDaily[2]" on-infinite="getDailyData(2);" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '    <ion-content ng-hide="specialHide">\n' +
    '        <div class="specialData">\n' +
    '            <ul>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" id="_label-0">项目类型：</span>\n' +
    '                        <input type="text" class="rightselect" ng-model="commitStatus" readonly="readonly" placeholder="全部" ng-click="toSelectStatus()">\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <div class="specialList">\n' +
    '            <ul>\n' +
    '                <li ng-repeat="specia in SpeciaList"  ng-click="toTmDetail(specia)">\n' +
    '                    <h3>{{specia.ITEM_NAME}}<em>{{specia.STATE}}</em></h3>\n' +
    '                    <span>负责人：{{specia.ITEM_RESPONSER}}<i>项目监督人：{{specia.ITEM_SUPERVISER}}</i></span>\n' +
    '                    <span>域：{{specia.CONTRACT}}</span>\n' +
    '                    <span>计划开始时间：{{specia.PLAN_START_TIME}}</span>\n' +
    '                    <span>计划完工时间：{{specia.PLAN_FINISH_TIME}}</span>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <ion-infinite-scroll ng-if="hasSpecia" on-infinite="getSpecialData();" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userConfig/userConfig.tpl.html',
    '<ion-view class="userConfigCSS">\n' +
    '    <ion-nav-title>个人资料</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <a href="/userConfig/myDevice">\n' +
    '            <button class="button">我的设备</button>\n' +
    '        </a>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content class="userConfigContent" has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="userInfo clearfix">\n' +
    '            <div class="lft">我的信息</div>\n' +
    '        </div>\n' +
    '        <div class="userItemContent">\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">真实姓名</div>\n' +
    '                <div class="rgt">{{UserInfo.INTERNAL_DISPLAY_NAME?UserInfo.INTERNAL_DISPLAY_NAME:"无"}}</div>\n' +
    '            </div>\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">用户ID</div>\n' +
    '                <div class="rgt">{{UserInfo.PERSON_ID?UserInfo.PERSON_ID:"无"}}</div>\n' +
    '            </div>\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">在职情况</div>\n' +
    '                <div class="rgt">{{UserInfo.EMPLOYEE_STATUS?UserInfo.EMPLOYEE_STATUS:"无"}}</div>\n' +
    '            </div>\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">所属部门</div>\n' +
    '                <div class="rgt">{{UserInfo.ORG_NAME?UserInfo.ORG_NAME:"无"}}</div>\n' +
    '            </div>\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">职位</div>\n' +
    '                <div class="rgt">{{UserInfo.POSITION_TITLE?UserInfo.POSITION_TITLE:"无"}}</div>\n' +
    '            </div>\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">邮箱</div>\n' +
    '                <div class="rgt">{{UserInfo.EMAIL?UserInfo.EMAIL:"无"}}</div>\n' +
    '            </div>\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">手机号</div>\n' +
    '                <div class="rgt">{{UserInfo.MOBILE?UserInfo.MOBILE:"无"}}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!--  <a href="/editingUserInfo">\n' +
    '            <div class="button appSbmtBtn">修改</div>\n' +
    '        </a> -->\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('Agents/AgentsList/AgentsList.tpl.html',
    '<ion-view class="agentsList">\n' +
    ' <ion-nav-title>待办列表</ion-nav-title>\n' +
    '  <ion-nav-buttons side="right">\n' +
    '      <button class=" button   icon  ion-navicon" ng-click="historySearch()">\n' +
    '     \n' +
    '      </button>\n' +
    '    </ion-nav-buttons>\n' +
    ' <ion-content>\n' +
    '  <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()"></ion-refresher>\n' +
    '   <div class="agentList">\n' +
    '     <div>标题</div>\n' +
    '     <div class="handleTime">最新处理时间</div>\n' +
    '   </div>\n' +
    '   <div class="agentsDetail" ng-repeat="item in items" ng-click="agentsItem(item)" >\n' +
    '     <div class="agentsTitle">\n' +
    '     <span class="bagDian"></span>\n' +
    '     {{item.TITLE}}\n' +
    '     </div>\n' +
    '     <div  class="agentsData">{{item.CREATED_DATE | date : "MM月dd日HH时mm分"}}\n' +
    '      <span class="bagImg"></span>\n' +
    '     </div>\n' +
    '   </div>\n' +
    '      <ion-infinite-scroll ng-if="hasMore" on-infinite="loadMore()" distance="1%"\n' +
    '       immediate-check="false">\n' +
    '      </ion-infinite-scroll>\n' +
    ' </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/attenceWdDetail/attenceWdDetail.tpl.html',
    '<ion-view class="attenceDetailCSS">\n' +
    '    <ion-nav-title>未打卡详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="selectMounth">\n' +
    '            <button id="wdkDetailtimeID" class="selectDateBtn" ng-click="openDatePicker()">{{now | date : "yyyy-MM-dd"}}</button>\n' +
    '            <!--<i class="leftSelect" ng-click="getPreMonth(now)"></i> {{now | date : "yyyy年MM月"}}<i class="rightSelect" ng-click="getNextMonth(now)"></i>-->\n' +
    '            <div class="selectGlass">\n' +
    '                <input type="text" id="unClockGalssId" placeholder="请选择部门" ng-click="selectGlass()" readonly>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!--<div class="tips">\n' +
    '            <span>提示：点击下面栏目可查看未打卡事由</span>\n' +
    '        </div>-->\n' +
    '        <div class="attencelist">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>员工</th>\n' +
    '                    <th>备注</th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="count in unClockList">\n' +
    '                    <td>{{count.PERSON_NAME}}</td>\n' +
    '                    <td>{{count.REMARKS}}</td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/attenceZtDetail/attenceZtDetail.tpl.html',
    '<ion-view class="attenceDetailCSS">\n' +
    '    <ion-nav-title>早退详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="selectMounth">\n' +
    '            <button class="selectDateBtn" ng-click="openDatePicker()" id="attenceCdTimeid">{{now | date : "yyyy-MM-dd"}}</button>\n' +
    '            <!--<i class="leftSelect" ng-click="getPreMonth(now)"></i> {{now | date : "yyyy年MM月"}}<i class="rightSelect" ng-click="getNextMonth(now)"></i>-->\n' +
    '            <div class="selectGlass">\n' +
    '                <input type="text" id="attenceCdGlassid" placeholder="请选择部门" ng-click="selectGlass()" readonly>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!--<div class="tips">\n' +
    '            <span>提示：点击上面栏目可查看迟到事由</span>\n' +
    '        </div>-->\n' +
    '        <div class="attencelist">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>员工/部门</th>\n' +
    '                    <th>打卡时间</th>\n' +
    '                    <th>备注</th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="count in cdztList">\n' +
    '                    <td ng-if="count.CHECK_OUT_STATE==\'早退\'&&count.CONFIRM_DATE==null">{{count.PERSON_NAME}}</td>\n' +
    '                    <td ng-if="count.CHECK_OUT_STATE==\'早退\'&&count.CONFIRM_DATE==null">\n' +
    '                        <span class="abnormalAttence">{{count.ACTUAL_START_TIME}}-{{count.ACTUAL_END_TIME}}</span>\n' +
    '                    </td>\n' +
    '                    <td class="abnormalAttence" ng-if="count.CHECK_OUT_STATE==\'早退\'&&count.CONFIRM_DATE==null" ng-bind-html="count.REMARKS"></td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/attenZcDetail/attenZcDetail.tpl.html',
    '<ion-view class="attenceDetailCSS">\n' +
    '    <ion-nav-title>正常详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="selectMounth">\n' +
    '            <button class="selectDateBtn" ng-click="openDatePicker()" id="attenceCdTimeid">{{now | date : "yyyy-MM-dd"}}</button>\n' +
    '            <!--<i class="leftSelect" ng-click="getPreMonth(now)"></i> {{now | date : "yyyy年MM月"}}<i class="rightSelect" ng-click="getNextMonth(now)"></i>-->\n' +
    '            <div class="selectGlass">\n' +
    '                <input type="text" id="attenceCdGlassid" placeholder="请选择部门" ng-click="selectGlass()" readonly>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!--<div class="tips">\n' +
    '            <span>提示：点击上面栏目可查看迟到事由</span>\n' +
    '        </div>-->\n' +
    '        <div class="attencelist">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>员工/部门</th>\n' +
    '                    <th>打卡时间</th>\n' +
    '                    <th>备注</th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="count in cdztList">\n' +
    '                    <td>{{count.PERSON_NAME}}</td>\n' +
    '                    <td class="abnormalgreen">\n' +
    '                        {{count.ACTUAL_START_TIME}}-{{count.ACTUAL_END_TIME}}\n' +
    '                    </td>\n' +
    '                    <td class="abnormalgreen" ng-bind-html="count.REMARKS"></td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/countAttence/countAttence.tpl.html',
    '<ion-view class="countAttenceCSS">\n' +
    '    <ion-nav-title>考勤统计</ion-nav-title>\n' +
    '\n' +
    '    <ion-tabs class="tabs-icon-only tabs-positive tabs-top mortgagetab">\n' +
    '        <ion-tab title="日统计" ng-click="toCountDay()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="selectMounth">\n' +
    '                    <button class="selectDateBtn" ng-click="openDatePicker()" id="countDayId">{{now | date : "yyyy-MM-dd"}}</button>\n' +
    '                    <!-- <i class="leftSelect" ng-click="getPreMonth(now)"></i> {{now | date : "yyyy-MM-dd"}}<i class="rightSelect" ng-click="getNextMonth(now)"></i>-->\n' +
    '\n' +
    '                    <div class="selectGlass">\n' +
    '                        <input type="text" placeholder="请选择部门" id="countgalssId" ng-click="selectGlass()" readonly>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="countResult">\n' +
    '                    <div class="ydNum">\n' +
    '                        <pie id="main" legend="legend"  data="data"></pie>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="countNum">\n' +
    '                    <ul>\n' +
    '                        <li class="col col-25" ng-click="towdDetail(countDayList.unclockPerson)">\n' +
    '                            <span>{{countDayList.unclockPerson}}人</span>\n' +
    '                            <span>未打卡</span>\n' +
    '                            <!--<i class="cdIcon"></i>3--></li>\n' +
    '                        <li class="col col-25" ng-click="tocdDetail(countDayList.latePerson)">\n' +
    '                            <span>{{countDayList.latePerson}}次</span>\n' +
    '                            <span>迟到</span>\n' +
    '                            <!--<i class="wdIcon"></i>1--></li>\n' +
    '                        <li class="col col-25" ng-click="toZtDetail(countDayList.earlyPerson)">\n' +
    '                            <span>{{countDayList.earlyPerson}}次</span>\n' +
    '                            <span>早退</span>\n' +
    '                            <!--<i class="wdIcon"></i>1--></li>\n' +
    '                        <li class="col col-25" ng-click="tozcDetail(countDayList.normalClockPerson)">\n' +
    '                            <span>{{countDayList.normalClockPerson}}次</span>\n' +
    '                            <span>正常</span>\n' +
    '                            <!--<i class="cdIcon"></i>3--></li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <div class="tips">\n' +
    '                    <span>提示：点击上面栏目可查看考勤统计详情</span>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="月统计" ng-click="toCountMounth()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="selectMounth">\n' +
    '                    <!--<button class="selectDateBtn" ng-click="openDatePicker()">{{now | date : "yyyy-MM"}}</button>-->\n' +
    '                    <button class="leftSelect" ng-click="getPreMonth(nowMounth)" id="countMouthShowID"></button>\n' +
    '                    {{nowMounth | date : "yyyy-MM"}}\n' +
    '                    <button class="rightSelect" ng-click="getNextMonth(nowMounth)" disabled></button>\n' +
    '                    <div class="selectGlassMounth">\n' +
    '                        <input type="text" id="glassMounthId" placeholder="请选择部门" ng-click="toSelectGlass()" value="{{deptName}}" readonly>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="content">\n' +
    '                    <ul class="list" >\n' +
    '                        <li class="item item-icon-right" ng-click="toeveryDetail(everyperson)" ng-repeat="everyperson in personList">\n' +
    '                            <div class="personShow">\n' +
    '                                <div class="name">{{everyperson.personName}}</div>\n' +
    '                                <div class="glassname">\n' +
    '                                    <span class="personcd">未打卡:{{everyperson.unClockNum}}天</span>\n' +
    '                                    <span class="personcd">迟到:{{everyperson.beLate}}天</span>\n' +
    '                                    <span class="personcd">早退:{{everyperson.leaveEarly}}天</span>\n' +
    '                                    <span class="personcd">正常:{{everyperson.regular}}天</span>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                    <div class="bottom"></div>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/fillCause/fillCause.tpl.html',
    '<ion-view class="fillCauseCSS">\n' +
    '    <ion-nav-title>缺勤事由</ion-nav-title>\n' +
    '    <ion-tabs class="tabs-icon-only tabs-positive tabs-top mortgagetab">\n' +
    '        <ion-tab title="迟到/早退" on-select="changeTabType(\'lateAndEarly\');">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="selectMounth">\n' +
    '                    <button class="selectDateBtn" ng-click="openDatePicker()">{{now | date : "yyyy-MM-dd"}}</button>\n' +
    '                </div>\n' +
    '                <div class="tips">\n' +
    '                    <span>提示：点击下面栏目可进行事由确认</span>\n' +
    '                </div>\n' +
    '                <div class="chidaoList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>员工</th>\n' +
    '                            <th>打卡时间</th>\n' +
    '                            <th>备注</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-click="tofillCause(lateAndEarlyList, $index)" ng-repeat="lateAndEarly in lateAndEarlyList track by $index">\n' +
    '                            <td>{{lateAndEarly.PERSON_NAME}}</td>\n' +
    '                            <!--<td>-->\n' +
    '                                <!--<ion-span class="{{lateAndEarly.CHECK_IN_STATE != \'正常\' ? \'abnormalAttence\' : \'\'}}">{{lateAndEarly.ACTUAL_START_TIME}}</ion-span>-->\n' +
    '                                <!-- - -->\n' +
    '                                <!--<ion-span class="{{lateAndEarly.CHECK_OUT_STATE != \'正常\' ? \'abnormalAttence\' : \'\'}}">{{lateAndEarly.ACTUAL_END_TIME}}</ion-span>-->\n' +
    '                            <!--</td>-->\n' +
    '                            <td>\n' +
    '                                <ion-span class="{{lateAndEarly.CONFIRM_DATE.length>0 ? \'abnormalgreen\' : \'abnormalAttence\'}}">{{lateAndEarly.ACTUAL_START_TIME}}</ion-span>\n' +
    '                                -\n' +
    '                                <ion-span class="{{lateAndEarly.CONFIRM_DATE.length>0 ? \'abnormalgreen\' : \'abnormalAttence\'}}">{{lateAndEarly.ACTUAL_END_TIME}}</ion-span>\n' +
    '                            </td>\n' +
    '                            <td >\n' +
    '                                <i class="{{lateAndEarly.CONFIRM_DATE.length>0 ? \'abnormalgreen\' : \'abnormalAttence\'}}">{{lateAndEarly.CHECK_IN_INFO}}</br>{{lateAndEarly.NOTE}}</i>\n' +
    '                                <!--<ion-span class="{{lateAndEarly.CHECK_IN_STATE != \'正常\'||lateAndEarly.CHECK_OUT_STATE != \'正常\' ? \'abnormalAttence\' : \'\'}}">{{lateAndEarly.CHECK_IN_INFO}}</br>{{lateAndEarly.NOTE}}</ion-span>-->\n' +
    '                                <!--<i ng-if="lateAndEarly.CONFIRM_DATE.length>0">{{lateAndEarly.CHECK_IN_INFO}}</br>{{lateAndEarly.NOTE}}</i>-->\n' +
    '\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="未打卡" on-select="changeTabType(\'unClock\');">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="selectMounth">\n' +
    '                    <button class="selectDateBtn" ng-click="openDatePicker()">{{now | date : "yyyy-MM-dd"}}</button>\n' +
    '                </div>\n' +
    '                <div class="chidaoList">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>员工</th>\n' +
    '                            <th>备注</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-click="tofillCause(unClockList, $index)" ng-repeat="unClock in unClockList track by $index">\n' +
    '                            <td>{{unClock.PERSON_NAME}}</td>\n' +
    '                            <td>\n' +
    '                            <!--<ion-span class="abnormalAttence">{{unClock.REMARKS}}</br>事由:{{unClock.NOTE}}</ion-span>-->\n' +
    '                            <ion-span class="{{unClock.CONFIRM_DATE.length>0 ? \'abnormalgreen\' : \'abnormalAttence\'}}">{{unClock.REMARKS}}</br>事由:{{unClock.NOTE}}</ion-span>\n' +
    '\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '    <!--<ion-content has-bouncing="false" scrollbar-y="true">\n' +
    '        <div class="selectMounth">\n' +
    '            <i class="leftSelect" ng-click="getPreMonth(now)"></i> {{now | date : "yyyy年MM月"}}<i class="rightSelect" ng-click="getNextMonth(now)"></i>\n' +
    '            <div class="selectGlass">\n' +
    '                <input type="text" placeholder="请选择人员" id="countPersonId" ng-click="selectPerson()" readonly>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="tips">\n' +
    '            <span>提示：点击下面栏目可查看考勤详情</span>\n' +
    '        </div>\n' +
    '        <div class="myAttencelist">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>日期</th>\n' +
    '                    <th>打卡时间</th>\n' +
    '                    <th>备注</th>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/31 六</td>\n' +
    '                    <td>-</td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/30 五</td>\n' +
    '                    <td></td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/29 四</td>\n' +
    '                    <td></td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/28 三</td>\n' +
    '                    <td>08:45 - 18:56</td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/27 二</td>\n' +
    '                    <td class="abnormalAttence" ng-click="tofillCause()">10:45 - 14:56</td>\n' +
    '                    <td><span>迟到2小时45分</span><span>早退6小时4分</span></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/26 一</td>\n' +
    '                    <td>-</td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/25 日</td>\n' +
    '                    <td></td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/24 六</td>\n' +
    '                    <td></td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/23 五</td>\n' +
    '                    <td>08:45 - 18:56</td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/22 四</td>\n' +
    '                    <td class="abnormalAttence" ng-click="tofillCause($event)">10:45 - 14:56</td>\n' +
    '                    <td><span>迟到2小时45分</span><span>早退6小时4分</span></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/21 六</td>\n' +
    '                    <td>-</td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/20 五</td>\n' +
    '                    <td></td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/19 四</td>\n' +
    '                    <td></td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/18 三</td>\n' +
    '                    <td>08:45 - 18:56</td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/17 二</td>\n' +
    '                    <td class="abnormalAttence" ng-click="tofillCause()">10:45 - 14:56</td>\n' +
    '                    <td><span>迟到2小时45分</span><span>早退6小时4分</span></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/16 一</td>\n' +
    '                    <td>-</td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/15 日</td>\n' +
    '                    <td></td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/14 六</td>\n' +
    '                    <td></td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/13 五</td>\n' +
    '                    <td>08:45 - 18:56</td>\n' +
    '                    <td></td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>3/12 四</td>\n' +
    '                    <td class="abnormalAttence" ng-click="tofillCause($event)">10:45 - 14:56</td>\n' +
    '                    <td><span>迟到2小时45分</span><span>早退6小时4分</span></td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>-->\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/leaveEarlyDetail/leaveEarlyDetail.tpl.html',
    '<ion-view class="attenceDetailCSS">\n' +
    '    <ion-nav-title>早退详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="selectMounth">\n' +
    '            <button class="selectDateBtn" ng-click="openDatePicker()">{{now | date : "yyyy-MM-dd"}}</button>\n' +
    '            <!--<i class="leftSelect" ng-click="getPreMonth(now)"></i> {{now | date : "yyyy年MM月"}}<i class="rightSelect" ng-click="getNextMonth(now)"></i>-->\n' +
    '            <div class="selectGlass">\n' +
    '                <input type="text" id="detailGalssId" placeholder="请选择部门" ng-click="selectGlass()" readonly>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="attencelist">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>员工/部门</th>\n' +
    '                    <th>早退次数</th>\n' +
    '                    <th>早退分钟</th>\n' +
    '                </tr>\n' +
    '                <tr ng-click="toCause()">\n' +
    '                    <td>张云/人资部</td>\n' +
    '                    <td>21/22</td>\n' +
    '                    <td>1</td>\n' +
    '                </tr>\n' +
    '                <tr ng-click="toCause()">\n' +
    '                    <td>张云/人资部</td>\n' +
    '                    <td>20/22</td>\n' +
    '                    <td>2</td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '        <div class="tips">\n' +
    '            <span>提示：点击上面栏目可查看早退事由</span>\n' +
    '        </div>\n' +
    '        <div class="qqCause" ng-hide="qqCause">\n' +
    '            <ul>\n' +
    '                <li>\n' +
    '                    <label>早退事由：</label>\n' +
    '                    <span>去新区开会去新区开会去新区开会去新区开会去新区开会去新区开会去新区开会去新区开会去新区开会去新区开会去新区开会去新区开会去新区开会</span>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/myAttence/myAttence.tpl.html',
    '<ion-view class="myAttenceCSS">\n' +
    '    <ion-nav-title>我的考勤</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="selectMounth">\n' +
    '            <button class="myleftSelect" ng-click="getPreMonth(now)"></button>\n' +
    '            {{now | date : "yyyy年MM月"}}\n' +
    '            <button class="rightSelect" ng-click="getNextMonth(now)"></button>\n' +
    '        </div>\n' +
    '        <div class="tips">\n' +
    '            <span>提示：点击下面备注栏可编辑未打卡事由</span>\n' +
    '        </div>\n' +
    '        <div class="myAttencelist">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>日期</th>\n' +
    '                    <th>打卡时间</th>\n' +
    '                    <th>备注</th>\n' +
    '                </tr>\n' +
    '                <tbody ng-repeat="countvalue in attenceList">\n' +
    '                    <tr ng-repeat="item in countvalue.list track by $index">\n' +
    '                        <td ng-if="$index == 0" rowspan="{{countvalue.list.length}}" class="countdate">\n' +
    '                            {{countvalue.month}}/{{countvalue.date}}\n' +
    '                            <span>{{countvalue.week}}</span>\n' +
    '                        </td>\n' +
    '                        <td ng-click="toPosition(item)"><span class="{{item.checkInState==\'正常\' ? \'abnormalgreen\' : \'abnormalAttence\'}}">{{item.actualStartTime}}</span>- <span class="{{item.checkOutState==\'正常\' ? \'abnormalgreen\' : \'abnormalAttence\'}}">{{item.actualEndTime}}</span></td>\n' +
    '                        <td ng-bind-html="item.remarks" class="{{item.confirmDate.length>0 ? \'abnormalgreen\' : \'abnormalAttence\'}} coustvalueright" ng-click="to_edit(item)"></td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/attenceCdDetail/attenceCdDetail.tpl.html',
    '<ion-view class="attenceDetailCSS">\n' +
    '    <ion-nav-title>迟到详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="selectMounth">\n' +
    '            <button class="selectDateBtn" ng-click="openDatePicker()" id="attenceCdTimeid">{{now | date : "yyyy-MM-dd"}}</button>\n' +
    '            <!--<i class="leftSelect" ng-click="getPreMonth(now)"></i> {{now | date : "yyyy年MM月"}}<i class="rightSelect" ng-click="getNextMonth(now)"></i>-->\n' +
    '            <div class="selectGlass">\n' +
    '                <input type="text" id="attenceCdGlassid" placeholder="请选择部门" ng-click="selectGlass()" readonly>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!--<div class="tips">\n' +
    '            <span>提示：点击上面栏目可查看迟到事由</span>\n' +
    '        </div>-->\n' +
    '        <div class="attencelist">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>员工/部门</th>\n' +
    '                    <th>打卡时间</th>\n' +
    '                    <th>备注</th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="count in cdztList">\n' +
    '                    <td ng-if="count.CHECK_IN_STATE==\'迟到\'&&count.CONFIRM_DATE==null">{{count.PERSON_NAME}}</td>\n' +
    '                    <td ng-if="count.CHECK_IN_STATE==\'迟到\'&&count.CONFIRM_DATE==null">\n' +
    '                       <span class="abnormalAttence">{{count.ACTUAL_START_TIME}}-{{count.ACTUAL_END_TIME}}</span>\n' +
    '                    </td>\n' +
    '                    <td class="abnormalAttence" ng-if="count.CHECK_IN_STATE==\'迟到\'&&count.CONFIRM_DATE==null" ng-bind-html="count.REMARKS"></td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('bulletinBoard/edit/edit.tpl.html',
    '<ion-view class="bulletinBoardCSS">\n' +
    '    <ion-nav-title>公告编辑</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="editForm">\n' +
    '            <ul>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" id="_label-0">排序号：{{detail.SORT }}</span>\n' +
    '                        <!-- <input type="text" id="sortid" placeholder="排序号"> -->\n' +
    '                        <!-- <span class="tips">序号能够改变显示顺序</span> -->\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" id="_label-1">标题：</span>\n' +
    '                        <input type="text" id="news_title_id" placeholder="请输入标题">\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <!--<span class="input-label" id="_label-2">内容：</span>-->\n' +
    '                        <textarea class="ggbbcontent" id="news_content_id" ng-style="textareaHeight"></textarea>\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <div class="button1">\n' +
    '            <button class="goback" ng-click="toBack()">返回</button>\n' +
    '            <button class="toedit" ng-click="toEdit()">修改</button>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('bulletinBoard/view/boardView.tpl.html',
    '<ion-view class="companyNewsDetailsCSS">\n' +
    '    <ion-nav-title>公告</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="title ">{{detail.NEWS_TITLE}}</div>\n' +
    '        <div class="contentText">{{detail.NEWS_CONTENT}}</div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('erp/details/details.tpl.html',
    '<ion-view class="erpDetailsCSS erpCSS">\n' +
    '    <ion-nav-title>{{title}}-{{types[typeIndex]}}</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button erpDetailsCSS" ng-click="selectType();">\n' +
    '            <i ng-repeat="item in types track by $index" class="icon ion-record {{typeIndex == $index ? \'energized\' : \'\'}}"></i>\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content class="content" scroll="false" has-header="true">\n' +
    '        <ion-slide-box on-slide-changed="slideHasChanged($index)">\n' +
    '            <ion-slide>\n' +
    '                <!-- 申请单 -->\n' +
    '                <ion-content class="content" has-header="false">\n' +
    '                    <div class="slide-content" ng-include="\'erp/details/tabs/single.tpl.html\'"></div>\n' +
    '                </ion-content>\n' +
    '                <ion-footer-bar ng-if="showType == \'approve\'">\n' +
    '                    <span class="balanced" ng-click="toSelectUser();">同意</span>\n' +
    '                    <span class="assertive" ng-click="toRefused();">拒绝</span>\n' +
    '                </ion-footer-bar>\n' +
    '            </ion-slide>\n' +
    '            <ion-slide ng-if="ChildTable.length > 0">\n' +
    '                <!-- 申请详情 -->\n' +
    '                <ion-content class="content" has-header="false">\n' +
    '                    <div class="slide-content" ng-include="\'erp/details/tabs/line.tpl.html\'"></div>\n' +
    '                </ion-content>\n' +
    '            </ion-slide>\n' +
    '            <ion-slide ng-if="docList.length > 0">\n' +
    '                <!-- 文档 -->\n' +
    '                <ion-content class="content" has-header="false">\n' +
    '                    <div class="slide-content" ng-include="\'erp/details/tabs/document.tpl.html\'"></div>\n' +
    '                </ion-content>\n' +
    '            </ion-slide>\n' +
    '            <ion-slide>\n' +
    '                <!-- 审批流程 -->\n' +
    '                <ion-content class="content" has-header="false">\n' +
    '                    <div class="slide-content" ng-include="\'erp/details/tabs/process.tpl.html\'"></div>\n' +
    '                </ion-content>\n' +
    '            </ion-slide>\n' +
    '        </ion-slide-box>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('erp/my/my.tpl.html',
    '<ion-view class="erpMyCSS erpCSS">\n' +
    '    <ion-nav-title>{{titles[index]}}</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button" ng-click="slideToggle();">\n' +
    '            <i class="icon ion-loop"></i>\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content class="padding" has-header="true">\n' +
    '        <div class="query">\n' +
    '            <ul>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" aria-label="业务类型：" id="_label-0">业务类型：</span>\n' +
    '                        <input ng-model="queryData.type" type="text" class="rightselect" readonly="readonly" placeholder="业务类型" ng-click="toSelectType()">\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" aria-label="关键字：" id="_label-1">关键字：</span>\n' +
    '                        <input ng-model="queryData.record_key" type="text" placeholder="关键字">\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" aria-label="提交时间：" id="_label-2">提交时间：</span>\n' +
    '                        <input ng-model="queryData.record_time" type="text" class="rightselect" readonly="readonly" placeholder="提交时间" ng-click="toSelectTime()">\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <button class="inquiryBtn" ng-click="select();">查询</button>\n' +
    '        </div>\n' +
    '        <div class="dataList">\n' +
    '            <div ng-repeat="item in list track by $index" class="card" ng-click="toDetailsPage(item);">\n' +
    '                <div>{{item.LU_DESCRIPTION}}</div>\n' +
    '                <div ng-bind-html="item.MSG_INFO"></div>\n' +
    '            </div>\n' +
    '            <ion-infinite-scroll ng-if="hasMore" on-infinite="toInquiry(false);" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('facilityInfo/facilityInfoScan/facilityInfoScan.tpl.html',
    '<ion-view class="facilityInfoCSS">\n' +
    '    <ion-nav-title>设备台账</ion-nav-title>\n' +
    '    <ion-tabs class="tabs-icon-only tabs-positive tabs-top mortgagetab">\n' +
    '        <ion-tab title="设备信息" ng-click="goObtain()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="loadList">\n' +
    '                    <div class="facilityList">\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            设备编码 : <span style="margin-left:10px"></span> {{equipmentDetail.MCH_CODE}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            所在域 : <span style="margin-left:10px"></span>{{equipmentDetail.CONTRACT_NAME}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            设备名称 : <span style="margin-left:10px"></span>{{equipmentDetail.MCH_NAME}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            巡检信息 : <span style="margin-left:10px"></span>{{equipmentDetail.EQUIPMENT_CHECK_INFO}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            工序状态&nbsp;:&nbsp;<span style="margin-left:10px"></span>{{equipmentDetail.OPERATIONAL_STATUS}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            规格型号&nbsp;:&nbsp;<span style="margin-left:10px"></span>{{equipmentDetail.TYPE}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            序列号&nbsp;:&nbsp;<span style="margin-left:10px"></span>{{equipmentDetail.SERIAL_NO}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            制造商名称&nbsp;:&nbsp;<span style="margin-left:10px"></span>{{equipmentDetail.MANUFACTURER_NAME}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            维护信息&nbsp;:&nbsp;<span style="margin-left:10px"></span>{{equipmentDetail.EQUIPMENT_INFOR}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            设备概况&nbsp;:&nbsp;<span style="margin-left:10px"></span>{{equipmentDetail.EQUIPMENT_GENERAL}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            常见问题及处理方法&nbsp;:&nbsp;<span style="margin-left:10px"></span>{{equipmentDetail.PROCESS_MODE}}\n' +
    '                        </div>\n' +
    '                        <div class="scanQRcodeNumber">\n' +
    '                            危险因素及预防&nbsp;:&nbsp;<span style="margin-left:10px"></span>{{equipmentDetail.RISK_FACTORSS_PREVEN}}\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="缺陷履历" ng-click="goDefect()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="loadList">\n' +
    '                    <div class="facilityList">\n' +
    '                        <div class="list" ng-repeat="DefectList in equipmentDefectList">\n' +
    '                            <a class="item" href="#" ng-click="toDefectDetail(DefectList)">\n' +
    '                                <div class="titleDes">设备编码 : {{DefectList.FACT_MCH_CODE}}</div>\n' +
    '                                <div class="titleDes">设备名称 : {{DefectList.FACT_MCH_NAME}}</div>\n' +
    '                                <div class="titleDes">缺陷编号 : {{DefectList.FAULT_REP_ID}}</div>\n' +
    '                                <div class="titleDes">缺陷描述 : {{DefectList.ERR_DESCR_LO}}</div>\n' +
    '                                <div class="titleDes">缺陷状态 : {{DefectList.FAULT_STATE}}</div>\n' +
    '                                <div class="titleDes">缺陷日期 : {{DefectList.REG_DATE}}</div>\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="clearboth"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="工单履历" ng-click="goWork()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="loadList">\n' +
    '                    <div class="facilityList">\n' +
    '                        <div class="list" ng-repeat="WorkList in equipmentWorkList">\n' +
    '                            <a class="item" href="#" ng-click="">\n' +
    '                                <div class="titleDes">设备编码 : {{WorkList.FACT_MCH_CODE}}</div>\n' +
    '                                <div class="titleDes">设备名称 : {{WorkList.FACT_MCH_NAME}}</div>\n' +
    '                                <div class="titleDes">工单编号 : {{WorkList.WO_NO}}</div>\n' +
    '                                <div class="titleDes">工单类型 : {{WorkList.WORK_ORDER_TYPE}}</div>\n' +
    '                                <div class="titleDes">工单内容 : {{WorkList.ERR_DESCR}}</div>\n' +
    '                                <div class="titleDes">工作状态 : {{WorkList.WO_STATE}}</div>\n' +
    '                                <div class="titleDes">工作负责人姓名 : {{WorkList.WORK_MASTER_NAME}}</div>\n' +
    '                                <div class="titleDes">工作票签发人姓名 : {{WorkList.WORK_LEADER_NAME}}</div>\n' +
    '                                <div class="titleDes">工作详情 : {{WorkList.PERFORMED_ACTION_LO}}</div>\n' +
    '                                <div class="titleDes">工作类型 : {{WorkList.WORK_TYPE}}</div>\n' +
    '                                <div class="titleDes">计划结束时间 : {{WorkList.PLAN_F_DATE}}</div>\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="clearboth"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="巡查记录" ng-click="goInspection()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="loadList">\n' +
    '                    <div class="facilityList">\n' +
    '                        <div class="list">\n' +
    '                            <div class="card" ng-repeat="PatrolList in equipmentPatrolList" ng-click="goInspectionRecord(PatrolList)">\n' +
    '                                <span>{{PatrolList.PERSON_NAME}}</span>\n' +
    '                                <span >{{PatrolList.PLAN_INSPECTED}}/{{PatrolList.PLAN_INSPECT}}/{{PatrolList.OUT_PLAN_INSPECTED}}</span>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="clearboth"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '    </ion-tabs>\n' +
    '\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('facilityInfo/InspectionRecord/InspectionRecord.tpl.html',
    '<ion-view class="InspectionRecordCSS">\n' +
    '    <ion-nav-title>巡查记录</ion-nav-title>\n' +
    '    <ion-content class="padding" has-header="true">\n' +
    '        <div class="content">\n' +
    '            <ul class="list">\n' +
    '                <li class="item item-icon-right"  ng-repeat="RecordList in InspectiomRecordList" ng-click="goInspectionDetail(RecordList)">\n' +
    '                    {{RecordList.DESCRIPTION}}\n' +
    '                    <span class="item-note ng-binding">{{RecordList.PLAN_INSPECTED}}/{{RecordList.PLAN_INSPECT}}/{{RecordList.OUT_PLAN_INSPECTED}}</span>\n' +
    '                    <i class="icon ion-chevron-right"></i>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n' +
    '<!--\n' +
    '@author: tigerITman\n' +
    '@contact: 2811744265@qq.com\n' +
    '@software: webstorm\n' +
    '@file: InspectionRecord.tpl.html\n' +
    '@time: 2018-05-17 10:19\n' +
    '@desc:\n' +
    '-->\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('facilityInfo/InspectionRecordDetail/InspectionRecordDetail.tpl.html',
    '<ion-view class="OSIHistoryDetailCSS">\n' +
    '    <ion-nav-title>巡查记录</ion-nav-title>\n' +
    '    <ion-content class="padding" has-header="true">\n' +
    '        <div class="OSIDetail">\n' +
    '            <div class="OSIList">\n' +
    '                <ul class="list">\n' +
    '                    <li class="item item-icon-right" ng-repeat="DetailList in InspectiomRecordDetailList">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i ng-style="identify" ng-if="DetailList.RECORD_TIME!=\'\' && DetailList.RECORD_TIME!=null"  style="background: #83ecad">签到</i>\n' +
    '                            <i ng-style="identify" ng-if="DetailList.RECORD_TIME==\'\' || DetailList.RECORD_TIME==null" style="background: #ccc">未签到</i>\n' +
    '                            <span class="name">{{DetailList.MCH_NAME}}</span>\n' +
    '                            <span class="name">{{DetailList.LOCATION}}</span>\n' +
    '                            <span class="glassname">{{DetailList.RECORD_TIME}}</span>\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n' +
    '<!--\n' +
    '@author: tigerITman\n' +
    '@contact: 2811744265@qq.com\n' +
    '@software: webstorm\n' +
    '@file: InspectionRecordDetail.tpl.html\n' +
    '@time: 2018-05-17 10:20\n' +
    '@desc:\n' +
    '-->\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('KPI/KPIdetail/KPIdetail.tpl.html',
    '<ion-view class="KPIdetailCSS">\n' +
    '    <ion-nav-title>{{title}}</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()"></ion-refresher>\n' +
    '        <div class="btnView">\n' +
    '            <div ng-repeat="val in data">\n' +
    '                <div class="btnCss"   ng-click="seleteItem(val)">\n' +
    '                    {{val==\'0#\'?\'全厂\':val}}\n' +
    '                    <!-- <div  class="decLine"></div> -->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div id="main" style="width: 8rem;height:6rem;"></div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('load/historyInfo/historyInfo.tpl.html',
    '<ion-view class="historyInfoCSS">\n' +
    '    <ion-nav-title>历史日负荷({{name}})</ion-nav-title>\n' +
    '    <ion-content>\n' +
    '        <div class="historyList">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>日期</th>\n' +
    '                    <th>实时负荷(MW)</th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="power in hList track by $index">\n' +
    '                    <td>{{power.OCCUR_TIME}}</td>\n' +
    '                    <td>{{((power[type+\'_POWER\'] - 0) < 0 ? 0 : ((power[type+\'_POWER\'] - 0) > 999) ? 999 :power[type+\'_POWER\'])|number:2}}</td>\n' +
    '                </tr>\n' +
    '\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('load/nearlyHour/nearlyHour.tpl.html',
    '<ion-view class="nearlyHourCSS">\n' +
    '    <ion-nav-title>最近一小时数据({{name}})</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="nearHourList">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>时间</th>\n' +
    '                    <th>实时负荷(MW)</th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="power in hList track by $index">\n' +
    '                    <td>{{power.OCCUR_TIME}}</td>\n' +
    '                    <td>{{((power[type+\'_POWER\'] - 0) < 0 ? 0 : ((power[type+\'_POWER\'] - 0) > 999) ? 999 :power[type+\'_POWER\'])|number:2}}</td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OffLine/OffLineDetail/OffLineDetail.tpl.html',
    '<ion-view class="OSILineCSS" >\n' +
    '    <ion-nav-title>巡查路线</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="OSIDetail" ng-hide="OSIDetailHide">\n' +
    '            <div class="OSITitle">\n' +
    '                <div class="osiLeft">\n' +
    '                    <span>{{description}}({{inspectType}})</span>\n' +
    '                    <span class="osiTime">{{startTime | limitTo:10}} ~  {{endTime | limitTo:10}}</span>\n' +
    '                </div>\n' +
    '                <!--<div class="osiRight">\n' +
    '                    <button ng-click="searchsBlueTooth()">搜索蓝牙</button>\n' +
    '                </div>-->\n' +
    '            </div>\n' +
    '            <div class="scanQRcode" ng-hide="inputHide">\n' +
    '                <input type="text" placeholder="请扫描设备二维码" class="scanCode"\n' +
    '                       ng-click="toScanCode()" readonly>\n' +
    '            </div>\n' +
    '            <div class="OSIList">\n' +
    '                <ul class="list">\n' +
    '                    <li class="item item-icon-right" ng-repeat="h in hDetail track by $index">\n' +
    '                        <div class="leftShow">\n' +
    '                            <!--<i ng-style="identify" id="qdIconColorid{{$index}}">{{identifyShow}}</i>-->\n' +
    '                            <i ng-style="identify" ng-if="h.RECORD_TIME!=\'\' && h.RECORD_TIME!=null"  style="background: #83ecad">签到</i>\n' +
    '                            <i ng-style="identify" ng-if="h.RECORD_TIME==\'\' || h.RECORD_TIME==null" style="background: #ccc" id="qdIconColorid{{$index}}">未签到</i>\n' +
    '                            <span class="name">{{h.ADDRESS}}</span>\n' +
    '                            <span class="name">{{h.MCH_NAME}}</span>\n' +
    '                            <span class="glassname" id="recordTimeid{{$index}}">{{h.RECORD_TIME}}</span>\n' +
    '                            <span class="glassname" id="newRecordTimeid{{$index}}"\n' +
    '                                  style="display: none">{{recordTime}}</span>\n' +
    '                            <button id="recordID" class="itemQdBtn{{$index}}" style="display: none"\n' +
    '                                    ng-click="toSigned(h,$index)" ng-hide="itemQdBtnHide">签到\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="position" ng-hide="positionHide">\n' +
    '            <i class="position_icon"></i>位置：{{patrolHomeData.ADDRESS}}\n' +
    '            <span style="display: block;">\n' +
    '                设备名称：{{patrolHomeData.MCH_NAME}}\n' +
    '            </span>\n' +
    '            <button class="qdBtn" ng-click="patrolSign()">签到</button>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OffLine/OffLineLook/OffLineLook.tpl.html',
    '<ion-view class="OSILineLookCSS" >\n' +
    '    <ion-nav-title>我的巡查记录</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="OSIDetail">\n' +
    '            <div class="OSIList">\n' +
    '                <ion-list class="list">\n' +
    '                    <ion-item ng-repeat="detailList in hDetail track by $index" item="item" class="item-remove-animate" ng-click="toOsiLine(detailList)">\n' +
    '                        <!--<i ng-style="identify" ng-if="detailList.RECORD_TIME!=\'\' && detailList.RECORD_TIME!=null"  style="background: #83ecad">已上传</i>-->\n' +
    '                        <!--<i ng-style="identify" ng-if="detailList.RECORD_TIME==\'\' || detailList.RECORD_TIME==null" style="background: #ccc">未上传</i>-->\n' +
    '                        <i ng-style="identify" style="background: #ccc">未上传</i>\n' +
    '                        <span class="name" style="font-size: 12px">{{detailList.LOCATION_DESCRIPTION}}</span></br>\n' +
    '                        <span class="name" style="font-size: 12px">{{detailList.MCH_NAME}}</span></br>\n' +
    '                        <span class="name" style="font-size: 12px">{{detailList.RECORD_TIME}}</span></br>\n' +
    '                        <span class="name" style="font-size: 12px">{{detailList.DESCRIPTION}}</span>\n' +
    '                        <ion-option-button class="button-assertive"\n' +
    '                                           ng-click="dealOffLine(detailList,$index)">\n' +
    '                            点击删除\n' +
    '                        </ion-option-button>\n' +
    '                    </ion-item>\n' +
    '                </ion-list>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="position">\n' +
    '            <button class="qdBtn" ng-click="OffLineUpload()">上传</button>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OSI/OSIArear/OSIArear.tpl.html',
    '<ion-view class="OSIArearCSS">\n' +
    '    <ion-nav-title>巡查区域</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="OSIArear">\n' +
    '            <div class="OSITitle">{{user.PERSON_NAME}}  责任巡查区域(合格区域{{user.qualified}}个   不合格区域{{user.unqualified}}个)</div>\n' +
    '            <div class="OSIList">\n' +
    '                <table>\n' +
    '                    <tr>\n' +
    '                        <th>序号</th>\n' +
    '                        <th>责任区域</th>\n' +
    '                        <th>巡查时间</th>\n' +
    '                    </tr>\n' +
    '                    <tr ng-repeat="item in data.iList track by $index">\n' +
    '                        <td>{{$index + 1}}</td>\n' +
    '                        <td>\n' +
    '                            <span>{{item.AREA}}</span>\n' +
    '                        </td>\n' +
    '                        <td>\n' +
    '                            <div class="timeList">\n' +
    '                                <ul>\n' +
    '                                    <li ng-repeat="time in item.TIME track by $index">{{time.RECORD_TIME}}</li>\n' +
    '                                </ul>\n' +
    '                            </div>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '                <div class="fzrArear" ng-if="data.oList && data.oList.length > 0">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <th>序号</th>\n' +
    '                            <th>非责任区域</th>\n' +
    '                            <th>巡查时间</th>\n' +
    '                        </tr>\n' +
    '                        <tr ng-repeat="item in data.oList track by $index">\n' +
    '                            <td>{{$index + 1}}</td>\n' +
    '                            <td>\n' +
    '                                <span>{{item.AREA}}</span>\n' +
    '                            </td>\n' +
    '                            <td>\n' +
    '                                <div class="timeList">\n' +
    '                                    <ul>\n' +
    '                                        <li ng-repeat="time in item.TIME track by $index">{{time.RECORD_TIME}}</li>\n' +
    '                                    </ul>\n' +
    '                                </div>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </div>\n' +
    '                <!--<ul class="list">\n' +
    '                    <li class="item item-icon-right" ng-click="toOSIArear()">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i class="yqdShow">已签到</i>\n' +
    '                            <span class="name">无签到时间限制</span>\n' +
    '                            <span class="glassname">#1号机组DCS区域</span>\n' +
    '                        </div>\n' +
    '                        &lt;!&ndash;<div class="rightShow">\n' +
    '                            <i class="icon ion-chevron-right"></i>\n' +
    '                        </div>&ndash;&gt;\n' +
    '                    </li>\n' +
    '                    <li class="item item-icon-right" ng-click="toOSIArear()">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i class="yqdShow">已签到</i>\n' +
    '                            <span class="name">无签到时间限制</span>\n' +
    '                            <span class="glassname">#1号机组DCS区域</span>\n' +
    '                        </div>\n' +
    '                        &lt;!&ndash;<div class="rightShow">\n' +
    '                            <i class="icon ion-chevron-right"></i>\n' +
    '                        </div>&ndash;&gt;\n' +
    '                    </li>\n' +
    '                    <li class="item item-icon-right" ng-click="toOSIArear()">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i class="yqdShow">已签到</i>\n' +
    '                            <span class="name">无签到时间限制</span>\n' +
    '                            <span class="glassname">#1号机组DCS区域</span>\n' +
    '                        </div>\n' +
    '                        &lt;!&ndash;<div class="rightShow">\n' +
    '                            <i class="icon ion-chevron-right"></i>\n' +
    '                        </div>&ndash;&gt;\n' +
    '                    </li>\n' +
    '                    <li class="item item-icon-right" ng-click="toOSIArear()">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i class="yqdShow">已签到</i>\n' +
    '                            <span class="name">无签到时间限制</span>\n' +
    '                            <span class="glassname">#1号机组DCS区域</span>\n' +
    '                        </div>\n' +
    '                        &lt;!&ndash;<div class="rightShow">\n' +
    '                            <i class="icon ion-chevron-right"></i>\n' +
    '                        </div>&ndash;&gt;\n' +
    '                    </li>\n' +
    '\n' +
    '                </ul>-->\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '    <!--<ion-footer-bar align-title="left" class="bar-assertive">\n' +
    '        <div class="searchBlooth">\n' +
    '            <button class="searchBloothBtn">搜索蓝牙</button>\n' +
    '        </div>\n' +
    '    </ion-footer-bar>-->\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OSI/OSIcount/OSIcount.tpl.html',
    '<ion-view class="OSIcountCSS">\n' +
    '	<ion-nav-title>巡查统计</ion-nav-title>\n' +
    '	<ion-tabs class="tabs-positive tabs-icon-only tabs-top mortgagetab">\n' +
    '		<ion-tab title="个人" on-select="changeTabType(\'personal\');">\n' +
    '			<ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '				<div class="title">\n' +
    '					<span>\n' +
    '						<button class="leftSelect" ng-click="changeDateTime(\'personalStart\', -1, null, date.personalEnd);"></button>\n' +
    '						{{date.personalStart}}\n' +
    '						<button class="rightSelect" ng-click="changeDateTime(\'personalStart\', 1, null, date.personalEnd);"></button>\n' +
    '					</span>\n' +
    '					<span>\n' +
    '						<button class="leftSelect" ng-click="changeDateTime(\'personalEnd\', -1, date.personalStart, date.now);"></button>\n' +
    '						{{date.personalEnd}}\n' +
    '						<button class="rightSelect" ng-click="changeDateTime(\'personalEnd\', 1, date.personalStart, date.now);"></button>\n' +
    '					</span>\n' +
    '				</div>\n' +
    '				<div class="tips"><span>说明: 当前区间「计划/实际/计划外」巡查次数，「计划/实际」百分比。</span></div>\n' +
    '				<div class="list">\n' +
    '					<div class="card" ng-repeat="item in tabs[\'personal\'].list">\n' +
    '						<span>{{item.PERSON_NAME}}</span>\n' +
    '						<span ng-click="openPersonnelEquipment(item);">{{item.PLAN_INSPECT}}/{{item.PLAN_INSPECTED}}/{{item.OUT_PLAN_INSPECTED}}</span>\n' +
    '						<span ng-click="openRecord(item);">{{item.percentage}}%</span>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '				<ion-infinite-scroll ng-if="tabs[\'personal\'].hasMore" on-infinite="getInspectStatisticalData();" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '			</ion-content>\n' +
    '		</ion-tab>\n' +
    '		<ion-tab title="部门" on-select="changeTabType(\'department\');">\n' +
    '			<ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '				<div class="title">\n' +
    '					<span>\n' +
    '						<button class="leftSelect" ng-click="changeDateTime(\'departmentStart\', -1, null, date.departmentEnd);"></button>\n' +
    '						{{date.departmentStart}}\n' +
    '						<button class="rightSelect" ng-click="changeDateTime(\'departmentStart\', 1, null, date.departmentEnd);"></button>\n' +
    '					</span>\n' +
    '					<span>\n' +
    '						<button class="leftSelect" ng-click="changeDateTime(\'departmentEnd\', -1, date.departmentStart, date.now);"></button>\n' +
    '						{{date.departmentEnd}}\n' +
    '						<button class="rightSelect" ng-click="changeDateTime(\'departmentEnd\', 1, date.departmentStart, date.now);"></button>\n' +
    '					</span>\n' +
    '				</div>\n' +
    '				<div class="tips"><span>说明: 当前区间「计划/实际/计划外」巡查次数，「计划/实际」百分比。</span></div>\n' +
    '				<div class="list">\n' +
    '					<div class="card" ng-repeat="item in tabs[\'department\'].list">\n' +
    '						<span ng-click="openDepartmentPersonnel(item);">{{item.ORG_NAME}}</span>\n' +
    '						<span ng-click="openDepartmentEquipment(item);">{{item.PLAN_INSPECT}}/{{item.PLAN_INSPECTED}}/{{item.OUT_PLAN_INSPECTED}}</span>\n' +
    '						<span>{{item.percentage}}%</span>\n' +
    '					</div>\n' +
    '					<ion-infinite-scroll ng-if="tabs[\'department\'].hasMore" on-infinite="getInspectStatisticalData();" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '				</div>\n' +
    '			</ion-content>\n' +
    '		</ion-tab>\n' +
    '	</ion-tabs>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OSI/OSIHistory/OSIHistory.tpl.html',
    '<ion-view class="OSIHistoryCSS">\n' +
    '    <ion-nav-title>巡查记录</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" on-drag-down="onDragDown()">\n' +
    '        <div class="dragdiv" style="display: none;">下拉查询</div>\n' +
    '        <div class="OSIHistory">\n' +
    '            <div class="selectTime">\n' +
    '                <ul>\n' +
    '                    <li>\n' +
    '                        <label class="item item-input">\n' +
    '                            <span class="input-label" aria-label="开始时间：" id="_label-0">开始时间：</span>\n' +
    '                            <input type="text" class="rightselect" id="StartHistoryID" readonly="" placeholder="请选择开始时间" ng-click="openStartDatePicker()">\n' +
    '                        </label>\n' +
    '                    </li>\n' +
    '                    <li>\n' +
    '                        <label class="item item-input">\n' +
    '                            <span class="input-label" aria-label="结束时间：" id="_label-1">结束时间：</span>\n' +
    '                            <input type="text" class="rightselect" id="endHistoryID" readonly="" placeholder="请选择结束时间" ng-click="openEndDatePicker()">\n' +
    '                        </label>\n' +
    '                    </li>\n' +
    '                    <li>\n' +
    '                        <button class="commitBtn" ng-click="searchDefect()">查询</button>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '            <div ng-if="autoOperation" class="list autoOperation">\n' +
    '                <div class="time">\n' +
    '                    <span>{{data.date.startDate}}</span>\n' +
    '                    <span>{{data.date.endDate}}</span>\n' +
    '                </div>\n' +
    '                <div class="mch">\n' +
    '                        <span ng-if="data.MCH_NAME">{{data.MCH_NAME}}</span>\n' +
    '                    </div>\n' +
    '                <div class="user">\n' +
    '                    <span>{{data.PERSON_NAME}}</span>\n' +
    '                    <span>{{data.ORG_NAME}}</span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="tips"><span>说明: 当前区间「实际/计划」</span></div>\n' +
    '            <div class="content" ng-hide="xclxListHide">\n' +
    '                <ul class="list">\n' +
    '                    <li class="item item-icon-right" ng-click="toHistoryDetail(h)" ng-repeat="h in hList">\n' +
    '                        {{h.DESCRIPTION}}({{h.INSPECT_TYPE}})\n' +
    '                        <span class="item-note ng-binding">{{h.INSPECTED}}/{{h.INSPECT}}</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </li>\n' +
    '                    <!--<li class="item item-icon-right" ng-click="toHistoryDetail()">\n' +
    '                        巡查路线2(周)\n' +
    '                        <span class="item-note ng-binding">2/25</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </li>\n' +
    '                    <li class="item item-icon-right" ng-click="toHistoryDetail()">\n' +
    '                        范围外任务\n' +
    '                        <span class="item-note ng-binding">50</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </li>-->\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('MarketbasedTrad/MarketbasedTradDetail/MarketbasedTradDetail.tpl.html',
    '<ion-view class="MarketbasedTradIndexCSS">\n' +
    '    <ion-nav-title>交易公告详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="marketbasedbg clearfix">\n' +
    '            <div class="lft">{{detailTitle}}</div>\n' +
    '        </div>\n' +
    '        <div class="marketList">\n' +
    '            {{detailCONTENT}}\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('MarketbasedTrad/MarketbasedTradIndex/MarketbasedTradIndex.tpl.html',
    '<ion-view class="MarketbasedTradIndexCSS">\n' +
    '    <ion-nav-title>交易公告</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button-icon icon ion-timedimension" ng-click="toMarketbasedSearch()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="marketbased clearfix" ng-repeat="NoticeList in marketNoticeList" ng-click="goMarketbasedTradDetail(NoticeList)">\n' +
    '            <div class="lft">{{NoticeList.TITLE}}</div>\n' +
    '        </div>\n' +
    '        <div class="bg" ng-click="hideSearch()"></div>\n' +
    '        <div class="MarketbasedShow" style="display: none; width: 95%; max-height: 100%;">\n' +
    '            <label class="item item-input">\n' +
    '                <span class="input-label">交易名称：</span>\n' +
    '                <input type="text" id="Noticenameid" placeholder="请输入交易名称">\n' +
    '            </label>\n' +
    '            <label class="item item-input">\n' +
    '                <span class="input-label">交易内容：</span>\n' +
    '                <input type="text" id="Noticecontentid" placeholder="请输入交易内容">\n' +
    '            </label>\n' +
    '            <div class="padding">\n' +
    '                <button class="searchSbBtn button button-block button-positive" ng-click="noticeSearchSblist()">查询</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OSI/OSILine/OSILine.tpl.html',
    '<ion-view class="OSILineCSS" >\n' +
    '    <ion-nav-title>巡查路线</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right" >\n' +
    '        <button class="button-icon icon ion-timedimension" ng-click="toOsiHistory()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="OSIDetail" ng-hide="OSIDetailHide">\n' +
    '            <div class="OSITitle">\n' +
    '                <div class="osiLeft">\n' +
    '                    <span>{{description}}({{inspectType}})</span>\n' +
    '                    <span class="osiTime">{{startTime | limitTo:10}} ~  {{endTime | limitTo:10}}</span>\n' +
    '                </div>\n' +
    '                <!--<div class="osiRight">\n' +
    '                    <button ng-click="searchsBlueTooth()">搜索蓝牙</button>\n' +
    '                </div>-->\n' +
    '            </div>\n' +
    '            <div class="scanQRcode" ng-hide="inputHide">\n' +
    '                <input type="text" placeholder="请扫描设备二维码" class="scanCode"\n' +
    '                       ng-click="toScanCode()" readonly>\n' +
    '            </div>\n' +
    '            <div class="OSIList">\n' +
    '                <ul class="list">\n' +
    '                    <li class="item item-icon-right" ng-repeat="h in hDetail track by $index">\n' +
    '                        <div class="leftShow">\n' +
    '                            <!--<i ng-style="identify" id="qdIconColorid{{$index}}">{{identifyShow}}</i>-->\n' +
    '                            <i ng-style="identify" ng-if="h.RECORD_TIME!=\'\' && h.RECORD_TIME!=null"  style="background: #83ecad">签到</i>\n' +
    '                            <i ng-style="identify" ng-if="h.RECORD_TIME==\'\' || h.RECORD_TIME==null" style="background: #ccc" id="qdIconColorid{{$index}}">未签到</i>\n' +
    '                            <span class="name">{{h.ADDRESS}}</span>\n' +
    '                            <span class="name">{{h.MCH_NAME}}</span>\n' +
    '                            <span class="glassname" id="recordTimeid{{$index}}">{{h.RECORD_TIME}}</span>\n' +
    '                            <span class="glassname" id="newRecordTimeid{{$index}}"\n' +
    '                                  style="display: none">{{recordTime}}</span>\n' +
    '                            <button id="recordID" class="itemQdBtn{{$index}}" style="display: none"\n' +
    '                                    ng-click="toSigned(h,$index)" ng-hide="itemQdBtnHide">签到\n' +
    '                            </button>\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '                    <!--<li class="item item-icon-right" ng-click="toOSIArear()">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i class="wqdShow">未签到</i>\n' +
    '                            <span class="name">#2风机</span>\n' +
    '                            &lt;!&ndash;<span class="glassname">2018-01-12 12:12:12</span>&ndash;&gt;\n' +
    '                        </div>\n' +
    '\n' +
    '                    </li>\n' +
    '                    <li class="item item-icon-right" ng-click="toOSIArear()">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i class="yqdShow">已签到</i>\n' +
    '                            <span class="name">#3风机</span>\n' +
    '                            <span class="glassname">2018-01-12 12:12:12</span>\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '                    <li class="item item-icon-right" ng-click="toOSIArear()">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i class="wqdShow">未签到</i>\n' +
    '                            <span class="name">#4风机</span>\n' +
    '                            &lt;!&ndash;<span class="glassname">2018-01-12 12:12:12</span>&ndash;&gt;\n' +
    '                        </div>\n' +
    '                    </li>-->\n' +
    '\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="position" ng-hide="positionHide">\n' +
    '            <i class="position_icon"></i>位置：{{patrolHomeData.ADDRESS}}\n' +
    '            <span style="display: block;">\n' +
    '                设备名称：{{patrolHomeData.MCH_NAME}}\n' +
    '            </span>\n' +
    '            <button class="qdBtn" ng-click="patrolSign()">签到</button>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('power/pdDay/pdDay.tpl.html',
    '<ion-view class="powerDetailCSS">\n' +
    '    <ion-nav-title>日电量</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="barGraph">\n' +
    '            <bar id="mainDay" legend="legend" data="data"></bar>\n' +
    '        </div>\n' +
    '        <div class="dayPowerList">\n' +
    '            <table>\n' +
    '                <tr >\n' +
    '                    <th>\n' +
    '                        <span>日期</span>\n' +
    '                        <span>(日)</span>\n' +
    '                    </th>\n' +
    '                    <th>\n' +
    '                        <span>发电量</span>\n' +
    '                        <span class="unitShow">(万KW.h)</span>\n' +
    '                    </th>\n' +
    '                    <th>\n' +
    '                        <span>日限负荷损失电量</span>\n' +
    '                        <span class="unitShow">(万KW.h)</span>\n' +
    '                    </th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="pdvalue in pdDayPower.slice().reverse()">\n' +
    '                    <td>\n' +
    '                        <span class="yearShow">{{pdvalue.REPORT_ID | date : "yyyy"}}</span>\n' +
    '                        <span class="mdayShow">{{pdvalue.REPORT_ID | date : "MM月dd"}}</span>\n' +
    '                    </td>\n' +
    '                    <td>{{pdvalue.DAY_ELE_AMOUNT | number:2}}</td>\n' +
    '                    <td>{{pdvalue.DAY_LOSS_AMOUNT | number:2}}</td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OSI/OSIHistoryDetail/OSIHistoryDetail.tpl.html',
    '<ion-view class="OSIHistoryDetailCSS">\n' +
    '    <ion-nav-title>巡查节点</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="OSIDetail">\n' +
    '            <div class="OSITitle">\n' +
    '                <div class="osiLeft">\n' +
    '                    <span>{{description}}({{inspectType}})</span>\n' +
    '                    <span class="osiTime">{{startTime}} ~  {{endTime}}</span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="OSIList">\n' +
    '                <ul class="list">\n' +
    '                    <li class="item item-icon-right" ng-click="toOSIArear()" ng-repeat="h in hDetail">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i ng-style="identify" ng-if="h.RECORD_TIME!=\'\' && h.RECORD_TIME!=null"  style="background: #83ecad">签到</i>\n' +
    '                            <i ng-style="identify" ng-if="h.RECORD_TIME==\'\' || h.RECORD_TIME==null" style="background: #ccc">未签到</i>\n' +
    '                            <span class="name">{{h.ADDRESS}}</span>\n' +
    '                            <span class="name">{{h.MCH_NAME}}</span>\n' +
    '                            <span class="glassname">{{h.RECORD_TIME}}</span>\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '                    <!--<li class="item item-icon-right" ng-click="toOSIArear()">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i class="wqdShow">未签到</i>\n' +
    '                            <span class="name">#2风机</span>\n' +
    '                            &lt;!&ndash;<span class="glassname">2018-01-12 12:12:12</span>&ndash;&gt;\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '                    <li class="item item-icon-right" ng-click="toOSIArear()">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i class="yqdShow">已签到</i>\n' +
    '                            <span class="name">#3风机</span>\n' +
    '                            <span class="glassname">2018-01-12 12:12:12</span>\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '                    <li class="item item-icon-right" ng-click="toOSIArear()">\n' +
    '                        <div class="leftShow">\n' +
    '                            <i class="wqdShow">未签到</i>\n' +
    '                            <span class="name">#4风机</span>\n' +
    '                            &lt;!&ndash;<span class="glassname">2018-01-12 12:12:12</span>&ndash;&gt;\n' +
    '                        </div>\n' +
    '                    </li>-->\n' +
    '\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('power/pdMounth/pdMounth.tpl.html',
    '<ion-view class="powerDetailCSS">\n' +
    '    <ion-nav-title>月电量</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="barGraph">\n' +
    '            <bar id="mainMounth" legend="legend" data="data"></bar>\n' +
    '        </div>\n' +
    '        <div class="dayPowerList">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>\n' +
    '                        <span>日期</span>\n' +
    '                        <span>(月)</span>\n' +
    '                    </th>\n' +
    '                    <th>\n' +
    '                        <span>发电量</span>\n' +
    '                        <span class="unitShow">(万KW·h)</span>\n' +
    '                    </th>\n' +
    '                    <th>\n' +
    '                        <span>月限负荷损失电量</span>\n' +
    '                        <span class="unitShow">(万KW·h)</span>\n' +
    '                    </th>\n' +
    '                    <th>计划完成率</th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="mouthList in monthList.slice().reverse()">\n' +
    '                    <td>{{mouthList.YEAR_MONTH}}</td>\n' +
    '                    <td>{{mouthList.MONTH_ELE_AMOUNT | number:2}}</td>\n' +
    '                    <td>{{mouthList.MONTH_LOSS_AMOUNT | number:2}}</td>\n' +
    '                    <td>{{mouthList.MONTH_PLAN_COMPLETE | number:2}}</td>\n' +
    '                </tr>\n' +
    '                <!--<tr>\n' +
    '                    <td>2016-6</td>\n' +
    '                    <td>82.1</td>\n' +
    '                    <td>92.1%</td>\n' +
    '                    <td>98.1%</td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>2016-7</td>\n' +
    '                    <td>82.1</td>\n' +
    '                    <td>92.1%</td>\n' +
    '                    <td>98.1%</td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>2016-8</td>\n' +
    '                    <td>82.1</td>\n' +
    '                    <td>92.1%</td>\n' +
    '                    <td>98.1%</td>\n' +
    '                </tr>\n' +
    '                <tr>\n' +
    '                    <td>2016-9</td>\n' +
    '                    <td>82.1</td>\n' +
    '                    <td>92.1%</td>\n' +
    '                    <td>98.1%</td>\n' +
    '                </tr>-->\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('Problems/NewProblems/newProblems.tpl.html',
    '<ion-view>\n' +
    '    <ion-nav-title>上传隐患</ion-nav-title>\n' +
    '    <ion-content class="newProblems">\n' +
    '        <button class="tackPhotos">拍照</button>\n' +
    '        <!--   <div class="photosNum"></div> -->\n' +
    '        <div class="upTime">\n' +
    '            <div>发现时间：</div>\n' +
    '            <div>{{nowDate |date : "MM月dd日HH时mm分"}}</div>\n' +
    '        </div>\n' +
    '        <div ng-click="selectWhich()" class="upTime">\n' +
    '            <div>隐患类型：</div>\n' +
    '            <div class="positionCss">\n' +
    '                <div ng-model="valueCont">{{valueCont}}</div>\n' +
    '                <div ng-if="selectShow" class="posCss">\n' +
    '                    <div ng-repeat="cont in conts" class="bagCol">\n' +
    '                        <div ng-click="selectCont(cont.val)" ng-model="valueCont2">{{cont.val}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="upTime">\n' +
    '            <div>上传人：</div>\n' +
    '            <div>{{}}</div>\n' +
    '        </div>\n' +
    '        <div class="upTime">\n' +
    '            <div>上报部门:</div>\n' +
    '            <div ng-repeat="num in nums">\n' +
    '                <div>{{}}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="describeCss">描述：</div>\n' +
    '        <textarea class="textSize"></textarea>\n' +
    '        <button class="button">上传</button>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('power/pdYear/pdYear.tpl.html',
    '<ion-view class="powerDetailCSS">\n' +
    '    <ion-nav-title>年电量</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="barGraph">\n' +
    '            <bar id="mainYear" legend="legend" data="data"></bar>\n' +
    '        </div>\n' +
    '        <div class="dayPowerList">\n' +
    '            <table>\n' +
    '                <tr>\n' +
    '                    <th>\n' +
    '                        <span>日期</span>\n' +
    '                        <span>(年)</span>\n' +
    '                    </th>\n' +
    '                    <th>\n' +
    '                        <span>发电量</span>\n' +
    '                        <span class="unitShow">(万KW·h)</span>\n' +
    '                    </th>\n' +
    '                    <th>\n' +
    '                        <span>年限负荷损失电量</span>\n' +
    '                        <span class="unitShow">(万KW·h)</span>\n' +
    '                    </th>\n' +
    '                    <th>计划完成率</th>\n' +
    '                </tr>\n' +
    '                <tr ng-repeat="yearDate in yearPower.slice().reverse()">\n' +
    '                    <td>\n' +
    '                        {{yearDate.YEAR}}\n' +
    '                    </td>\n' +
    '                    <td>{{yearDate.YEAR_ELE_AMOUNT | number:2}}</td>\n' +
    '                    <td>{{yearDate.YEAR_LOSS_AMOUNT | number:2}}</td>\n' +
    '                    <td>{{yearDate.YEAR_PLAN_COMPLETE | number:2}}</td>\n' +
    '                </tr>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('Problems/ProblemSolving/ProblemsSolving.tpl.html',
    '<ion-view class="problemsSolving">\n' +
    ' <ion-nav-title>隐患详情</ion-nav-title>\n' +
    '  <ion-nav-buttons side="right">\n' +
    '      <button class="button" ng-click="tracking()">\n' +
    '        跟踪\n' +
    '      </button>\n' +
    '    </ion-nav-buttons>\n' +
    ' <ion-content class="contentCss">\n' +
    ' <div class="listCss">\n' +
    '    <div>隐患类型：</div>\n' +
    '    <div>{{}}</div>\n' +
    ' </div>\n' +
    ' <div class="describeAllCss">\n' +
    ' 	<div class="descCss">描述:</div>\n' +
    ' <div>{{}}</div>\n' +
    ' </div>\n' +
    ' \n' +
    ' <div class="listCss">\n' +
    '   	<div class="">提交部门：</div>\n' +
    '   	<div class="">{{}}</div>\n' +
    ' </div>\n' +
    ' <div class="listCss">\n' +
    '	<div class="">上传人：</div>\n' +
    '   	<div class="">{{}}</div>\n' +
    ' </div>\n' +
    '  <div class="listCss">\n' +
    ' 	<div class="">上传时间：</div>\n' +
    '   	<div class="">{{}}</div>\n' +
    '  </div>\n' +
    '  <div class="listCss">\n' +
    '  	<div class="">图片：</div>\n' +
    '   	<div class="">{{}}</div>\n' +
    '  </div>\n' +
    '  <div class="listCss">\n' +
    '	<div class="">当前处理人：</div>\n' +
    '   	<div class="">{{}}</div>\n' +
    '  </div>\n' +
    '  <div class="listCss">\n' +
    '  	<div>处理时间：</div>\n' +
    '  	<div>{{}}</div>\n' +
    '  </div>\n' +
    '  <div class="ideaCss">意见:</div>\n' +
    '  <textarea class="textareaCss"></textarea>\n' +
    '  <div class="buttonCss">\n' +
    '  	<div class="okCss">确定</div>\n' +
    '  	<div class="noCss">取消</div>\n' +
    '  </div>\n' +
    '\n' +
    ' </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/companyAddressBook/companyAddressBook.tpl.html',
    '<ion-view hide-back-button="true">\n' +
    '    <ion-nav-title>企业通讯录</ion-nav-title>\n' +
    '    <div ng-include="\'tabs/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/companyAddressBook/content.tpl.html',
    '<ion-view class="companyAddressBookCSS">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '    <div class="list searchVal ">\n' +
    '	  <label class="item item-input">\n' +
    '	    <i class="icon ion-search placeholder-icon"></i>\n' +
    '	    <input type="text" ng-change="toChange(search.$)" ng-model="search.$" placeholder="搜索">\n' +
    '	  </label>\n' +
    '    </div>\n' +
    '    <div ng-if="listMsgShow" class="list listDetail " ng-repeat="item in items " >\n' +
    '        <a class="item item-icon-left" href="#" ng-click="addressList(item)">\n' +
    '          <i class="icon ion-ios-people-outline"></i>\n' +
    '          {{item.ORG_NAME}}\n' +
    '         <span class="bagImg"></span>\n' +
    '        </a>\n' +
    '      </div>\n' +
    '    <div ng-if="userMsgShow" class="list listDetail" ng-repeat="user in users | filter:search">\n' +
    '       <a class="item item-icon-left" href="#" ng-click="userMsg(user)">\n' +
    '          <i class="icon ion-ios-person-outline"></i>\n' +
    '          <div class="listShow">\n' +
    '              <span class="userLength">{{user.INTERNAL_DISPLAY_NAME}}</span>\n' +
    '              <span class="belongTo">{{"("+user.ORG_NAME+")"}}</span>\n' +
    '          </div>\n' +
    '        \n' +
    '         <span class="bagImg"></span>\n' +
    '        </a>\n' +
    '        \n' +
    '      </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/homePage/content.tpl.html',
    '<ion-view class="homePageCSS" hide-tabs>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm" overflow-scroll="true" style="overflow: hidden">\n' +
    '        <div class="handImage" id="bannerid">\n' +
    '            <div class="handweather">\n' +
    '                <span>{{now | date : "yyyy年MM月dd日"}}  {{str}}\n' +
    '                    {{frontW.weather}}\n' +
    '                    {{frontW.temperature}}\n' +
    '                    {{frontW.wind.indexOf(\'微风\')>=0?\'微风\':frontW.wind}}\n' +
    '                </span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="navList">\n' +
    '            <ul>\n' +
    '                <li class="col col-20">\n' +
    '                    <a ng-click="toSCGL()" class="rowLation">\n' +
    '                        <div class="scgl_img">\n' +
    '                        </div>\n' +
    '                        <p>生产管理</p>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="col col-20">\n' +
    '                    <a ng-click="toJYgl()" class="rowLation">\n' +
    '                        <div class="jygl_img">\n' +
    '                        </div>\n' +
    '                        <p>经营管理</p>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                 <li class="col col-20">\n' +
    '                    <a ng-click="toERP()" class="rowLation">\n' +
    '                        <div class="erp_img">\n' +
    '                            <span ng-if="erpTodoCount && erpTodoCount != 0">{{erpTodoCount}}</span>\n' +
    '                        </div>\n' +
    '                        <p>ERP审批</p>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="col col-20">\n' +
    '                    <a ng-click="toOA()" class="rowLation">\n' +
    '                        <div class="oa_img">\n' +
    '                        </div>\n' +
    '                        <p>OA审批</p>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="col col-20">\n' +
    '                    <a ng-click="toNEWS(\'7\')" class="rowLation">\n' +
    '                        <div class="gsxw_img">\n' +
    '                        </div>\n' +
    '                        <p>公司新闻</p>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="col col-20">\n' +
    '                    <a ng-click="toNEWS(\'32\')" class="rowLation">\n' +
    '                        <div class="gsfw_img"></div>\n' +
    '                        <p>公司发文</p>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="col col-20">\n' +
    '                    <a ng-click="toNEWS(\'31\')" class="rowLation">\n' +
    '                        <div class="tzgg_img"></div>\n' +
    '                        <p>通知公告</p>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <!--<li class="col col-20">\n' +
    '                    <a ng-click="tobBoard()" class="rowLation">\n' +
    '                        <div class="aqgl_img"></div>\n' +
    '                        <p>安全管理</p>\n' +
    '                    </a>\n' +
    '                </li>-->\n' +
    '                <!--<li class="col col-20">\n' +
    '                    <a ng-click="tobBoard()" class="rowLation">\n' +
    '                        <div class="ggbb_img"></div>\n' +
    '                        <p>白板管理</p>\n' +
    '                    </a>\n' +
    '                </li>-->\n' +
    '                <li class="col col-20">\n' +
    '                    <a ng-click="toAttence()" class="rowLation">\n' +
    '                        <div class="kqqd_img">\n' +
    '                        </div>\n' +
    '                        <p>考勤签到</p>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '                <li class="col col-20">\n' +
    '                    <a ng-click="toMINE()" class="rowLation">\n' +
    '                        <div class="grzx_img"></div>\n' +
    '                        <p>设置</p>\n' +
    '                    </a>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <div class="listCss">\n' +
    '            <ol class="olList" ng-repeat="count in newslist track by $index">\n' +
    '                <div class="news_List" ng-click="goNewsDatil(count)">\n' +
    '                    <div class="newslist">\n' +
    '                        <ul>\n' +
    '                            <li class="msg_colo" ng-model="gsxw" ng-style="newslistLi">{{count.FILETITLE}}</li>\n' +
    '                            <li class="date_m" ng-model="gsxw"><i class="date_m_icon"></i>{{count.PUBDATE | date : "yyyy-MM-dd" }}</li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </ol>\n' +
    '        </div>\n' +
    '        <div class="advert">\n' +
    '            <ion-slide-box active-slide="myActiveSlide" slide-interval="3000" does-continue="true" auto-play="true">\n' +
    '                <ion-slide ng-click="boardDetail(advert[0].LINE_NO)">\n' +
    '                    <div class="box box0">\n' +
    '                        <span class="titleShow" ng-model="ggbbmodel" ng-style="titleShow">{{advert[0].NEWS_TITLE}}</span>\n' +
    '                    </div>\n' +
    '                </ion-slide>\n' +
    '                <ion-slide ng-click="boardDetail(advert[1].LINE_NO)">\n' +
    '                    <div class="box box1">\n' +
    '                        <span class="titleShow" ng-model="ggbbmodel" >{{advert[1].NEWS_TITLE}}</span>\n' +
    '                    </div>\n' +
    '                </ion-slide>\n' +
    '                <ion-slide ng-click="boardDetail(advert[2].LINE_NO)">\n' +
    '                    <div class="box box2">\n' +
    '                        <span class="titleShow" ng-model="ggbbmodel" >{{advert[2].NEWS_TITLE}}</span>\n' +
    '                    </div>\n' +
    '                </ion-slide>\n' +
    '                <ion-slide ng-click="boardDetail(advert[3].LINE_NO)">\n' +
    '                    <div class="box box3">\n' +
    '                        <span class="titleShow" ng-model="ggbbmodel" >{{advert[3].NEWS_TITLE}}</span>\n' +
    '                    </div>\n' +
    '                </ion-slide>\n' +
    '                <ion-slide ng-click="boardDetail(advert[4].LINE_NO)" >\n' +
    '                    <div class="box box4">\n' +
    '                        <span class="titleShow" ng-model="ggbbmodel" >{{advert[4].NEWS_TITLE}}</span>\n' +
    '                    </div>\n' +
    '                </ion-slide>\n' +
    '            </ion-slide-box>\n' +
    '        </div>\n' +
    '        <!--<div class="advert">\n' +
    '            <ion-slide-box active-slide="myActiveSlide" slide-interval="3000" does-continue="true" auto-play="true">\n' +
    '                <ion-slide>\n' +
    '                    <div class="box"><img ng-src="{{advert.advert0}}"></div>\n' +
    '                </ion-slide>\n' +
    '                <ion-slide>\n' +
    '                    <div class="box"><img ng-src="{{advert.advert1}}"></div>\n' +
    '                </ion-slide>\n' +
    '                <ion-slide>\n' +
    '                    <div class="box"><img ng-src="{{advert.advert2}}"></div>\n' +
    '                </ion-slide>\n' +
    '            </ion-slide-box>\n' +
    '        </div>-->\n' +
    '    </ion-content>\n' +
    '</ion-view>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/homePage/homePage.tpl.html',
    '<ion-view hide-nav-bar="true" scrollbar-y="false">\n' +
    '    <ion-nav-title>国投新能源</ion-nav-title>\n' +
    '    <div ng-include="\'tabs/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/content.tpl.html',
    '<ion-view class="messageCSS">\n' +
    '    <div ng-class="{\'tabTopAndroid\':DeviceType == \'Android\',\'tabTopIOS\':DeviceType == \'iOS\'}">\n' +
    '        <ul>\n' +
    '            <li ng-class="{\'active\':sortShow == 0}" ng-click="changeItem(0);">会话</li>\n' +
    '            <span class="borderRight"></span>\n' +
    '            <li ng-class="{\'active\':sortShow == 1}" ng-click="changeItem(1);">好友</li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <ion-refresher pulling-text="..." on-refresh="doRefresh()" pulling-icon=""></ion-refresher>\n' +
    '        <!-- Android -->\n' +
    '        <div class="list" ng-if="sortShow == 0 && DeviceType == \'Android\'" ng-repeat="conversation in conversations track by $index" on-hold="popupMessageOpthins(conversation)">\n' +
    '            <a class="item item-avatar" href="/message/messageDetail/{{conversation.targetId}}" ng-if="conversation.type == \'single\' ">\n' +
    '                <div ng-if="conversation.title" class="rj-head-pic">{{conversation.title.substring(conversation.title.length-2)}}</div>\n' +
    '                <div ng-if="conversation.title == \'\' " class="rj-head-pic">{{conversation.targetId.substring(conversation.targetId.length-2)}}</div>\n' +
    '                <h2 ng-if="conversation.title">\n' +
    '                    {{conversation.title}}\n' +
    '                </h2>\n' +
    '                <h2 ng-if="conversation.title == \'\' ">\n' +
    '                    {{conversation.targetId}}\n' +
    '                </h2>\n' +
    '                <p>{{conversation.latestText}}</p>\n' +
    '                <span ng-show="conversation.unReadMsgCnt != 0" class="messageNum">{{conversation.unReadMsgCnt}}</span>\n' +
    '                <p>{{conversation.lastMsgDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</p>\n' +
    '            </a>\n' +
    '            <a class="item item-avatar" href="/message/groupDetail/{{conversation.targetId}}" ng-if="conversation.type == \'group\' ">\n' +
    '                <div class="rj-head-pic">{{conversation.title.substring(conversation.title.length-2)}}</div>\n' +
    '                <h2>{{conversation.title}}</h2>\n' +
    '                <p>{{conversation.latestText}}</p>\n' +
    '                <span ng-show="conversation.unReadMsgCnt != 0" class="messageNum" ng-bind="conversation.unReadMsgCnt"></span>\n' +
    '                <p>{{conversation.lastMsgDate | date:\'yyyy-MM-dd HH:mm:ss\'}}</p>\n' +
    '            </a>\n' +
    '        </div>\n' +
    '        <!-- iOS -->\n' +
    '        <div class="list" ng-if="sortShow == 0 && DeviceType != \'Android\'" ng-repeat="conversation in conversations track by $index" on-hold="popupMessageOpthins(conversation)">\n' +
    '            <a class="item item-avatar" href="/message/messageDetail/{{conversation.username}}" ng-if="!conversation.name">\n' +
    '                <div ng-if="conversation.nickname" class="rj-head-pic">{{conversation.nickname.substring(conversation.nickname.length-2)}}</div>\n' +
    '                <div ng-if="conversation.nickname == \'\' " class="rj-head-pic">{{conversation.username.substring(conversation.username.length-2)}}</div>\n' +
    '                <h2 ng-if="conversation.nickname">\n' +
    '                    {{conversation.nickname}}\n' +
    '                </h2>\n' +
    '                <h2 ng-if="conversation.nickname == \'\' ">\n' +
    '                    {{conversation.username}}\n' +
    '                </h2>\n' +
    '                <p>{{conversation.lastMessage}}</p>\n' +
    '                <span ng-show="conversation.unreadCount != 0" class="messageNum">{{conversation.unreadCount}}</span>\n' +
    '                <p>{{conversation.timestamp | date:\'yyyy-MM-dd HH:mm:ss\'}}</p>\n' +
    '            </a>\n' +
    '            <a class="item item-avatar" href="/message/groupDetail/{{conversation.gid}}" ng-if="conversation.name">\n' +
    '                <div class="rj-head-pic">{{conversation.name.substring(conversation.name.length-2)}}</div>\n' +
    '                <h2>{{conversation.name}}</h2>\n' +
    '                <p>{{conversation.lastMessage}}</p>\n' +
    '                <span ng-show="conversation.unreadCount != 0" class="messageNum" ng-bind="conversation.unreadCount"></span>\n' +
    '                <p>{{conversation.timestamp | date:\'yyyy-MM-dd HH:mm:ss\'}}</p>\n' +
    '            </a>\n' +
    '        </div>\n' +
    '        <div class="list" ng-show="sortShow == 1">\n' +
    '            <div class="item item-divider" ng-if="groupList.length>0">\n' +
    '                我的群组\n' +
    '            </div>\n' +
    '            <a class="item" href="/message/groupDetail/{{group.groupID?group.groupID:group.gid}}" ng-repeat="group in groupList track by $index" ng-if="groupList.length>0" on-hold="deleteGroup(group.groupID,group.gid,$index)">\n' +
    '                {{group.groupName?group.groupName:group.name}}\n' +
    '            </a>\n' +
    '            <div class="item item-divider" ng-if="friendList.length>0">\n' +
    '                我的好友\n' +
    '            </div>\n' +
    '            <a class="item" href="/message/messageDetail/{{friend.userName?friend.userName:friend.username}}" ng-if="friendList.length>0" ng-repeat="friend in friendList track by $index" on-hold="deleteFrient(friend.userName,$index)">\n' +
    '                <p ng-if="friend.nickname == \'\' ">{{friend.userName?friend.userName:friend.username}}</p>\n' +
    '                <p ng-if="friend.nickname != \'\' ">{{friend.nickname}}</p>\n' +
    '            </a>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/message.tpl.html',
    '<ion-view hide-back-button="true">\n' +
    '    <ion-nav-title>即时通讯</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button button-icon icon ion-person" ng-click="goMyInfo()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <div ng-include="\'tabs/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/popup.tpl.html',
    '<ion-list class="inputPopCSS">\n' +
    '    <ion-item ng-if="item.type == \'single\'" class="my-popup" ng-click="addFriend()">\n' +
    '        <h2>加为好友</h2>\n' +
    '    </ion-item>\n' +
    '    <ion-item class="my-popup" ng-click="deleteMessage()">\n' +
    '        <h2>删除该聊天</h2>\n' +
    '    </ion-item>\n' +
    '    <div class="close" ng-click="closePop()">\n' +
    '        <p class="closeImg"></p>\n' +
    '    </div>\n' +
    '</ion-list>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/mine/content.tpl.html',
    '<ion-view class="mineCSS">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="banner">\n' +
    '            <p class="head"></p>\n' +
    '            <p class="info">{{userName}}</p>\n' +
    '        </div>\n' +
    '        <div class="list card menuList">\n' +
    '            <!--    <ion-toggle class="item-icon-left" ng-model="checkedNum"  ng-change="onAgentsNumber(checkedNum)"> <i class="icon ion-data"></i> 应用程序图标标记\n' +
    '            </ion-toggle> -->\n' +
    '            <a href="/mine/netWork" nav-direction="forward" class="item item-icon-left">\n' +
    '                <i class="icon ion-data"></i><span class="handText">网络设置</span>\n' +
    '            </a>\n' +
    '            <a href="/ListOfBluetooth" nav-direction="forward" class="item item-icon-left">\n' +
    '                <i class="icon ion-bluetooth"></i><span class="handText">蓝牙列表</span>\n' +
    '            </a>\n' +
    '            <a ng-click="tobBoard()" nav-direction="forward" class="item item-icon-left">\n' +
    '                <i class="icon ion-board"></i><span class="handText">白板管理</span>\n' +
    '            </a>\n' +
    '            <a href="/userConfig" nav-direction="forward" class="item item-icon-left">\n' +
    '                <i class="icon ion-myMsg"></i><span class="handText">个人资料</span>\n' +
    '            </a>\n' +
    '            <a ng-click="cleaHistory()" nav-direction="forward" class="item item-icon-left">\n' +
    '                <i class="icon ion-deleMsg"></i><span class="handText">清除缓存</span>\n' +
    '            </a>\n' +
    '            <a href="/APPfeedback" ng-click="changeNumber()" nav-direction="forward" class="item item-icon-left">\n' +
    '                <i class="icon ion-commend"></i><span class="handText">APP反馈</span>\n' +
    '            </a>\n' +
    '            <!-- Android -->\n' +
    '            <div nav-direction="forward" class="item item-icon-left" close-popup-back-drop ng-click="checkVersion()" ng-if="DeviceType == \'Android\'">\n' +
    '                <i class="icon ion-version"></i><span class="handText">版本信息</span>\n' +
    '                <div class="versionTwo">\n' +
    '                    <span class="handText" class="remindTwo">\n' +
    '                </span>V {{appVersion}}\n' +
    '                    <!-- </span>测试版 V {{appVersion}} -->\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!-- iOS -->\n' +
    '            <div nav-direction="forward" class="item item-icon-left" close-popup-back-drop ng-click="checkVersion()" ng-if="DeviceType != \'Android\'">\n' +
    '                <i class="icon ion-version"></i><span class="handText">版本信息</span>\n' +
    '                <div class="versionTwo">\n' +
    '                    <span class="handText" class="remindTwo">\n' +
    '                </span>V {{appVersion}}\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="outList" ng-click="logout()">\n' +
    '            <div class="quit"><span class="handText">退出登录</span></div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/mine/mine.tpl.html',
    '<ion-view hide-back-button="true" hide-nav-bar="true" hide-tabs="false">\n' +
    '    <ion-nav-title>我的</ion-nav-title>\n' +
    '    <div ng-include="\'tabs/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/mine/showpromptMsg.tpl.html',
    '<div class="promptPopCSS">\n' +
    '    <div class="prompt">\n' +
    '        <span>提示:</span>\n' +
    '        <p>退出登录后，将不再收到推送通知。</p>\n' +
    '    </div>\n' +
    '    <div class="checkPrompt">\n' +
    '        <ion-checkbox ng-model="isChecked" ng-change="seleteShowpromptMsg(isChecked)">\n' +
    '            <span>不再提醒</span>\n' +
    '        </ion-checkbox>\n' +
    '    </div>\n' +
    '    <button class="button button-block button-positive" ng-click="closePop()">\n' +
    '        确定\n' +
    '    </button>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/OMA/content.tpl.html',
    '<ion-view hide-nav-bar="true" class="OMACSS" hide-back-button="true">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="kpiheader">\n' +
    '            <div class="omaheader"></div>\n' +
    '        </div>\n' +
    '        <div class="navlist">\n' +
    '            <ul>\n' +
    '                <li class="col col-25 rowLation" ng-click="totask()">\n' +
    '                    <div class="rwgl_img">\n' +
    '                    </div>\n' +
    '                    <p>任务管理</p>\n' +
    '                </li>\n' +
    '                <li class="col col-25 rowLation" ng-click="tospotTransaction()">\n' +
    '                    <div class="jydl_img">\n' +
    '                    </div>\n' +
    '                    <p>现货交易</p>\n' +
    '                </li>\n' +
    '                <li class="col col-25 rowLation" ng-click="toMarketbasedTrad()">\n' +
    '                    <div class="schjy_img">\n' +
    '                    </div>\n' +
    '                    <p>市场交易</p>\n' +
    '                </li>\n' +
    '                <li class="col col-25 rowLation" ng-click="toSettlementTrad()">\n' +
    '                    <div class="jsdl_img">\n' +
    '                    </div>\n' +
    '                    <p>结算电量</p>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/OMA/OMA.tpl.html',
    '<ion-view hide-nav-bar="true">\n' +
    '    <ion-nav-title>白银风电</ion-nav-title>\n' +
    '    <div ng-include="\'tabs/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/porductManage/content.tpl.html',
    '<ion-view hide-nav-bar="true" class="PMCSS" hide-back-button="true">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="kpiheader">\n' +
    '            <div class="electricSelect">\n' +
    '                <!--<select id="cityid" ng-change="selectPlantPower()" ng-model="dianchang">\n' +
    '                    <option value="{{$index}}" class="blue"\n' +
    '                            ng-repeat="plantpower in powerPlantList track by $index"\n' +
    '                            ng-selected="$index==0">{{plantpower.DESCRIPTION}}\n' +
    '                    </option>\n' +
    '                </select>-->\n' +
    '                <input type="text" class="rightselect" contenteditable="true" id="fieldID" readonly ng-click="selectPlantPower()">\n' +
    '            </div>\n' +
    '            <div class="headmiddle">\n' +
    '                <div class="weatherShow col col-50">\n' +
    '                    <div class="weatherImg col col-50">\n' +
    '                        <img src="{{Weather.dayPictureUrl}}">\n' +
    '                        <p>{{Weather.date.split(\' (实时：\')[0].substring(2,Weather.date.split(\' (实时：\')[0].length)}}</p>\n' +
    '                    </div>\n' +
    '                    <div class="weatherDes col col-50">\n' +
    '                        <ul>\n' +
    '                            <li class="wendu">{{Weather.date.split(\' (实时：\')[1].split(\')\')[0]}}<em></em></li>\n' +
    '                            <li class="dqwd">{{Weather.temperature}}<em></em></li>\n' +
    '                            <li class="tqType">{{Weather.weather}}</li>\n' +
    '                            <li class="wind">{{Weather.wind.indexOf(\'微风\')>=0?\'微风\':Weather.wind}}</li>\n' +
    '                        </ul>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="power col col-50">\n' +
    '                    <div class="comLoad col col-50">\n' +
    '                        <span>全公司总</br>负荷(MW)</span>\n' +
    '                        <span>{{(((companyPower.TOTAL_POWER - 0) < 0 ? 0 : ((companyPower.TOTAL_POWER - 0) > 999) ? 999 : companyPower.TOTAL_POWER))|number:2}}</span>\n' +
    '                        <!--<span>MW</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="comPower col col-50">\n' +
    '                        <span>全公司日</br>发电量</br>(万KW·h)</span>\n' +
    '                        <span>{{(companyPower.DAY_POWER-0).toFixed(2)}}</span>\n' +
    '                        <!--<span>MWH</span>-->\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="headerFoot" ng-hide="footHide">\n' +
    '                <ul>\n' +
    '                    <li class="col col-20 rightBorder">全厂<p>{{(((companyPower.TOTAL_POWER - 0) < 0 ? 0 :\n' +
    '                        ((companyPower.TOTAL_POWER - 0) > 999) ? 999 : companyPower.TOTAL_POWER))|number:2}}</p></li>\n' +
    '                    <li class="col col-20 rightBorder">甘<p>{{(((companyPower1.load.GS_POWER - 0) < 0 ? 0 :\n' +
    '                        ((companyPower1.load.GS_POWER - 0) > 999) ? 999 : companyPower1.load.GS_POWER))|number:2}}</p>\n' +
    '                    </li>\n' +
    '                    <li class="col col-20 rightBorder">青<p>{{(companyPower1.load.QH_POWER)|number:2}}</p></li>\n' +
    '                    <li class="col col-20 rightBorder">宁<p>{{(companyPower1.load.NX_POWER)|number:2}}</p></li>\n' +
    '                    <li class="col col-20">新<p>{{(((companyPower1.load.XJ_POWER - 0) < 0 ? 0 :\n' +
    '                        ((companyPower1.load.XJ_POWER - 0) > 999) ? 999 : companyPower1.load.XJ_POWER))|number:2}}</p>\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="btnnav">\n' +
    '            <ul>\n' +
    '                <li class="goFuhe col col-50" ng-click="goLoad();"><i class="fhicon_img"></i>负荷</li>\n' +
    '                <li class="goDl col col-50" ng-click="goPower();"><i class="dlicon_img"></i>电量</li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <div class="navlist">\n' +
    '            <ul>\n' +
    '                <li class="col col-20 rowLation" ng-click="tosczb()">\n' +
    '                    <div class="sczb_img">\n' +
    '                    </div>\n' +
    '                    <p>生产指标</p>\n' +
    '                </li>\n' +
    '                <li class="col col-20 rowLation" ng-click="toFhyc()" style="display: none">\n' +
    '                    <div class="fhyc_img">\n' +
    '                    </div>\n' +
    '                    <p>负荷预测</p>\n' +
    '                </li>\n' +
    '                <li class="col col-20 rowLation" ng-click="toJournal()">\n' +
    '                    <div class="yxri_img">\n' +
    '                    </div>\n' +
    '                    <p id="yxrzShow">运行日志</p>\n' +
    '                </li>\n' +
    '                <li class="col col-20 rowLation" ng-click="toYhpc()">\n' +
    '                    <div class="yhpc_img">\n' +
    '                    </div>\n' +
    '                    <p>隐患排查</p>\n' +
    '                </li>\n' +
    '                <li class="col col-20 rowLation" ng-click="toqxtb()">\n' +
    '                    <div class="qxtb_img">\n' +
    '                    </div>\n' +
    '                    <p>缺陷填报</p>\n' +
    '                </li>\n' +
    '                <li class="col col-20 rowLation" ng-click="toSbxx()">\n' +
    '                    <div class="sbxx_img">\n' +
    '                    </div>\n' +
    '                    <p>设备台账</p>\n' +
    '                </li>\n' +
    '                <li class="col col-20 rowLation" ng-click="toXcxc()">\n' +
    '                    <div class="xcxc_img">\n' +
    '                    </div>\n' +
    '                    <p>现场巡查</p>\n' +
    '                </li>\n' +
    '                <li class="col col-20 rowLation" ng-click="toOffLine()">\n' +
    '                    <div class="lxxc_img">\n' +
    '                    </div>\n' +
    '                    <p>离线巡查</p>\n' +
    '                </li>\n' +
    '                <li class="col col-20 rowLation" ng-click="toXctj()">\n' +
    '                    <div class="xctj_img">\n' +
    '                    </div>\n' +
    '                    <p>巡查统计</p>\n' +
    '                </li>\n' +
    '                <li class="col col-20 rowLation" ng-click="toRwgl()">\n' +
    '                    <div class="rwgl_img">\n' +
    '                    </div>\n' +
    '                    <p>专项任务</p>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/porductManage/porductManage.tpl.html',
    '<ion-view hide-nav-bar="true">\n' +
    '    <ion-nav-title>白银风电</ion-nav-title>\n' +
    '    <div ng-include="\'tabs/tab/tab.tpl.html\'">\n' +
    '    </div>\n' +
    '</ion-view>\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('taskManage/tmDetail/tmDetail.tpl.html',
    '<ion-view class="tmDetailCSS">\n' +
    '    <ion-nav-title>{{title}}</ion-nav-title>\n' +
    '    <ion-content>\n' +
    '        <div class="specialList">\n' +
    '            <h3>{{data.ITEM_NAME}}</h3>\n' +
    '            <ul>\n' +
    '                <li>\n' +
    '                    <span>类型：{{data.ITEM_CATELOGY}}<em>编号：{{data.SPECIAL_WORK_NO}}</em></span>\n' +
    '                    <span>计划开始时间：{{data.PLAN_START_TIME}}<em>实际开始时间：{{data.REAL_START_TIME}}</em></span>\n' +
    '                    <span>计划完成时间：{{data.PLAN_FINISH_TIME}}<em>实际完成时间：{{data.REAL_FINISH_TIME}}</em></span>\n' +
    '                    <span>负责人：{{data.ITEM_RESPONSER}}<em>监督人：{{data.ITEM_SUPERVISER}}</em></span>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <div class="xmContent">\n' +
    '            <h3>项目内容</h3>\n' +
    '            <span>{{data.ITEM_CONTENT}}</span>\n' +
    '        </div>\n' +
    '        <div class="xmMarker">\n' +
    '            <h3>项目里程碑</h3>\n' +
    '            <ul>\n' +
    '                <li>\n' +
    '                    <i class="lcbNum">1</i>\n' +
    '                    <h3>备件到货</h3>\n' +
    '                    <span>计划时间：{{data.PLAN_ARRIVAL_TIME}}</span>\n' +
    '                    <span>实际时间：{{data.REAL_ARRIVAL_TIME}}</span>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <i class="lcbNum">2</i>\n' +
    '                    <h3>完工</h3>\n' +
    '                    <span>开始时间：{{data.PLAN_FINISH_TIME}}</span>\n' +
    '                    <span>完成时间：{{data.REAL_FINISH_TIME}}</span>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <i class="lcbNum">3</i>\n' +
    '                    <h3>转固</h3>\n' +
    '                    <span>开始时间：{{data.PLAN_TURN_FIXED_TIME}}</span>\n' +
    '                    <span>完成时间：{{data.REAL_TURN_FIXED_TIME}}</span>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/tab/tab.tpl.html',
    '<ion-tabs ng-controller="tabController" class="tab tabs-icon-top tabs-color-active-positive tabs-icon-only footTabs" ng-class="{\'tabs-item-hide\': $root.hideTabs}">\n' +
    '    <ion-tab title="首页" icon-off="ion-index1" icon-on="ion-index-active1" ng-click="goTab(\'tabs/homePage\')" href="/tabs/homePage">\n' +
    '        <ion-view ng-include="getContentTpl(\'tabs/homePage\')" ng-if="isActived(\'tabs/homePage\')"></ion-view>\n' +
    '    </ion-tab>\n' +
    '    <ion-tab title="生产管理" icon-off="ion-index2" icon-on="ion-index-active2" ng-click="goTab(\'tabs/porductManage\')" href="/tabs/porductManage">\n' +
    '        <ion-view ng-include="getContentTpl(\'tabs/porductManage\')" ng-if="isActived(\'tabs/porductManage\')"></ion-view>\n' +
    '    </ion-tab>\n' +
    '    <ion-tab title="经营管理" icon-off="ion-index3" icon-on="ion-index-active3" ng-click="goTab(\'tabs/OMA\')" href="/tabs/OMA">\n' +
    '        <ion-view ng-include="getContentTpl(\'tabs/OMA\')" ng-if="isActived(\'tabs/OMA\')"></ion-view>\n' +
    '    </ion-tab>\n' +
    '    <ion-tab title="设置" icon-off="ion-index4" icon-on="ion-index-active4" ng-click="goTab(\'tabs/mine\')" href="/tabs/mine">\n' +
    '        <ion-view ng-include="getContentTpl(\'tabs/mine\')" ng-if="isActived(\'tabs/mine\')"></ion-view>\n' +
    '    </ion-tab>\n' +
    '</ion-tabs>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userConfig/editingUserInfo/editingUserInfo.tpl.html',
    '<ion-view class="editingUserInfoCSS">\n' +
    '    <ion-nav-title>修改个人资料</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <form class="editContent">\n' +
    '            <div class="items">\n' +
    '                <span class="head">真实姓名：</span>\n' +
    '                <input type="text" class="items" placeholder="请输入您的真实姓名" value="{{userInfo.realname}}" ng-model="userInfo.realname">\n' +
    '            </div>\n' +
    '            <div class="brithday" ng-click="openBrithday()">\n' +
    '                <span>出生年月：</span>\n' +
    '                <span class="items">{{userInfo.brithday}}</span>\n' +
    '            </div>\n' +
    '            <div class="hiredate" ng-click="openHiredate()">\n' +
    '                <span>入职时间：</span>\n' +
    '                <span class="items">{{userInfo.hiredate}}</span>\n' +
    '            </div>\n' +
    '            <div class="items">\n' +
    '                <span class="head">邮箱：</span>\n' +
    '                <input type="email" class="items" placeholder="请输入您的邮箱" value="{{userInfo.email}}" ng-model="userInfo.email">\n' +
    '            </div>\n' +
    '            <div class="items">\n' +
    '                <span class="head">手机号：</span>\n' +
    '                <input type="tel" class="items" placeholder="请输入您的邮箱" value="{{userInfo.phone}}" ng-model="userInfo.phone">\n' +
    '            </div>\n' +
    '            <div class="items">\n' +
    '                <span class="head">身份证号：</span>\n' +
    '                <input type="text" class="items" placeholder="请输入您的身份证号" value="{{userInfo.idcard}}" ng-model="userInfo.idcard">\n' +
    '            </div>\n' +
    '            <div class="items">\n' +
    '                <span class="head">住址：</span>\n' +
    '                <input type="text" class="items" placeholder="请输入您的住址" value="{{userInfo.address}}" ng-model="userInfo.address">\n' +
    '            </div>\n' +
    '            <div class="button appSbmtBtn" ng-click="updateUserInfor();">完成</div>\n' +
    '        </form>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userConfig/editingPwd/editingPwd.tpl.html',
    '<ion-view class="editingUserInfoContent">\n' +
    '    <ion-nav-title>修改登录密码</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <form name="pwd" class="editContent">\n' +
    '            <div class="items">\n' +
    '                <span class="head">原密码：</span>\n' +
    '                <input type="password" class="items" placeholder="请输入您的原密码" ng-model="userPwd.password">\n' +
    '            </div>\n' +
    '            <div class="items">\n' +
    '                <span class="head">新密码：</span>\n' +
    '                <input type="password" class="items" placeholder="请输入您的新密码" ng-model="userPwd.newPassword">\n' +
    '            </div>\n' +
    '            <div class="items">\n' +
    '                <span class="head">重新输入：</span>\n' +
    '                <input type="password" class="items" placeholder="请重新输入您的新密码" ng-model="userPwd.repeatPwd">\n' +
    '            </div>\n' +
    '            <div class="button appSbmtBtn" ng-disabled="!pwd.$valid || pwd.$submitted" ng-click="updateUserInfor();">完成</div>\n' +
    '        </form>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userConfig/myDevice/myDevice.tpl.html',
    '<ion-view class="myDeviceCSS">\n' +
    '    <ion-nav-title>我的设备</ion-nav-title>\n' +
    '    <ion-content class="userConfigContent" has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="userItemContent">\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">设备标识码</div>\n' +
    '                <div class="rgt">{{deviceID}}</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userServers/login/login.tpl.html',
    '<ion-modal-view hide-nav-bar="true" ng-controller="LoginController" class="loginCSS">\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" delegate-handle="loginScroll">\n' +
    '        <!-- <div class="goBack" ng-click="goBack();">返回</div> -->\n' +
    '        <!--  <div class="head"></div> -->\n' +
    '        <!--   <p class="appIcon"></p> -->\n' +
    '        <div class="empetDiv" ng-style="empty"></div>\n' +
    '        <form class="login" name="loginForm" ng-submit="login(credentials,loginForm);" novalidate>\n' +
    '            <div class="list">\n' +
    '                <label class="item item-input">\n' +
    '                    <span class="inputName">账号：</span>\n' +
    '                    <input type="text" id="username" ng-model="credentials.UserID" placeholder="请填写ERP账号" required>\n' +
    '                </label>\n' +
    '                <label class="item item-input">\n' +
    '                    <span class="inputPwd">密码：</span>\n' +
    '                    <input type="password" id="password" ng-model="credentials.PassWord" placeholder="请填写密码" required>\n' +
    '                </label>\n' +
    '            </div>\n' +
    '            <div class="remPwd">\n' +
    '                <ion-checkbox ng-model="isChecked" ng-change="seletePwd(isChecked)">记住密码</ion-checkbox>\n' +
    '            </div>\n' +
    '            <div class="isauto">\n' +
    '                <ion-checkbox ng-model="isAuto" ng-change="autoLogin(isAuto)">自动登录</ion-checkbox>\n' +
    '            </div>\n' +
    '            <button type="submit" ng-disabled="loginForm.$submitted" class="button">登录</button>\n' +
    '        </form>\n' +
    '    </ion-content>\n' +
    '</ion-modal-view>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userServers/blankPage/blankPage.tpl.html',
    '<ion-view class="blankPageStyle">\n' +
    '	\n' +
    ' </ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('Agents/AgentsList/agentsView/agentsView.tpl.html',
    '<ion-view class="agentsView">\n' +
    '    <ion-nav-title>待办审批</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button icon ion-ios-list-outline" ng-click="Toflow(item)">\n' +
    '        \n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content class="padding">\n' +
    '        <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()"></ion-refresher>\n' +
    '        <div class="beizhu">\n' +
    '            <div class="riseCss">标题:</div>\n' +
    '            <div class="explainCss">{{item.TITLE}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss">\n' +
    '            <div class="riseCss">流程最终处理时间:</div>\n' +
    '            <div class="explainCss">{{item.CREATED_DATE | date : "MM月dd日HH时mm分"}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss">\n' +
    '            <div class="riseCss">附加信息:</div>\n' +
    '            <div class="addInformation explainCss">\n' +
    '                <div class="addMessage" ng-repeat="MSG in item.FORM_INFO">\n' +
    '                    <div class="fromIn">\n' +
    '                        <!-- <div>{{key+\':\'}}</div> -->\n' +
    '                        <div>{{MSG}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="accessoryCss" ng-show="disFile" ng-click="accessoryCont()">附件</div>\n' +
    '        <div ng-show="displayFile" class="explainCss" ng-repeat="i in item.ATTACHMENT">\n' +
    '            <a ng-click="openUrl(i.URL)">{{i.TITLE}}</a>\n' +
    '        </div>\n' +
    '        <div class="lineCss"></div>\n' +
    '        <div class="beizhu">\n' +
    '            <div class="riseCss">备注:</div>\n' +
    '            <div class="explainCss">{{item.ITEM_MESSAGE}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss">\n' +
    '            <div class="riseCss">提交人姓名:</div>\n' +
    '            <div class="explainCss">{{item.SUBMIT_PERSON_NAME}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss">\n' +
    '            <div class="riseCss">当前审批人姓名:</div>\n' +
    '            <div class="explainCss">{{item.PERSON_NAME}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss">\n' +
    '            <div class="riseCss">流程发起时间:</div>\n' +
    '            <div class="explainCss">{{item.SUBMIT_DATE | date : "MM月dd日HH时mm分"}}</div>\n' +
    '        </div>\n' +
    '        <!-- <div class="allCss">\n' +
    '            <div class="riseCss">*附件（仅限图片）：</div>\n' +
    '            <div class="form_img">\n' +
    '                <div class="pictures">\n' +
    '                    <ion-scroll direction="x" scrollbar-x="false" scroll="true" class="scrollBox">\n' +
    '                        <ul ng-model="imageList">\n' +
    '                            <li class="itemPicture" ng-click="deletePicture($index)" ng-repeat="pictureItem in imageList track by $index">\n' +
    '                                <img src="{{pictureItem}}" />\n' +
    '                            </li>\n' +
    '                            <li class="caremaImg" ng-click="addAttachment()"></li>\n' +
    '                        </ul>\n' +
    '                    </ion-scroll>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div> -->\n' +
    '        <div class="approvalCss">审批意见:</div>\n' +
    '        <div>\n' +
    '            <textarea type="text" name="" class="inputCss" ng-model="APP_FORM_INFO">\n' +
    '            </textarea>\n' +
    '        </div>\n' +
    '        <div class="buttonCss">\n' +
    '            <button class=" button back1" ng-click="doApproval(\'APP\',APP_FORM_INFO)">批准</button>\n' +
    '            <button class=" button back2" ng-click="doApproval(\'REJ\',APP_FORM_INFO)">拒绝</button>\n' +
    '            <button class=" button back3" ng-click="back()">返回</button>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('Agents/AgentsList/operatingHistory/historyList.tpl.html',
    '<ion-view class="agentsList">\n' +
    ' <ion-nav-title>历史列表</ion-nav-title>\n' +
    '  <ion-nav-buttons side="right">\n' +
    '      <button class="button buttton-icon icon ion-ios-search " ng-click="showOrhide()">\n' +
    '      </button>\n' +
    '    </ion-nav-buttons>\n' +
    ' <ion-content>\n' +
    '  <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()"></ion-refresher>\n' +
    '     <div class="fade"   ng-if="trueStr">\n' +
    '      <div class="filterAllList" >\n' +
    '         <span>标题：</span>\n' +
    '         <textarea ng-model="inpTitle.vom"  class="filterTitleCss"></textarea>   \n' +
    '      </div>\n' +
    '      <div class="filterAllList">\n' +
    '         <span>时间：</span>\n' +
    '         <span class="timeInp" ng-click="chooseTime(\'1\')"  ng-model="filterDate">{{filterDate | date : "yyyy-MM-dd"}}</span>\n' +
    '         <span>~</span>\n' +
    '           <span class="timeInp" ng-click="chooseTime(\'2\')"  ng-model="filterDate2">{{filterDate2 | date : "yyyy-MM-dd"}}</span>\n' +
    '      </div>\n' +
    '      <div class="filterAllList">\n' +
    '         <span>审批源：</span><span class="timeInp choseA" ng-click="chooseWhich()" ng-model="chooseNum">{{chooseNum}}</span>\n' +
    '         <span ng-if="showChoose" ng-repeat="cont in conts" >\n' +
    '           <span class="whichFrom" ng-click="chooseFrom(cont.name)" ng-model="cont.name" >{{cont.name}}</span>\n' +
    '         </span>\n' +
    '       </div>\n' +
    '       <div class="butAll">\n' +
    '        <button  class="makeSur" ng-click="listAll()">清空</button>\n' +
    '         <button class="makeSur" ng-click="allChoose(inpTitle.vom)">确定</button>\n' +
    '       </div>\n' +
    '       \n' +
    '   </div>\n' +
    '   <div class="agentList ">\n' +
    '     <div class="historyTitleCss">标题</div>\n' +
    '     <div class="historyListCss">最新处理时间</div>\n' +
    '     <div>审批源</div>\n' +
    '   </div>\n' +
    '   <div class="agentsDetail historyChangeCss" ng-repeat="item in items" ng-click="agentsItem(item)" >\n' +
    '     <div class="agentsTitle hsitoryTitle">\n' +
    '     <span class="bagDian"></span>\n' +
    '     {{item.TITLE}}\n' +
    '     </div>\n' +
    '     <div  class="agentsData  historyData">{{item.CREATED_DATE | date : "MM月dd日HH时mm分"}}</div>\n' +
    '     <div class="terminalCss">{{item.FROM_CLIENT}}\n' +
    '      <span class="bagImg"></span></div>\n' +
    '   </div>\n' +
    '      <ion-infinite-scroll ng-if="hasMore" on-infinite="loadMore()" distance="1%"\n' +
    '       immediate-check="false">\n' +
    '      </ion-infinite-scroll>\n' +
    ' </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('AllLeave/Leave/leavesDetail/LeavesDetail.tpl.html',
    '<ion-view class="agentsView">\n' +
    '    <ion-nav-title>休假详情</ion-nav-title>\n' +
    '    <ion-content class="padding">\n' +
    '        <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()"></ion-refresher>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class=myCss>人员类别:</div>\n' +
    '            <div class=myCss>{{item.EMPLOYEE_TYPE_NEW}}</div>\n' +
    '            <div class=myCss>休假类型:</div>\n' +
    '            <div class=myCss>{{item.FURLOUGH_TYPE_NEW}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class="myCss">天数:</div>\n' +
    '            <div class="myCss">{{item.DAYS}}</div>\n' +
    '            <div class="myCss">状态:</div>\n' +
    '            <div class="myCss">{{item.APPLYFORLEAVESTATE}}</div>\n' +
    '        </div>\n' +
    '        <div class="beizhu">\n' +
    '            <div class="riseCss">事由:</div>\n' +
    '            <div class="explainCss">{{item.APPLY_DESC}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class=myCss>申请人:</div>\n' +
    '            <div class=myCss>{{item.USER_NAME}}</div>\n' +
    '            <div class=myCss>部门:</div>\n' +
    '            <div class=myCss>{{item.ORG_NAME}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class="myCss">申请日期:</div>\n' +
    '            <div class="myCss">{{item.APPLY_DATE | date : "yyyy年MM月dd日"}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class=myCss>开始日期:</div>\n' +
    '            <div class=myCss>{{item.BEGIN_DATE | date : "yyyy年MM月dd日"}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class=myCss>结束日期:</div>\n' +
    '            <div class=myCss>{{item.END_DATE | date : "yyyy年MM月dd日"}}</div>\n' +
    '        </div>\n' +
    '        <div class="beizhu">\n' +
    '            <div class="riseCss">休假原因:</div>\n' +
    '            <div class="explainCss">{{item.CAUSATION}}</div>\n' +
    '        </div>\n' +
    '        <div class="beizhu">\n' +
    '            <div class="riseCss">移交工作内容:</div>\n' +
    '            <div class="explainCss">{{item.HANDOVER_CONTENT}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class="myCss">申请编号:</div>\n' +
    '            <div class="myCss">{{item.APPLY_NO}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class="myCss">审批流程编号:</div>\n' +
    '            <div class="myCss">{{item.STANDARD_FLOW_ID}}</div>\n' +
    '        </div>\n' +
    '        <div class="buttonCss">\n' +
    '            <button ng-if="submitL" class=" button back2" ng-click="submit()">提交</button>\n' +
    '            <button ng-if="editL" class=" button back3" ng-click="edit(item)">编辑</button>\n' +
    '            <!-- <button ng-if="backLeaveL" class=" button back1" ng-click="backLeave()">销假</button> -->\n' +
    '          <!--   <button ng-if="deleL" class=" button back2" ng-click="dele()">删除</button> -->\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('AllLeave/Leave/LeavesList/LeavesList.tpl.html',
    '<ion-view class="agentsList">\n' +
    '    <ion-nav-title>休假列表</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '     <button  class="button buttton-icon ion-ios-plus-outline" style="font-size: 1.6em" ng-click="newLeave()">\n' +
    '        </button>\n' +
    '        <button class="button buttton-icon icon ion-ios-search " ng-click="showOrhide()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content>\n' +
    '        <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()">\n' +
    '        </ion-refresher>\n' +
    '        <div class="fade" ng-show="trueStr">\n' +
    '        <div class="item item-input item-select" data-tap-disabled="true">\n' +
    '                <div class="input-label">\n' +
    '                    休假类型：\n' +
    '                </div>\n' +
    '                <select ng-model="type2" >\n' +
    '                    <option value="">请选择</option>\n' +
    '                    <option ng-repeat="item4 in item4s" value={{item4.BUSIN_ID}}>{{item4.BUSIN_NAME}}</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="filterAllList">\n' +
    '                <span>时间：</span>\n' +
    '                <span  class="timeInp" ng-click="chooseTime(\'1\')" ng-model="filterDate">{{filterDate | date : "yyyy-MM-dd"}}</span>\n' +
    '                <span>~</span>\n' +
    '                <span  class="timeInp" ng-click="chooseTime(\'2\')" ng-model="filterDate2">{{filterDate2 | date : "yyyy-MM-dd"}}</span>\n' +
    '            </div>\n' +
    '            <div class="item item-input item-select" data-tap-disabled="true">\n' +
    '                <div class="input-label">\n' +
    '                    状态：\n' +
    '                </div>\n' +
    '                <select ng-model="type" >\n' +
    '                    <option value="">请选择</option>\n' +
    '                    <option ng-repeat="item3 in item3s" value={{item3.BUSIN_ID}}>{{item3.BUSIN_NAME}}</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="butAll">\n' +
    '                <button class="makeSur" ng-click="listAll()">清空</button>\n' +
    '                <button class="makeSur" ng-click="allChoose(type,type2)">确定</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="agentList">\n' +
    '            <div style="width: 20%;">请假类型</div>\n' +
    '            <div class="handleTime" style="width: 20%;">提交时间</div>\n' +
    '            <div class="handleTime" style="width: 30%;">状态</div>\n' +
    '        </div>\n' +
    '        <div class="agentsDetail" ng-repeat="item in items" ng-click="leavesDetail(item)">\n' +
    '            <div class="agentsTitle" style="width: 30%;text-align: left;">\n' +
    '                <span class="bagDian"></span> {{item.FURLOUGH_TYPE_NEW}}\n' +
    '            </div>\n' +
    '            <div class="agentsData" style="width: 30%;text-align: left;">{{item.BEGIN_TIME | date : "yyyy年MM月dd日"}}\n' +
    '            </div>\n' +
    '            <div style="width: 30%;">\n' +
    '                {{item.APPLYFORLEAVESTATE}}\n' +
    '                <span class="bagImg" style="float: right;    transform: translateY(0.3em);"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <ion-infinite-scroll ng-if="hasMore" on-infinite="loadMore()" distance="1%" immediate-check="false">\n' +
    '        </ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('AllLeave/Leave/newLeaves/newLeaves.tpl.html',
    '<ion-view class="agentsView">\n' +
    '    <ion-nav-title>{{contN}}休假申请</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '     <button  class="button buttton-icon ion-ios-home-outline" style="font-size: 1.6em" ng-click="backHomePage()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content class="padding">\n' +
    '        <form name="myForm" novalidate>\n' +
    '            <div class="beizhu">\n' +
    '                <div class="riseCss"><span style="color:red">*</span>事由:\n' +
    '                    <span style="color:red" ng-show="myForm.shiyou.$dirty && myForm.shiyou.$invalid">\n' +
    '                    <span ng-show="myForm.shiyou.$error.required">事由是必须的。</span>\n' +
    '                    </span>\n' +
    '                </div>\n' +
    '                <textarea class="inputCss " name="shiyou" required ng-model="newLeavePara.APPLY_DESC">\n' +
    '                </textarea>\n' +
    '            </div>\n' +
    '            <div class="allCss lastDate">\n' +
    '                <div class="riseCss"><span style="color:red">*</span>申请日期:</div>\n' +
    '                <input class="timeInp myCss" readonly ng-click="chooseTime(\'1\')" ng-model="filterDate1">\n' +
    '            </div>\n' +
    '            <div class="allCss lastDate">\n' +
    '                <div class="item item-input item-select" data-tap-disabled="true" style="width: 100%;">\n' +
    '                    <div class="input-label">\n' +
    '                        <span style="color:red">*</span>人员类别：\n' +
    '                    </div>\n' +
    '                    <select required ng-model="newLeavePara.EMPLOYEE_TYPE" data-tap-disabled="true">\n' +
    '                        <option value="">请选择</option>\n' +
    '                        <option ng-repeat="item4 in item4s" value={{item4.BUSIN_ID}}>{{item4.BUSIN_NAME}}</option>\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="allCss lastDate">\n' +
    '                <div class="item item-input item-select" data-tap-disabled="true" style="width: 100%;">\n' +
    '                    <div class="input-label">\n' +
    '                        <span style="color:red">*</span>休假类型：\n' +
    '                    </div>\n' +
    '                    <select required ng-model="newLeavePara.FURLOUGH_TYPE" data-tap-disabled="true">\n' +
    '                        <option value="">请选择</option>\n' +
    '                        <option ng-repeat="item3 in item3s" value={{item3.BUSIN_ID}}>{{item3.BUSIN_NAME}}</option>\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="allCss lastDate">\n' +
    '                <div class=myCss><span style="color:red">*</span>开始日期:\n' +
    '                    <span style="color:red" ng-show="myForm.beginDate.$dirty && myForm.beginDate.$invalid">\n' +
    '                    <span ng-show="myForm.beginDate.$error.required">开始日期必须填</span>\n' +
    '                    </span>\n' +
    '                </div>\n' +
    '                <input class="timeInp myCss" name="beginDate" required readonly ng-click="chooseTime(\'2\')" ng-model="filterDate2">\n' +
    '            </div>\n' +
    '            <div class="allCss lastDate">\n' +
    '                <div class=myCss><span style="color:red">*</span>结束日期:\n' +
    '                    <span style="color:red" ng-show="myForm.endDate.$dirty && myForm.endDate.$invalid">\n' +
    '                    <span ng-show="myForm.endDate.$error.required">开始日期必须填</span>\n' +
    '                    </span>\n' +
    '                </div>\n' +
    '                <input class="timeInp myCss" name="endDate" required readonly ng-click="chooseTime(\'3\')" ng-model="filterDate3">\n' +
    '            </div>\n' +
    '            <div class="beizhu">\n' +
    '                <div class="riseCss">天数:</div>\n' +
    '                <div class="explainCss" ng-model="DAYS">{{DAYS}}</div>\n' +
    '            </div>\n' +
    '            <div class="beizhu">\n' +
    '                <div class="riseCss">休假原因:</div>\n' +
    '                <textarea class="inputCss " ng-model="newLeavePara.CAUSATION">\n' +
    '                </textarea>\n' +
    '            </div>\n' +
    '            <div class="beizhu">\n' +
    '                <div class="riseCss">移交工作内容:</div>\n' +
    '                <textarea class="inputCss " ng-model="newLeavePara.HANDOVER_CONTENT">\n' +
    '                </textarea>\n' +
    '            </div>\n' +
    '            <div style="color: red;">（备注：*为必填项）</div>\n' +
    '            <div class="buttonCss">\n' +
    '                <button class=" button back1" ng-disabled="myForm.$invalid" ng-click="doApproval(1,newLeavePara)">提交</button>\n' +
    '                <button class=" button back2" ng-disabled="myForm.$invalid" ng-click="doApproval(2,newLeavePara)">保存</button>\n' +
    '                <button class=" button back3" ng-click="back()">返回</button>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('AllLeave/Vacation/newVacation/newVacation.tpl.html',
    '<ion-view class="agentsView">\n' +
    '    <ion-nav-title>{{contN}}出差申请</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '     <button  class="button buttton-icon ion-ios-home-outline" style="font-size: 1.6em" ng-click="backHomePage()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content class="padding">\n' +
    '        <form name="myForm" novalidate>\n' +
    '            <div class="beizhu">\n' +
    '                <div class="riseCss"><span style="color:red">*</span>事由:\n' +
    '                    <span style="color:red" ng-show="myForm.shiyou.$dirty && myForm.shiyou.$invalid">\n' +
    '                    <span ng-show="myForm.shiyou.$error.required">事由是必须的。</span>\n' +
    '                    </span>\n' +
    '                </div>\n' +
    '                <textarea class="inputCss " name="shiyou" required ng-model="newLeavePara.APPLY_DESC">\n' +
    '                </textarea>\n' +
    '            </div>\n' +
    '            <!--   <div class="allCss lastDate">\n' +
    '                <div class=myCss>申请人:</div>\n' +
    '                <div class=myCss>{{newLeavePara.USER_NAME}}</div>\n' +
    '                <div class=myCss>部门:</div>\n' +
    '                <div class=myCss>{{newLeavePara.ORG_NAME}}</div>\n' +
    '            </div> -->\n' +
    '            <div class="allCss lastDate">\n' +
    '                <div class="riseCss"><span style="color:red">*</span>申请日期:</div>\n' +
    '                <input class="timeInp myCss" readonly ng-click="chooseTime(\'1\')" ng-model="filterDate1">\n' +
    '            </div>\n' +
    '            <div class="allCss lastDate">\n' +
    '                <div class="item item-input item-select" data-tap-disabled="true" style="width: 100%;">\n' +
    '                    <div class="input-label">\n' +
    '                        <span style="color:red">*</span>人员类别：\n' +
    '                    </div>\n' +
    '                    <select required ng-model="newLeavePara.EMPLOYEE_TYPE">\n' +
    '                        <option value="">请选择</option>\n' +
    '                        <option ng-repeat="item4 in item4s" value="{{item4.BUSIN_ID}}">{{item4.BUSIN_NAME}}\n' +
    '                        </option>\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="allCss lastDate">\n' +
    '                <div class="item item-input item-select" data-tap-disabled="true" style="width: 100%;">\n' +
    '                    <div class="input-label">\n' +
    '                        <span style="color:red">*</span>交通方式：\n' +
    '                    </div>\n' +
    '                    <select required ng-model="newLeavePara.TRANSPORTATION" data-tap-disabled="true">\n' +
    '                        <option value="">请选择</option>\n' +
    '                        <option ng-repeat="item5 in item5s" value={{item5.BUSIN_ID}}>{{item5.BUSIN_NAME}}</option>\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="allCss lastDate">\n' +
    '                <div class=myCss><span style="color:red">*</span>开始日期:\n' +
    '                    <span style="color:red" ng-show="myForm.beginDate.$dirty && myForm.beginDate.$invalid">\n' +
    '                    <span ng-show="myForm.beginDate.$error.required">开始日期必须填</span>\n' +
    '                    </span>\n' +
    '                </div>\n' +
    '                <input class="timeInp myCss" name="beginDate" required readonly ng-click="chooseTime(\'2\')" ng-model="filterDate2">\n' +
    '            </div>\n' +
    '            <div class="allCss lastDate">\n' +
    '                <div class=myCss><span style="color:red">*</span>结束日期:\n' +
    '                    <span style="color:red" ng-show="myForm.endDate.$dirty && myForm.endDate.$invalid">\n' +
    '                    <span ng-show="myForm.endDate.$error.required">开始日期必须填</span>\n' +
    '                    </span>\n' +
    '                </div>\n' +
    '                <input class="timeInp myCss" name="endDate" required readonly ng-click="chooseTime(\'3\')" ng-model="filterDate3">\n' +
    '            </div>\n' +
    '            <div class="beizhu">\n' +
    '                <div class="riseCss">天数:</div>\n' +
    '                <div class="explainCss" ng-model="DAYS">{{DAYS}}</div>\n' +
    '            </div>\n' +
    '            <div class="beizhu">\n' +
    '                <div class="riseCss">出差地点:</div>\n' +
    '                <textarea class="inputCss " ng-model="newLeavePara.DESTINATION">\n' +
    '                </textarea>\n' +
    '            </div>\n' +
    '            <div style="color: red;">（备注：*为必填项）</div>\n' +
    '            <div class="buttonCss">\n' +
    '                <button class=" button back1" ng-disabled="myForm.$invalid" ng-click="doApproval(1,newLeavePara)">提交</button>\n' +
    '                <button class=" button back2" ng-disabled="myForm.$invalid" ng-click="doApproval(2,newLeavePara)">保存</button>\n' +
    '                <button class=" button back3" ng-click="back()">返回</button>\n' +
    '            </div>\n' +
    '        </form>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('AllLeave/Vacation/VacationDetail/VacationDetail.tpl.html',
    '<ion-view class="agentsView">\n' +
    '    <ion-nav-title>出差详情</ion-nav-title>\n' +
    '    <ion-content class="padding">\n' +
    '        <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()"></ion-refresher>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class=myCss>人员类别:</div>\n' +
    '            <div class=myCss>{{item.EMPLOYEE_TYPE_NEW}}</div>\n' +
    '            <div class=myCss>申请类型:</div>\n' +
    '            <div class=myCss>{{item.SPECIALTY_NEW}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class="myCss">天数:</div>\n' +
    '            <div class="myCss">{{item.DAYS}}</div>\n' +
    '            <div class="myCss">状态:</div>\n' +
    '            <div class="myCss">{{item.APPROVE_STATUS}}</div>\n' +
    '        </div>\n' +
    '        <div class="beizhu">\n' +
    '            <div class="riseCss">事由:</div>\n' +
    '            <div class="explainCss">{{item.APPLY_DESC}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class=myCss>申请人:</div>\n' +
    '            <div class=myCss>{{item.USER_NAME}}</div>\n' +
    '            <div class=myCss>部门:</div>\n' +
    '            <div class=myCss>{{item.ORG_NAME}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class="myCss">创建人:</div>\n' +
    '            <div class="myCss">{{item.CREATOR_NEW}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class="myCss">申请日期:</div>\n' +
    '            <div class="myCss">{{item.APPLY_DATE.substring(0,10) | date : "MM月dd日"}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class=myCss>开始日期:</div>\n' +
    '            <div class=myCss>{{item.BEGIN_DATE.substring(0,10) | date : "MM月dd日"}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class=myCss>结束日期:</div>\n' +
    '            <div class=myCss>{{item.END_DATE.substring(0,10) | date : "MM月dd日"}}</div>\n' +
    '        </div>\n' +
    '        <div class="beizhu">\n' +
    '            <div class="riseCss">交通方式:</div>\n' +
    '            <div class="explainCss">{{item.TRANSPORTATION}}</div>\n' +
    '        </div>\n' +
    '        <div class="beizhu">\n' +
    '            <div class="riseCss">出差地点:</div>\n' +
    '            <div class="explainCss">{{item.DESTINATION}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class="myCss">申请编号:</div>\n' +
    '            <div class="myCss">{{item.APPLY_NO}}</div>\n' +
    '        </div>\n' +
    '        <div class="allCss lastDate">\n' +
    '            <div class="myCss">审批流程编号:</div>\n' +
    '            <div class="myCss">{{item.STANDARD_FLOW_ID}}</div>\n' +
    '        </div>\n' +
    '        <div class="buttonCss">\n' +
    '            <button ng-if="submitL" class=" button back2" ng-click="submit()">提交</button>\n' +
    '            <button ng-if="editL" class=" button back3" ng-click="edit(item)">编辑</button>\n' +
    '           <!--  <button ng-if="backLeaveL" class=" button back1" ng-click="backLeave()">销假</button> -->\n' +
    '         <!--    <button ng-if="deleL" class=" button back2" ng-click="dele()">删除</button> -->\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('AllLeave/Vacation/VacationList/VacationList.tpl.html',
    '<ion-view class="agentsList">\n' +
    '    <ion-nav-title>出差列表</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '     <button  class="button buttton-icon ion-ios-plus-outline" style="font-size: 1.6em" ng-click="newVacation()">\n' +
    '        </button>\n' +
    '        <button class="button buttton-icon icon ion-ios-search " ng-click="showOrhide()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content>\n' +
    '        <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()">\n' +
    '        </ion-refresher>\n' +
    '        <div class="fade" ng-show="trueStr">\n' +
    '            <div class="filterAllList">\n' +
    '                <span>标题：</span>\n' +
    '                <textarea ng-model="vom" class="filterTitleCss" style="resize: none;"></textarea>\n' +
    '            </div>\n' +
    '            <div class="filterAllList">\n' +
    '                <span>时间：</span>\n' +
    '                <span class="timeInp" ng-click="chooseTime(\'1\')" ng-model="filterDate">{{filterDate | date : "yyyy-MM-dd"}}</span>\n' +
    '                <span>~</span>\n' +
    '                <span class="timeInp" ng-click="chooseTime(\'2\')" ng-model="filterDate2">{{filterDate2 | date : "yyyy-MM-dd"}}</span>\n' +
    '            </div>\n' +
    '            <div class="item item-input item-select">\n' +
    '                <div class="input-label">\n' +
    '                    状态：\n' +
    '                </div>\n' +
    '                <select ng-model="type" data-tap-disabled="true">\n' +
    '                    <option value="">请选择</option>\n' +
    '                    <option ng-repeat="item3 in item3s" value={{item3.BUSIN_NAME}}>{{item3.BUSIN_NAME}}</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="butAll">\n' +
    '                <button class="makeSur" ng-click="listAll()">清空</button>\n' +
    '                <button class="makeSur" ng-click="allChoose(type,vom)">确定</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="agentList">\n' +
    '            <div style="width: 20%;">出差原因</div>\n' +
    '            <div class="handleTime" style="width: 20%;">提交时间</div>\n' +
    '            <div class="handleTime" style="width: 30%;">状态</div>\n' +
    '        </div>\n' +
    '        <div class="agentsDetail" ng-repeat="item in items" ng-click="leavesDetail(item)">\n' +
    '            <div class="agentsTitle" style="width: 30%;text-align: left;">\n' +
    '                <span class="bagDian"></span> {{item.APPLY_DESC}}\n' +
    '            </div>\n' +
    '            <div class="agentsData" style="width: 30%;text-align: left;">{{item.BEGIN_TIME | date : "yyyy年MM月dd日"}}\n' +
    '            </div>\n' +
    '            <div style="width: 30%;">\n' +
    '                {{item.APPROVE_STATUS}}\n' +
    '                <span class="bagImg" style="float: right;    transform: translateY(0.3em);"></span>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <ion-infinite-scroll ng-if="hasMore" on-infinite="loadMore()" distance="1%" immediate-check="false">\n' +
    '        </ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/countAttence/cdDetail/cdDetail.tpl.html',
    '<ion-view class="wdkDetailCSS">\n' +
    '    <ion-nav-title>迟到详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="content">\n' +
    '            <h3><span>2018年3月</span>李孝利<span>迟到</span><span>共22分钟</span></h3>\n' +
    '            <ul class="list">\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-06</span>\n' +
    '                       <!-- <span class="glassname">国投白银风电</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">迟到20分钟</span>\n' +
    '                        <!--<i class="icon ion-chevron-right"></i>-->\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-08</span>\n' +
    '                        <!--<span class="glassname">国投白银风电</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">迟到18分钟</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-12</span>\n' +
    '                        <!--<span class="glassname">国投白银风电</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">迟到35分钟</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-13</span>\n' +
    '                        <!--<span class="glassname">国投白银风电</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">迟到20分钟</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-15</span>\n' +
    '                        <!--<span class="glassname">国投白银风电</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">迟到15分钟</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/countAttence/cdList/cdList.tpl.html',
    '<ion-view class="cdListCSS">\n' +
    '    <ion-nav-title>迟到</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="content">\n' +
    '            <h3><span>{{dateTimeShow}}</span>迟到<span>共{{personNum}}人</span></h3>\n' +
    '            <ul class="list">\n' +
    '                <li class="item item-icon-right" ng-click="towdkDetail(x)" ng-repeat="x in cdList">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="name">{{x.PERSON_NAME}}</span>\n' +
    '                        <span class="glassname">{{partName}}</span>\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">{{x.COUNT}}次</span>\n' +
    '                        <!--<span class="totalTime">12分钟</span>-->\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <!--<li class="item item-icon-right" ng-click="tocdDetail()">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="name">王明霞</span>\n' +
    '                        <span class="glassname">国投白银风电</span>\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">12次</span>\n' +
    '                        <span class="totalTime">12分钟</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item item-icon-right" ng-click="tocdDetail()">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="name">张小明</span>\n' +
    '                        <span class="glassname">国投白银风电</span>\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">2次</span>\n' +
    '                        <span class="totalTime">12分钟</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </div>\n' +
    '                </li>-->\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/countAttence/wdkDetail/wdkDetail.tpl.html',
    '<ion-view class="wdkDetailCSS">\n' +
    '    <ion-nav-title>打卡详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="content">\n' +
    '            <h3>\n' +
    '                <button class="leftSelect" ng-click="changeDateTime(-1)"></button>\n' +
    '                <span>{{dateTimeShow}}</span>\n' +
    '                <button class="rightSelect" ng-click="changeDateTime(1)"></button>\n' +
    '                <em>{{personName}}</em>\n' +
    '                <!--<span>未打卡</span><span>共{{count}}次</span>-->\n' +
    '            </h3>\n' +
    '            <div class="myAttencelist">\n' +
    '                <table>\n' +
    '                    <tr>\n' +
    '                        <th>日期</th>\n' +
    '                        <th>打卡时间</th>\n' +
    '                        <th>备注</th>\n' +
    '                    </tr>\n' +
    '                    <tbody ng-repeat="x in wdkPersonList">\n' +
    '                    <tr ng-repeat="wdkitem in x.list track by $index">\n' +
    '                        <td ng-if="$index == 0" rowspan="{{x.list.length}}" class="countdate">\n' +
    '                            {{x.month}}/{{x.date}}\n' +
    '                            <span>{{x.week}}</span>\n' +
    '                        </td>\n' +
    '                        <td ng-click="toPositions(wdkitem)"><span class="{{wdkitem.checkInState==\'正常\' ? \'abnormalgreen\' : \'abnormalAttence\'}}">{{wdkitem.actualStartTime}}</span>- <span class="{{wdkitem.checkOutState==\'正常\' ? \'abnormalgreen\' : \'abnormalAttence\'}}">{{wdkitem.actualEndTime}}</span> </td>\n' +
    '                        <td ng-bind-html="wdkitem.remarks" class="{{wdkitem.confirmDate.length>0 ? \'abnormalgreen\' : \'abnormalAttence\'}} coustvalueright"></td>\n' +
    '                    </tr>\n' +
    '                    </tbody>\n' +
    '                </table>\n' +
    '                <!--<table>-->\n' +
    '                    <!--<tr>-->\n' +
    '                        <!--<th>日期</th>-->\n' +
    '                        <!--<th>打卡时间</th>-->\n' +
    '                        <!--<th>备注</th>-->\n' +
    '                    <!--</tr>-->\n' +
    '                    <!--<tr ng-repeat="x in wdkPersonList track by $index">-->\n' +
    '                        <!--<td>-->\n' +
    '                            <!--<span>{{x.year}}-{{x.month}}-{{x.date}}</span>-->\n' +
    '                            <!--<span>{{x.week}}</span>-->\n' +
    '                        <!--</td>-->\n' +
    '                        <!--<td ng-click="toPosition(x)">-->\n' +
    '                            <!--<i ng-if="x.checkInState==\'正常\'">{{x.actualStartTime | limitTo:-8}}</i>-->\n' +
    '                            <!--<i ng-if="x.checkInState!=\'正常\'" style="color: red">{{x.actualStartTime | limitTo:-8}}</i>-->\n' +
    '                            <!-- - -->\n' +
    '                            <!--<i ng-if="x.checkOutState==\'正常\'">{{x.actualEndTime | limitTo:-8 }}</i>-->\n' +
    '                            <!--<i ng-if="x.checkOutState!=\'正常\'" style="color: red">{{x.actualEndTime | limitTo:-8 }}</i>-->\n' +
    '                        <!--</td>-->\n' +
    '                        <!--<td ng-bind-html="x.remarks">-->\n' +
    '                        <!--</td>-->\n' +
    '                    <!--</tr>-->\n' +
    '                <!--</table>-->\n' +
    '            </div>\n' +
    '            <!--<ul class="list">-->\n' +
    '                <!--<li class="item" ng-repeat="x in wdkPersonList">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">{{x.year}}-{{x.month}}-{{x.date}} {{x.week}}</span>\n' +
    '                       &lt;!&ndash; <span class="glassname">国投白银风电</span>&ndash;&gt;\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">上班未打卡</span>\n' +
    '                        &lt;!&ndash;<i class="icon ion-chevron-right"></i>&ndash;&gt;\n' +
    '                    </div>\n' +
    '                </li>-->\n' +
    '               <!-- <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-05 18:00</span>\n' +
    '                        &lt;!&ndash;<span class="glassname">国投白银风电</span>&ndash;&gt;\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">下班未打卡</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-08 18:00</span>\n' +
    '                        &lt;!&ndash;<span class="glassname">国投白银风电</span>&ndash;&gt;\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">下班未打卡</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-07 09:00</span>\n' +
    '                        &lt;!&ndash;<span class="glassname">国投白银风电</span>&ndash;&gt;\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">上班未打卡</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-07 18:00</span>\n' +
    '                        &lt;!&ndash;<span class="glassname">国投白银风电</span>&ndash;&gt;\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">下班未打卡</span>\n' +
    '                    </div>\n' +
    '                </li>-->\n' +
    '            <!--</ul>-->\n' +
    '\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/countAttence/wdkList/wdkList.tpl.html',
    '<ion-view class="wdkListCSS">\n' +
    '    <ion-nav-title>未打卡</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="content">\n' +
    '            <h3><span>{{dateTimeShow}}</span>未打卡<span>共{{personNum}}人</span></h3>\n' +
    '            <ul class="list">\n' +
    '                <li class="item item-icon-right" ng-click="towdkDetail(x)" ng-repeat="x in wdkList">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="name">{{x.PERSON_NAME}}</span>\n' +
    '                        <span class="glassname">{{partName}}</span>\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">{{x.COUNT}}次</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '               <!-- <li class="item item-icon-right" ng-click="towdkDetail()">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="name">王明霞</span>\n' +
    '                        <span class="glassname">国投白银风电</span>\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">12次</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item item-icon-right" ng-click="towdkDetail()">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="name">张小明</span>\n' +
    '                        <span class="glassname">国投白银风电</span>\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">2次</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </div>\n' +
    '                </li>-->\n' +
    '\n' +
    '            </ul>\n' +
    '\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/countAttence/zcList/zcList.tpl.html',
    '<ion-view class="cdListCSS">\n' +
    '    <ion-nav-title>正常</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="content">\n' +
    '            <h3><span>{{dateTimeShow}}</span>正常<span>共{{personNum}}人</span></h3>\n' +
    '            <ul class="list">\n' +
    '                <li class="item item-icon-right" ng-click="towdDetail(x)" ng-repeat="x in zcList">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="name">{{x.PERSON_NAME}}</span>\n' +
    '                        <span class="glassname">{{partName}}</span>\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">{{x.COUNT}}次</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/countAttence/ztDetail/ztDetail.tpl.html',
    '<ion-view class="wdkDetailCSS">\n' +
    '    <ion-nav-title>早退详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="content">\n' +
    '            <h3><span>2018年3月</span>李孝利<span>早退</span><span>共22分钟</span></h3>\n' +
    '            <ul class="list">\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-06</span>\n' +
    '                       <!-- <span class="glassname">国投白银风电</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">早退20分钟</span>\n' +
    '                        <!--<i class="icon ion-chevron-right"></i>-->\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-08</span>\n' +
    '                        <!--<span class="glassname">国投白银风电</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">早退18分钟</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-12</span>\n' +
    '                        <!--<span class="glassname">国投白银风电</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">早退35分钟</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-13</span>\n' +
    '                        <!--<span class="glassname">国投白银风电</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">早退20分钟</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="dateShow">2018-03-15</span>\n' +
    '                        <!--<span class="glassname">国投白银风电</span>-->\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">早退15分钟</span>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('attence/countAttence/ztList/ztList.tpl.html',
    '<ion-view class="cdListCSS">\n' +
    '    <ion-nav-title>早退</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="content">\n' +
    '            <h3><span>{{dateTimeShow}}</span>早退<span>共{{personNum}}人</span></h3>\n' +
    '            <ul class="list">\n' +
    '                <li class="item item-icon-right" ng-click="towdDetail(x)" ng-repeat="x in ztList">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="name">{{x.PERSON_NAME}}</span>\n' +
    '                        <span class="glassname">{{partName}}</span>\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">{{x.COUNT}}次</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <!--<li class="item item-icon-right" ng-click="toztDetail()">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="name">王明霞</span>\n' +
    '                        <span class="glassname">国投白银风电</span>\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">10次</span>\n' +
    '                        <span class="totalTime">254分钟</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </div>\n' +
    '                </li>\n' +
    '                <li class="item item-icon-right" ng-click="toztDetail()">\n' +
    '                    <div class="leftShow">\n' +
    '                        <span class="name">张小明</span>\n' +
    '                        <span class="glassname">国投白银风电</span>\n' +
    '                    </div>\n' +
    '                    <div class="rightShow">\n' +
    '                        <span class="item-note">2次</span>\n' +
    '                        <span class="totalTime">12分钟</span>\n' +
    '                        <i class="icon ion-chevron-right"></i>\n' +
    '                    </div>\n' +
    '                </li>-->\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('erp/select/user/user.tpl.html',
    '<ion-view class="erpCSS">\n' +
    '	<ion-nav-title>选择人员</ion-nav-title>\n' +
    '	<ion-content class="padding" has-header="true">\n' +
    '		<div class="card" ng-click="selectUser();">\n' +
    '			赵**\n' +
    '		</div>\n' +
    '		<div class="card" ng-click="selectUser();">\n' +
    '			钱**\n' +
    '		</div>\n' +
    '		<div class="card" ng-click="selectUser();">\n' +
    '			孙**\n' +
    '		</div>\n' +
    '		<div class="card" ng-click="selectUser();">\n' +
    '			李**\n' +
    '		</div>\n' +
    '		<div class="card" ng-click="selectUser();">\n' +
    '			周**\n' +
    '		</div>\n' +
    '		<div class="card" ng-click="selectUser();">\n' +
    '			吴**\n' +
    '		</div>\n' +
    '		<div class="card" ng-click="selectUser();">\n' +
    '			郑**\n' +
    '		</div>\n' +
    '		<div class="card" ng-click="selectUser();">\n' +
    '			王**\n' +
    '		</div>\n' +
    '	</ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('erp/details/tabs/document.tpl.html',
    '<div class="card">\n' +
    '    <div ng-repeat="item in MainTable[1] track by $index">{{item.fieldName}}：{{item.fieldText}}</div>\n' +
    '</div>\n' +
    '<div>\n' +
    '    <div ng-repeat="item in docList track by $index" class="card text">\n' +
    '        <a ng-click="downloadFile(item.FILE_URL);">{{item.USER_FILE_NAME}}</a>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('erp/details/tabs/line.tpl.html',
    '<div class="card">\n' +
    '    <div ng-repeat="item in MainTable[1] track by $index">{{item.fieldName}}：{{item.fieldText}}</div>\n' +
    '</div>\n' +
    '<div ng-repeat="view in ChildTable track by $index" class="marginTop">\n' +
    '    <div class="applyForLineHead">详情</div>\n' +
    '    <div class="applyForLine">\n' +
    '        <div ng-repeat="item in view track by $index" class="card text">\n' +
    '            <div ng-repeat="field in item track by $index">{{field.fieldName}}：{{field.fieldText}}</div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('erp/details/tabs/process.tpl.html',
    '<div class="card">\n' +
    '    <div ng-repeat="item in MainTable[1] track by $index">{{item.fieldName}}：{{item.fieldText}}</div>\n' +
    '</div>\n' +
    '<div>\n' +
    '    <div class="progress">\n' +
    '        <div ng-style="{flex: step.now}"></div>\n' +
    '        <div ng-style="{flex: (step.total - step.now)}"></div>\n' +
    '    </div>\n' +
    '    <div class="text-right">{{step.now}}/{{step.total}}</div>\n' +
    '</div>\n' +
    '<div>\n' +
    '    <div class="process" ng-repeat="item in step.list track by $index">\n' +
    '        <div class="left">\n' +
    '            <div class="imgBox">\n' +
    '                {{$index + 1}}\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="right">\n' +
    '            {{item.DESCRIPTION}}\n' +
    '            <div class="card">\n' +
    '                <table>\n' +
    '                    <tr>\n' +
    '                        <td>\n' +
    '                            <i class="icon {{item.NOTE == \'同意\' ? \'ion-checkmark-circled balanced\' : item.NOTE == \'拒绝\' ? \'ion-close-circled assertive\' : \'\'}}"></i>\n' +
    '                        </td>\n' +
    '                        <td>{{item.PERSON_NAME}}</td>\n' +
    '                        <td>{{item.APP_DATE}}</td>\n' +
    '                    </tr>\n' +
    '                    <tr>\n' +
    '                        <td></td>\n' +
    '                        <td>{{item.NOTE}}</td>\n' +
    '                        <td></td>\n' +
    '                    </tr>\n' +
    '                </table>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('erp/details/tabs/single.tpl.html',
    '<div class="card">\n' +
    '    <div ng-repeat="item in MainTable[0] track by $index">{{item.fieldName}}：{{item.fieldText}}</div>\n' +
    '</div>\n' +
    '<div ng-click="changeTypeIndex(\'审批流程\');">\n' +
    '    <div class="progress">\n' +
    '        <div ng-style="{flex: step.now}"></div>\n' +
    '        <div ng-style="{flex: (step.total - step.now)}"></div>\n' +
    '    </div>\n' +
    '    <div class="text-right">{{step.now}}/{{step.total}}</div>\n' +
    '</div>\n' +
    '<div ng-if="docList.length > 0" class="document" ng-click="changeTypeIndex(\'文档\');">文档（{{docList.length}}）</div>\n' +
    '<div class="card" ng-if="showType == \'approve\'">\n' +
    '    <textarea ng-model="data.opinion" rows="5" placeholder="请输入审批意见..."></textarea>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OSI/OSIcount/OSIDepartmentEquipment/OSIDepartmentEquipment.tpl.html',
    '<ion-view class="OSIcountCSS">\n' +
    '	<ion-nav-title>巡查统计</ion-nav-title>\n' +
    '	<ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '		<div class="title">\n' +
    '			<span>\n' +
    '                <button class="leftSelect" ng-click="changeDateTime(\'departmentStart\', -1, null, date.departmentEnd);"></button>\n' +
    '                {{date.departmentStart}}\n' +
    '                <button class="rightSelect" ng-click="changeDateTime(\'departmentStart\', 1, null, date.departmentEnd);"></button>\n' +
    '            </span>\n' +
    '			<span>\n' +
    '                <button class="leftSelect" ng-click="changeDateTime(\'departmentEnd\', -1, date.departmentStart, date.now);"></button>\n' +
    '                {{date.departmentEnd}}\n' +
    '                <button class="rightSelect" ng-click="changeDateTime(\'departmentEnd\', 1, date.departmentStart, date.now);"></button>\n' +
    '            </span>\n' +
    '			<div></div>\n' +
    '			<span>{{data.ORG_NAME}}</span>\n' +
    '		</div>\n' +
    '		<div class="tips"><span>说明: 当前区间「计划/实际/计划外」巡查次数，「计划/实际」百分比。</span></div>\n' +
    '		<div class="list">\n' +
    '			<div class="card" ng-repeat="item in list" ng-click="openDepartmentEquipmentPersonnel(item);">\n' +
    '				<span class="flex3">{{item.MCH_NAME}}</span>\n' +
    '				<span>{{item.PLAN_INSPECT}}/{{item.PLAN_INSPECTED}}/{{item.OUT_PLAN_INSPECTED}}</span>\n' +
    '				<span>{{item.percentage}}%</span>\n' +
    '			</div>\n' +
    '			<ion-infinite-scroll ng-if="hasMore" on-infinite="getInspectStatisticalData();" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '		</div>\n' +
    '	</ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OSI/OSIcount/OSIDepartmentEquipmentPersonnel/OSIDepartmentEquipmentPersonnel.tpl.html',
    '<ion-view class="OSIcountCSS">\n' +
    '	<ion-nav-title>巡查统计</ion-nav-title>\n' +
    '	<ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '		<div class="title">\n' +
    '			<span>\n' +
    '                <button class="leftSelect" ng-click="changeDateTime(\'departmentStart\', -1, null, date.departmentEnd);"></button>\n' +
    '                {{date.departmentStart}}\n' +
    '                <button class="rightSelect" ng-click="changeDateTime(\'departmentStart\', 1, null, date.departmentEnd);"></button>\n' +
    '            </span>\n' +
    '			<span>\n' +
    '                <button class="leftSelect" ng-click="changeDateTime(\'departmentEnd\', -1, date.departmentStart, date.now);"></button>\n' +
    '                {{date.departmentEnd}}\n' +
    '                <button class="rightSelect" ng-click="changeDateTime(\'departmentEnd\', 1, date.departmentStart, date.now);"></button>\n' +
    '            </span>\n' +
    '			<div></div>\n' +
    '			<span>{{data.ORG_NAME}}</span>\n' +
    '		</div>\n' +
    '		<div class="tips"><span>说明: 当前区间「计划/实际/计划外」巡查次数，「计划/实际」百分比。</span></div>\n' +
    '		<div class="list">\n' +
    '			<div class="card">\n' +
    '				<span>{{data.MCH_CODE}}</span>\n' +
    '				<span>{{data.MCH_NAME}}</span>\n' +
    '			</div>\n' +
    '			<div class="card" ng-repeat="item in list" ng-click="openRecord(item);">\n' +
    '				<span>{{item.PERSON_NAME}}</span>\n' +
    '				<span>{{item.PLAN_INSPECT}}/{{item.PLAN_INSPECTED}}/{{item.OUT_PLAN_INSPECTED}}</span>\n' +
    '				<span>{{item.percentage}}%</span>\n' +
    '			</div>\n' +
    '			<ion-infinite-scroll ng-if="hasMore" on-infinite="getInspectStatisticalData();" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '		</div>\n' +
    '	</ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OSI/OSIcount/OSIPersonnelEquipment/OSIPersonnelEquipment.tpl.html',
    '<ion-view class="OSIcountCSS">\n' +
    '	<ion-nav-title>巡查统计</ion-nav-title>\n' +
    '	<ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '		<div class="title">\n' +
    '			<span>\n' +
    '				<button class="leftSelect" ng-click="changeDateTime(\'personalStart\', -1, null, date.personalEnd);"></button>\n' +
    '				{{date.personalStart}}\n' +
    '				<button class="rightSelect" ng-click="changeDateTime(\'personalStart\', 1, null, date.personalEnd);"></button>\n' +
    '			</span>\n' +
    '			<span>\n' +
    '				<button class="leftSelect" ng-click="changeDateTime(\'personalEnd\', -1, date.personalStart, date.now);"></button>\n' +
    '				{{date.personalEnd}}\n' +
    '				<button class="rightSelect" ng-click="changeDateTime(\'personalEnd\', 1, date.personalStart, date.now);"></button>\n' +
    '			</span>\n' +
    '			<div></div>\n' +
    '			<span>{{data.PERSON_NAME}}<br/>{{data.ORG_NAME}}</span>\n' +
    '		</div>\n' +
    '		<div class="tips"><span>说明: 当前区间「计划/实际/计划外」巡查次数，「计划/实际」百分比。</span></div>\n' +
    '		<div class="list">\n' +
    '			<div class="card" ng-repeat="item in list" ng-click="openRecord(item);">\n' +
    '				<span class="flex3">{{item.MCH_NAME}}</span>\n' +
    '				<span>{{item.PLAN_INSPECT}}/{{item.PLAN_INSPECTED}}/{{item.OUT_PLAN_INSPECTED}}</span>\n' +
    '				<span>{{item.percentage}}%</span>\n' +
    '			</div>\n' +
    '			<ion-infinite-scroll ng-if="hasMore" on-infinite="getInspectStatisticalData();" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '		</div>\n' +
    '	</ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('OSI/OSIcount/OSIDepartmentPersonnel/OSIDepartmentPersonnel.tpl.html',
    '<ion-view class="OSIcountCSS">\n' +
    '	<ion-nav-title>巡查统计</ion-nav-title>\n' +
    '	<ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '		<div class="title">\n' +
    '			<span>\n' +
    '                <button class="leftSelect" ng-click="changeDateTime(\'departmentStart\', -1, null, date.departmentEnd);"></button>\n' +
    '                {{date.departmentStart}}\n' +
    '                <button class="rightSelect" ng-click="changeDateTime(\'departmentStart\', 1, null, date.departmentEnd);"></button>\n' +
    '            </span>\n' +
    '			<span>\n' +
    '                <button class="leftSelect" ng-click="changeDateTime(\'departmentEnd\', -1, date.departmentStart, date.now);"></button>\n' +
    '                {{date.departmentEnd}}\n' +
    '                <button class="rightSelect" ng-click="changeDateTime(\'departmentEnd\', 1, date.departmentStart, date.now);"></button>\n' +
    '            </span>\n' +
    '			<div></div>\n' +
    '			<span>{{data.ORG_NAME}}</span>\n' +
    '		</div>\n' +
    '		<div class="tips"><span>说明: 当前区间「计划/实际/计划外」巡查次数，「计划/实际」百分比。</span></div>\n' +
    '		<div class="list">\n' +
    '			<div class="card" ng-repeat="item in list" ng-click="openRecord(item);">\n' +
    '				<span>{{item.PERSON_NAME}}</span>\n' +
    '				<span>{{item.PLAN_INSPECT}}/{{item.PLAN_INSPECTED}}/{{item.OUT_PLAN_INSPECTED}}</span>\n' +
    '				<span>{{item.percentage}}%</span>\n' +
    '			</div>\n' +
    '			<ion-infinite-scroll ng-if="hasMore" on-infinite="getInspectStatisticalData();" distance="10%" immediate-check="false"></ion-infinite-scroll>\n' +
    '		</div>\n' +
    '	</ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pm/defectFill/adddefectFill/adddefectFill.tpl.html',
    '<ion-view class="adddefectfillCSS">\n' +
    '    <ion-nav-title>添加缺陷</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="firstShow">\n' +
    '            <div class="defectifll">\n' +
    '                <ul>\n' +
    '                    <li style="color:#3492e9">电站:{{CONTRACT_NAME}}<em>部门：{{DEPT_NAME}}</em></li>\n' +
    '                    <li>创建人:{{UserName}}<em>创建日期:{{nowDate}}</em></li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '            <div class="addTroubleForm">\n' +
    '                <div class="list">\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label">缺陷名称：</span>\n' +
    '                        <input type="text" id="ERR_DESCR" placeholder="请输入缺陷名称">\n' +
    '                    </label>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label">设备状态：</span>\n' +
    '                        <input type="text" id="sbztid" class="rightselect" readonly placeholder="请选择设备状态"\n' +
    '                               ng-click="toSbzt()">\n' +
    '                    </label>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label">缺陷分类：</span>\n' +
    '                        <input type="text" id="qxflid" class="rightselect" readonly placeholder="请选择缺陷分类"\n' +
    '                               ng-click="toQxfl()">\n' +
    '                    </label>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label">缺陷专业：</span>\n' +
    '                        <input type="text" id="qxzyid" class="rightselect" readonly placeholder="请选缺陷专业"\n' +
    '                               ng-click="toQxzy()">\n' +
    '                    </label>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label">设备编码：</span>\n' +
    '                        <input type="text" id="sbcodeid" class="smewm" placeholder="扫描设备编码" readonly ng-click="scanStart()">\n' +
    '                    </label>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label">设备名称：</span>\n' +
    '                        <input type="text" placeholder="设备名称" id="sbmcValue" class="sbmc" readonly ng-click="selectSb()">\n' +
    '\n' +
    '                    </label>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label">执行部门：</span>\n' +
    '                        <input type="text" placeholder="请选择部门" id="zxbmid" class="rightselect" readonly ng-click="toZxbm()">\n' +
    '                    </label>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label">现象：</span>\n' +
    '                        <input type="text" placeholder="请选择现象" id="xianxid" class="rightselect" readonly ng-click="toXianx()">\n' +
    '                    </label>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label">缺陷描述：</span>\n' +
    '                        <textarea id="qxmsid"></textarea>\n' +
    '                    </label>\n' +
    '\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label">上传文件：</span>\n' +
    '                        <div class="uploadimgShow">\n' +
    '                            <button ng-src="{{uploadimageSrc}}" ng-click="toUploadImg()"></button>\n' +
    '                        </div>\n' +
    '                        <i>此处最多添加三张图片</i>\n' +
    '                    </label>\n' +
    '                    <div class="imglist" ng-repeat="img in images_list|limitTo:3 track by $index">\n' +
    '                        <img id="timage{{$index}}" src="{{img}}" class="col col-33">\n' +
    '                        <button class="deleteBtn" ng-if="img" ng-click="img_del($index)">X</button>\n' +
    '                    </div>\n' +
    '                    <!--<div class="imglist">\n' +
    '                        <img src="../../../../images/PM/sbxx_img_icon.png" class="col col-30">\n' +
    '                        <button class="deleteBtn">X</button>\n' +
    '                    </div>\n' +
    '                    <div class="imglist">\n' +
    '                        <img src="../../../../images/PM/sbxx_img_icon.png" class="col col-30">\n' +
    '                        <button class="deleteBtn">X</button>\n' +
    '                    </div>\n' +
    '                    <div class="imglist">\n' +
    '                        <img src="../../../../images/PM/sbxx_img_icon.png" class="col col-30">\n' +
    '                        <button class="deleteBtn">X</button>\n' +
    '                    </div>-->\n' +
    '                </div>\n' +
    '                <div class="padding">\n' +
    '                    <button class="button button-block button-positive" ng-click="commitdefectfill()">添加</button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="bg" ng-click="hideSearch()"></div>\n' +
    '        <div class="sliderightShow" style="display: none; width: 95%; max-height: 100%;">\n' +
    '            <label class="item item-input">\n' +
    '                <span class="input-label">设备编码：</span>\n' +
    '                <input type="text" id="sbbmid" placeholder="请输入设备编码">\n' +
    '            </label>\n' +
    '            <label class="item item-input">\n' +
    '                <span class="input-label">设备名称：</span>\n' +
    '                <input type="text" id="sbmcid" placeholder="请输入设备名称">\n' +
    '            </label>\n' +
    '            <div class="padding">\n' +
    '                <button class="searchSbBtn button button-block button-positive" ng-click="searchSblist()">查询</button>\n' +
    '            </div>\n' +
    '            <div class="sblist">\n' +
    '                <table>\n' +
    '                    <tr>\n' +
    '                        <th>设备编码</th>\n' +
    '                        <th>设备名称</th>\n' +
    '                    </tr>\n' +
    '                    <tr ng-repeat="x in sbxx" ng-click="toSbmx(x)">\n' +
    '                        <td>{{x.MCH_CODE}}</td>\n' +
    '                        <td>{{x.MCH_NAME}}</td>\n' +
    '                    </tr>\n' +
    '\n' +
    '                </table>\n' +
    '                <ion-infinite-scroll ng-if="hasMore" on-infinite="loadMore()" distance="10%" immediate-check="false">\n' +
    '                </ion-infinite-scroll>\n' +
    '            </div>\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pm/defectFill/defectFill/defectFill.tpl.html',
    '<ion-view class="defectFillCSS">\n' +
    '    <ion-nav-title>缺陷填报</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button-icon icon ion-addyh" ng-click="addTrouble()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" on-drag-down="onDragDown()">\n' +
    '        <div class="troubleTop">\n' +
    '            <ul>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" aria-label="状态：" id="_label-0">状态：</span>\n' +
    '                        <input type="text" class="rightselect" id="statusid" readonly="" placeholder="请选择状态"\n' +
    '                               ng-click="toSelectStatus()">\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" aria-label="域：" id="_label-1">域：</span>\n' +
    '                        <input type="text" class="rightselect" id="defectYuId" readonly="" placeholder="请选择域"\n' +
    '                               ng-click="toSelectYu()">\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <button class="commitBtn" ng-click="searchDefect()">查询</button>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <!--<div class="selectStuts">\n' +
    '                <select class="rightShow" id="selectedOption" ng-change="toSelectStatus()" ng-model="statusModel">\n' +
    '                    <option value="{{$index}}" ng-repeat="t in status" ng-selected="$index==0">{{t}}</option>\n' +
    '                </select>\n' +
    '            </div>\n' +
    '            <div class="search">\n' +
    '                <select id="selectedYu" class="yuShow" ng-style="yuWidth" ng-change="toSelectYu()" ng-model="yumodel">\n' +
    '                    <option value="{{$index}}" ng-repeat="x in yuList track by $index" ng-selected="$index==0">{{x.DESCRIPTION}}\n' +
    '                    </option>\n' +
    '                </select>\n' +
    '            </div>-->\n' +
    '        </div>\n' +
    '        <div class="troubleList">\n' +
    '            <div class="content ionic-pseudo">\n' +
    '                <div class="list" ng-repeat="x in defectArr">\n' +
    '                    <a class="item item-avatar" href="#" ng-click="toDetail(x)">\n' +
    '                        <div class="numstatus"><i class="jiicon" ng-style="statusColor(x.QX_TYPE)">{{x.QX_TYPE | limitTo\n' +
    '                            : 1}}</i></div>\n' +
    '                        <div class="titleDes">{{(x.ERR_DESCR).length>20 ? (x.ERR_DESCR | limitTo:20)+\'...\' :\n' +
    '                            (x.ERR_DESCR)}}<em class="ji">{{x.STATE}}</em></div>\n' +
    '                        <div class="author">{{x.REPORTED_BY_ID}}<em>{{x.REG_DATE | limitTo:10}}</em></div>\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <ion-infinite-scroll ng-if="hasMore" on-infinite="loadMore()" distance="10%" immediate-check="false">\n' +
    '        </ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pm/defectFill/defectFillDetail/defectFillDetail.tpl.html',
    '<ion-view class="defectFillDetailCSS">\n' +
    '    <ion-nav-title>缺陷详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="detail" ng-hide="defectdetail">\n' +
    '            <ul>\n' +
    '                <li class="bhnum">编号：{{defectDetail.FAULT_REP_ID}}<em class="status">{{defectDetail.STATE}}</em></li>\n' +
    '                <li class="dzname">电站：{{defectDetail.CONTRACT}}</li>\n' +
    '                <li class="jhtime">计划开始时间：{{defectDetail.REQUIRED_START_DATE | limitTo:10}}<em>计划完成时间：{{defectDetail.REQUIRED_END_DATE | limitTo:10}}</em></li>\n' +
    '                <li class="wgtime">实际完成时间：{{defectDetail.REAL_END_DATE | limitTo:10}}</li>\n' +
    '                <li class="faperson">发现人：{{defectDetail.REPORTED_BY_ID}}<em>发现时间：{{defectDetail.REG_DATE | limitTo:10}}</em></li>\n' +
    '                <li class="sbbm">设备编码：{{defectDetail.MCH_CODE}}</li>\n' +
    '                <li class="sbmc">设备名称：{{defectDetail.MCH_NAME}}</li>\n' +
    '                <li class="zxbm">执行部门：{{defectDetail.ORG_CODE}}<em>现象：{{defectDetail.ERR_SYMPTOM}}</em></li>\n' +
    '                <li class="qxfl">缺陷分类：<i style="color: #ff0000">{{defectDetail.QX_TYPE}}</i><em>缺陷专业：{{defectDetail.FAULT_DEPARTMENT}}</em></li>\n' +
    '                <li class="qxname">\n' +
    '                    缺陷名称:<i style="color:#999">{{defectDetail.ERR_DESCR}}</i>\n' +
    '                </li>\n' +
    '                <li class="content">\n' +
    '                    缺陷描述:\n' +
    '                    <div class="" style="color:#999">{{defectDetail.ERR_DESCR_LO}}</div>\n' +
    '                </li>\n' +
    '                <li class="qxzfyy">\n' +
    '                    缺陷作废原因：{{defectDetail.FAULT_CANCEL_DESC}}\n' +
    '                </li>\n' +
    '                <li class="qxzfyy">\n' +
    '                    缺陷遗留原因：{{defectDetail.FAULT_LEAVE_DESC}}\n' +
    '                </li>\n' +
    '                <li class="qxzfyy">\n' +
    '                    缺陷验收情况：{{defectDetail.FAULT_ACCEPTANCE}}\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <div class="content" ng-show="isShow">\n' +
    '                <div ng-repeat="detail in docList track by $index">\n' +
    '                    <div class="imgShow"> <a ng-show="detail.isImage==\'1\'"><img src="{{detail.FILE_URL}}"></a></div>\n' +
    '                    <a href="{{detail.FILE_URL}}" ng-hide="detail.isImage==\'1\'"><i >{{detail.FILE_NAME}}</i> </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pm/journal/journalDetailList/journalDetailList.tpl.html',
    '<ion-view class="journalDetailListCSS">\n' +
    '    <ion-nav-title>{{objCenter.CONTRACT}}</ion-nav-title>\n' +
    '    <ion-tabs class="tabs-icon-only tabs-positive tabs-top mortgagetab">\n' +
    '        <ion-tab title="运行日志" ng-click="toYxrzData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="yxrzList" ng-hide="myDiv">\n' +
    '                    <ul>\n' +
    '                        <li>\n' +
    '                            <div class="jlxx">\n' +
    '                                <span>记录人：{{objCenter.RECORD_PERSON}}<em>班次：{{objCenter.WORK_SEQ}}</em></span>\n' +
    '                                <!--<span class="bcxx">班次：{{objCenter.WORK_SEQ}}</span>-->\n' +
    '                            </div>\n' +
    '                            <div class="jlcontent">\n' +
    '                                <ul ng-repeat="x in listcenter1">\n' +
    '                                    <li>\n' +
    '                                        记录时间：{{x.RECORD_DATE | limitTo:10}}\n' +
    '                                    </li>\n' +
    '                                    <li>\n' +
    '                                        记录内容：{{x.CONTENT}}\n' +
    '                                    </li>\n' +
    '                                    <li>\n' +
    '                                        备注：{{x.REMARK}}\n' +
    '                                    </li>\n' +
    '                                </ul>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="运行方式" ng-click="toYxfsData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="yxfsList">\n' +
    '                    <ul ng-repeat="x in listcenter2">\n' +
    '                        <li>\n' +
    '                            <div class="xtname">系统名称：{{x.SYSTEM_NAME}}</div>\n' +
    '                            <div class="dzfs">\n' +
    '                                <ul>\n' +
    '                                    <li ng-show="x.PROJECT_SITE1">捡财塘风电:{{x.PROJECT_SITE1}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE2">酒一:{{x.PROJECT_SITE2}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE3">酒二:{{x.PROJECT_SITE3}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE4">敦煌光伏:{{x.PROJECT_SITE4}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE5">石嘴山光伏:{{x.PROJECT_SITE5}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE6">格尔木光伏:{{x.PROJECT_SITE6}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE7">贝克梁诺木洪风电:{{x.PROJECT_SITE7}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE8">三塘湖:{{x.PROJECT_SITE8}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE9">淖毛湖:{{x.PROJECT_SITE9}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE10">景峡风电:{{x.PROJECT_SITE10}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE11">烟墩风电:{{x.PROJECT_SITE11}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE12">景峡光伏:{{x.PROJECT_SITE12}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE13">小草湖:{{x.PROJECT_SITE13}}</li>\n' +
    '                                    <li ng-show="x.PROJECT_SITE14">宁夏风电:{{x.PROJECT_SITE14}}</li>\n' +
    '                                </ul>\n' +
    '                            </div>\n' +
    '                            <div class="bzcontent">备注：{{x.REMARK}}\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="交接班" ng-click="toJjbData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="jjbList">\n' +
    '                    <ul ng-repeat="x in listcenter3">\n' +
    '                        <li>\n' +
    '                            <div class="jiaobanxx">\n' +
    '                                <span class="bzcontent">备注:{{x.REMARK}}</span>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="接地线" ng-click="toJdxData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="jdxList">\n' +
    '                    <ul ng-repeat="x in listcenter4">\n' +
    '                        <li>\n' +
    '                            <div class="yuname">编号：{{x.GROUND_LINE_NO}}</div>\n' +
    '                            <div class="zsxxShow">装设地点：{{x.RECORD_AREA}}<em>装设时间：{{x.RECORD_DATE}}</em></div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '\n' +
    '    </ion-tabs>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pm/journal/journalDetail/journalDetail.tpl.html',
    '<ion-view class="journalDetailCSS">\n' +
    '    <ion-nav-title>{{obj.CNAME}}</ion-nav-title>\n' +
    '    <ion-tabs class="tabs-icon-only tabs-positive tabs-top mortgagetab">\n' +
    '        <ion-tab title="运行日志" ng-click="toYxrzData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="yxrzList">\n' +
    '                    <ul ng-repeat="x in list1">\n' +
    '                        <li>\n' +
    '                            <div class="jlxx">\n' +
    '                                <span><em>记录时间：{{x.RECORD_DATE | limitTo:10}}</em></span>\n' +
    '                            </div>\n' +
    '                            <div class="jlcontent">\n' +
    '                                <ul>\n' +
    '                                    <li>\n' +
    '                                        记录内容：{{x.CONTENT}}\n' +
    '                                    </li>\n' +
    '                                </ul>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '                <div style="height:10px"></div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="运行方式" ng-click="toYxfsData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="yxfsList">\n' +
    '                    <ul ng-repeat="x in list2">\n' +
    '                        <li>\n' +
    '                            <div class="xtname">系统名称：{{x.OPE_MODE_PARA}}<em>运行方式：{{x.OPE_MODE_PARA_KEY}}</em>\n' +
    '                            </div>\n' +
    '                            <div class="bzcontent">备注：{{x.REMARK}}\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="交接班" ng-click="toJjbData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="jjbList">\n' +
    '                    <ul ng-repeat="x in list3">\n' +
    '                        <li>\n' +
    '                            <div class="yuname"></div>\n' +
    '                            <div class="jiaobanxx">\n' +
    '                                <span class="jiaobanrname">交班人:{{x.HAND_OVER_PERSON_NAME}}</span>\n' +
    '                                <span class="jiaobanjl">交班记录：{{x.REMARK}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="jiebanxx">\n' +
    '                                <span class="jiebanrname">接班人：{{x.TAKE_OVER_PERSON_NAME}}<em class="jiebantime">接班时间:{{x.TAKE_OVER_TIME}}</em> </span>\n' +
    '                                <span class="jiebanjl">接班记录：{{x.OPINION}}</span>\n' +
    '                            </div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '        <ion-tab title="接地线" ng-click="toJdxData()">\n' +
    '            <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '                <div class="jdxList">\n' +
    '                    <ul ng-repeat="x in list4">\n' +
    '                        <li>\n' +
    '                            <div class="yuname">编号：{{x.GROUND_WIRE_N_O}}</div>\n' +
    '                            <div class="zsxxShow">装设地点：{{x.CONTENT}}<em>装设时间：{{x.REGISTER_DATE}}</em></div>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </ion-content>\n' +
    '        </ion-tab>\n' +
    '\n' +
    '    </ion-tabs>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pm/journal/journalList/journalList.tpl.html',
    '<ion-view class="journalListCSS">\n' +
    '    <ion-nav-title>日志</ion-nav-title>\n' +
    '    <!--<ion-nav-buttons side="right">\n' +
    '        <button class="button-icon icon ion-lsrz" ng-click="tohistoryJournal()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>-->\n' +
    '    <ion-content>\n' +
    '        <div class="journal">\n' +
    '            <div class="journalForm">\n' +
    '                <ul>\n' +
    '                    <li><label>日期</label>\n' +
    '                        <!--<input placeholder="请选择日期" readonly>-->\n' +
    '                        <input class="selectdate" ng-change="dateChangeEvent()" ng-model="value" type="text" name="select_date" id="select_date_please" class="selectDateicon" placeholder="选择开始日期" readonly="readonly" />\n' +
    '                        <!--<span><i class="selectDateicon"></i></span>-->\n' +
    '                    </li>\n' +
    '                    <li><label>班次</label>\n' +
    '                        <input id="selectclass" class="selectclass" placeholder="请选择班次" readonly ng-click="toSelectClass()">\n' +
    '                    </li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '            <div class="journalList">\n' +
    '                <ul ng-hide="flag2" ng-style="getBackground(color)">\n' +
    '                    <li>\n' +
    '                        <div class="journalDes" ng-click="toDetailListCenter(x)" ng-repeat="x in journal2 track by $index">\n' +
    '                            <div class="journalxx" ng-show="$index==0">\n' +
    '                                <span>电站：{{x.CONTRACT}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="journalcontent">\n' +
    '                                <ul>\n' +
    '                                    <li>\n' +
    '                                        <span>班次：{{x.WORK_SEQ}}</span>\n' +
    '                                        <span class="rightShow">值别：{{x.OPER_GROUP}}</span>\n' +
    '                                    </li>\n' +
    '                                    <li>\n' +
    '                                        <span>记录人：{{x.RECORD_PERSON}}</span>\n' +
    '                                        <span class="rightShow">日志类别：{{x.OPELOG_TYPE}}</span>\n' +
    '                                    </li>\n' +
    '                                </ul>\n' +
    '\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '\n' +
    '                </ul>\n' +
    '                <ul ng-hide="flag" ng-style="getBackground(color)">\n' +
    '                    <li>\n' +
    '                        <div class="journalDes" ng-click="toDetailList(x)" ng-repeat="x in journal">\n' +
    '                            <div class="journalxx" ng-hide="x.CONTRACT==\'\'">\n' +
    '                                <span>电站：{{x.CONTRACT}}</span>\n' +
    '                            </div>\n' +
    '                            <div class="journalcontent">\n' +
    '                                <ul>\n' +
    '                                    <li>\n' +
    '                                        <span>班次：{{x.WORK_SEQ}}</span>\n' +
    '                                        <span class="rightShow">值别：{{x.OPER_GROUP}}</span>\n' +
    '                                    </li>\n' +
    '                                    <li>\n' +
    '                                        <span>记录人：{{x.RECORD_PERSON}}</span>\n' +
    '                                        <span class="rightShow">日志类别：{{x.OPELOG_TYPE}}</span>\n' +
    '                                    </li>\n' +
    '                                </ul>\n' +
    '\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('Problems/ProblemSolving/Tracking/Tracking.tpl.html',
    '<ion-view class="tracking">\n' +
    ' <ion-nav-title>跟踪详情</ion-nav-title>\n' +
    ' <ion-content class="trackingCss">\n' +
    '  <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()"></ion-refresher>\n' +
    '    <div class="listCss">\n' +
    '      <div class="">提交人：</div>\n' +
    '     <div>{{}}</div>\n' +
    '    </div>\n' +
    '    <div class="listCss">\n' +
    '      <div class="">提交时间：</div>\n' +
    '     <div>{{}}</div>\n' +
    '    </div>\n' +
    '    <div class="listCss">\n' +
    '      <div class="">描述：</div>\n' +
    '     <div>{{}}</div>\n' +
    '    </div>\n' +
    '    <div class="line1"></div>\n' +
    '   \n' +
    '        <div class="listCss">\n' +
    '      <div class="">处理人：</div>\n' +
    '     <div>{{}}</div>\n' +
    '    </div>\n' +
    '       <div class="listCss">\n' +
    '          <div class="">处理时间：</div>\n' +
    '          <div>{{}}</div>\n' +
    '       </div>\n' +
    '       <div class="listCss">\n' +
    '         <div class="">意见：</div>\n' +
    '         <div>{{}}</div>\n' +
    '       </div>\n' +
    '       <div class="listCss">\n' +
    '         <div class="">处理顺序：</div>\n' +
    '         <div>{{}}</div>\n' +
    '       </div>\n' +
    '\n' +
    '        <div class="line1"></div>\n' +
    '\n' +
    '    \n' +
    '    \n' +
    '      <ion-infinite-scroll ng-if="hasMore" on-infinite="loadMore()" distance="1%"\n' +
    '       immediate-check="false">\n' +
    '      </ion-infinite-scroll>\n' +
    ' </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pm/trouble/addTrouble/addTrouble.tpl.html',
    '<ion-view class="addTroubleCSS">\n' +
    '    <ion-nav-title>添加隐患</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="addTroubleForm">\n' +
    '            <div class="troubleShow">\n' +
    '                <ul>\n' +
    '                    <li style="color:#3492e9">电站:{{CONTRACT_NAME}}<em>部门：{{DEPT_NAME}}</em></li>\n' +
    '                    <li>创建人:{{UserName}}<em>创建日期:{{nowDate}}</em></li>\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '            <div class="list">\n' +
    '                <label class="item item-input">\n' +
    '                    <span class="input-label">隐患等级：</span>\n' +
    '                    <input type="text" value="" class="rightselect" id="dengjiid"\n' +
    '                           placeholder="请选择隐患等级"\n' +
    '                           ng-click="toTroubleStyle()" ng-model="dangerLevel" readonly>\n' +
    '                </label>\n' +
    '                <label class="item item-input">\n' +
    '                    <span class="input-label">隐患内容：</span>\n' +
    '                    <textarea id="DANGER_CONTENT"></textarea>\n' +
    '                </label>\n' +
    '                <label class="item item-input">\n' +
    '                    <span class="input-label">上传文件：</span>\n' +
    '                    <div class="uploadimgShow">\n' +
    '                        <button ng-src="{{uploadimageSrc}}" ng-click="toUploadImg()"></button>\n' +
    '                    </div>\n' +
    '                    <i>此处最多添加三张图片</i>\n' +
    '                </label>\n' +
    '                <div class="imglist" ng-repeat="img in images_list|limitTo:3 track by $index">\n' +
    '                    <img id="timage{{$index}}" src="{{img}}" class="col col-33">\n' +
    '                    <button class="deleteBtn" ng-if="img" ng-click="img_del($index)">X</button>\n' +
    '                </div>\n' +
    '                <!--<div class="imglist">\n' +
    '                    <img src="../../../../images/PM/sbxx_img_icon.png" class="col col-30">\n' +
    '                    <button class="deleteBtn">X</button>\n' +
    '                </div>\n' +
    '                <div class="imglist">\n' +
    '                    <img src="../../../../images/PM/sbxx_img_icon.png" class="col col-30">\n' +
    '                    <button class="deleteBtn">X</button>\n' +
    '                </div>\n' +
    '                <div class="imglist">\n' +
    '                    <img src="../../../../images/PM/sbxx_img_icon.png" class="col col-30">\n' +
    '                    <button class="deleteBtn">X</button>\n' +
    '                </div>-->\n' +
    '            </div>\n' +
    '            <div class="padding">\n' +
    '                <button class="button button-block button-positive" ng-click="commitTrouble()">添加</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pm/trouble/hideTrouble/hideTrouble.tpl.html',
    '<ion-view class="hideTroubleCSS">\n' +
    '    <ion-nav-title>隐患排查</ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button-icon icon ion-addyh" ng-click="addTrouble()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" on-drag-down="onDragDown()">\n' +
    '        <div class="searchTrouble">\n' +
    '            <ul>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" aria-label="域：" id="_label-0">域：</span>\n' +
    '                        <input type="text" class="rightselect" id="yuid" readonly placeholder="请选择域" ng-click="toSelectYu()">\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" aria-label="状态：" id="_label-1">状态：</span>\n' +
    '                        <input type="text" id="stutsid" class="rightselect" readonly placeholder="请选择状态" ng-click="toSelectStuts()">\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" aria-label="起始时间：" id="_label2">起始时间：</span>\n' +
    '                        <input type="text" name="start_date" id="start_date" onfocus="this.blur()" class="rightselect" placeholder="请选择开始日期" readonly="readonly" />\n' +
    '                        <div id="dtBox"></div>\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" aria-label="结束时间：" id="_label-3">结束时间：</span>\n' +
    '                        <input type="text" name="end_date" id="end_date" class="rightselect"\n' +
    '                               placeholder="请选择结束日期" onfocus="this.blur()" readonly="readonly" />\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <label class="item item-input">\n' +
    '                        <span class="input-label" aria-label="隐患等级：" id="_label-4">隐患等级：</span>\n' +
    '                        <input type="text" id="yhdjid" class="rightselect" readonly placeholder="请选择隐患等级" ng-click="toSelectYhdj()">\n' +
    '                    </label>\n' +
    '                </li>\n' +
    '                <li>\n' +
    '                    <button class="commitBtn" ng-click="toCommit()">查询</button>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div>\n' +
    '        <div class="troubleList" style="display:none">\n' +
    '            <div class="content ionic-pseudo">\n' +
    '                <div class="list">\n' +
    '                    <a class="item item-avatar" href="#" ng-click="toDetail(x)"\n' +
    '                       ng-repeat="x in troubleList track by $index">\n' +
    '                        <!--<div class="numstatus"><i class="jiicon" ng-style="setbgColor(x.DANGER_LEVEL)">1</i></div>-->\n' +
    '                        <div class="titleDes">{{x.DANGER_CONTENT}}</div>\n' +
    '                        <div class="author">{{x.CONTRACT_NAME}}<em class="" ng-style="setColor(x.DANGER_LEVEL)">{{x.DANGER_LEVEL\n' +
    '                            | limitTo:2}}</em></div>\n' +
    '                        <div class="fxtime">{{x.STATE}}<em>{{x.DISCOVER_TIME | limitTo:10}}</em></div>\n' +
    '                   </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <ion-infinite-scroll ng-if="hasMore" on-infinite="loadMore()" distance="10%" immediate-check="false">\n' +
    '        </ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pm/trouble/troubleDetail/troubleDetail.tpl.html',
    '<ion-view class="troubleDetailCSS">\n' +
    '    <ion-nav-title>隐患详情</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="detail">\n' +
    '            <div class="yushow">电站：{{title.CONTRACT_NAME}}</div>\n' +
    '            <div class="status">隐患等级：<i ng-style="setColor(title.DANGER_LEVEL)">{{title.DANGER_LEVEL}}</i><em>状态：{{title.STATE}}</em></div>\n' +
    '            <div class="author">发现人：{{title.DISCOVER_USER}}<em class="date">发现时间：{{title.DISCOVER_TIME | limitTo:10}}</em></div>\n' +
    '            <div class="content">\n' +
    '                {{title.DANGER_CONTENT}}\n' +
    '            </div>\n' +
    '            <div class="content" ng-show="isShow">\n' +
    '               <div ng-repeat="detail in docList track by $index">\n' +
    '                   <div class="imgShow"> <a ng-show="detail.isImage==\'1\'"><img src="{{detail.FILE_URL}}"></a></div>\n' +
    '                   <a href="{{detail.FILE_URL}}" ng-hide="detail.isImage==\'1\'"><i >{{detail.FILE_NAME}}</i> </a>\n' +
    '               </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/groupDetail/groupDetail.tpl.html',
    '<ion-view class="messageDetailCSS">\n' +
    '    <ion-nav-title>\n' +
    '        {{groupInfo.groupName?groupInfo.groupName:groupInfo.name}}\n' +
    '    </ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button button-icon icon ion-person" ng-click="goOthersInfo()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="rj-stable-content" delegate-handle="groupDetailsScroll">\n' +
    '        <ion-refresher pulling-text="..." on-refresh="doRefresh()" pulling-icon=""></ion-refresher>\n' +
    '        <div ng-repeat="item in messageArray track by $index">\n' +
    '            <div ng-if="item.contentType == \'image\' || item.contentType == \'text\'">\n' +
    '                <p class="rj-message-time">{{item.createTimeInMillis | date:\'yyyy-MM-dd HH:mm:ss\'}}</p>\n' +
    '                <div ng-if="item.direct == \'receive\'" class="rj-message-wrap">\n' +
    '                    <div ng-if="item.fromUser.nickname == \'\' " class="rj-head-pic">{{item.fromUser.userName.substring(item.fromUser.userName.length-2)}}</div>\n' +
    '                    <div ng-if="item.fromUser.nickname != \'\' " class="rj-head-pic">{{item.fromUser.nickname.substring(item.fromUser.nickname.length-2)}}</div>\n' +
    '                    <span class="rj-triangle-left"></span>\n' +
    '                    <span ng-if="item.fromUser.nickname == \'\' " class="name_left" ng-bind="item.fromUser.userName"></span>\n' +
    '                    <span ng-if="item.fromUser.nickname != \'\' " class="name_left" ng-bind="item.fromUser.nickname"></span>\n' +
    '                    <p ng-if="item.contentType == \'text\'" class="rj-message" ng-bind="item.content.text"></p>\n' +
    '                    <img ng-if="item.contentType == \'image\'" src="{{item.content.localThumbnailPath}}" class="rj-message"></p>\n' +
    '                </div>\n' +
    '                <div ng-if="item.direct == \'send\'" class="rj-message-wrap">\n' +
    '                    <div ng-if="item.fromName == \'\' " class="rj-head-pic-right">{{item.fromID.substring(item.fromID.length-2)}}</div>\n' +
    '                    <div ng-if="item.fromName != \'\' " class="rj-head-pic-right">{{item.fromName.substring(item.fromName.length-2)}}</div>\n' +
    '                    <span class="rj-triangle-right"></span>\n' +
    '                    <span ng-if="item.fromName != \'\'" class="name_right" ng-bind="item.fromName"></span>\n' +
    '                    <span ng-if="item.fromName == \'\'" class="name_right" ng-bind="item.fromID"></span>\n' +
    '                    <p ng-if="item.contentType == \'text\'" class="rj-message-right" ng-bind="item.content.text"></p>\n' +
    '                    <img ng-if="item.contentType == \'image\'" src="{{item.content.localThumbnailPath}}" class="rj-message-right"></p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '    <ion-footer-bar align-title="left" class="bar-light" resize-foot-bar>\n' +
    '        <div class="rj-footer-btn-wrap">\n' +
    '            <button ng-click="addAttachment()" class="button button-icon icon ion-camera rj-footer-btn-left">\n' +
    '            </button>\n' +
    '        </div>\n' +
    '        <label class="item item-input rj-footer-input">\n' +
    '            <textarea msd-elastic ng-model="send_content"></textarea>\n' +
    '        </label>\n' +
    '        <div class="rj-footer-btn-wrap">\n' +
    '            <button ng-disabled="!send_content || send_content === \'\'" class="rj-send-button" ng-click="sendContent(send_content)">发送</button>\n' +
    '        </div>\n' +
    '    </ion-footer-bar>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/companyAddressBook/employeeAddress/employeeAddress.tpl.html',
    '<ion-view class="employeeAddressCSS" >\n' +
    ' <ion-nav-title>{{title}}</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="itm">\n' +
    '      <div class=" searchVal">\n' +
    '	  <label class="item item-input">\n' +
    '	    <i class="icon ion-search placeholder-icon"></i>\n' +
    '	    <input type="text" ng-model="search.$" placeholder="搜索">\n' +
    '	  </label>\n' +
    '    </div>\n' +
    '    	<div class="list" ng-repeat="item in items | filter:search" >\n' +
    '        <a class="item" href="#" ng-click="addressDetail(item)">\n' +
    '           <span class="headImg">\n' +
    '             <!-- <img  src="{{item.pictureId}}}"> -->\n' +
    '            \n' +
    '           </span>\n' +
    '           <span class="nameMsg"> {{item.INTERNAL_DISPLAY_NAME}}</span>\n' +
    '          <span class="bagImg"></span>\n' +
    '        </a>\n' +
    '      </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/groupInfo/addGroupMember.tpl.html',
    '<div class="inputPopCSS list">\n' +
    '    <form name="addMemberNameForm">\n' +
    '        <label class="item item-input item-stacked-label">\n' +
    '            <span class="input-label">用户名</span>\n' +
    '            <input type="text" ng-model="memberName" placeholder="请输入对方用户名" required>\n' +
    '        </label>\n' +
    '        <button class="button button-block button-positive" ng-click="addGroupMember(memberName)" ng-disabled="!addMemberNameForm.$valid || addMemberNameForm.$submitted">\n' +
    '            添加\n' +
    '        </button>\n' +
    '    </form>\n' +
    '    <div class="close" ng-click="closePop()">\n' +
    '        <p class="closeImg"></p>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/groupInfo/groupInfo.tpl.html',
    '<ion-view class="userConfigCSS">\n' +
    '    <ion-nav-title>{{groupInfo.groupName}}资料</ion-nav-title>\n' +
    '    <ion-content class="userConfigContent" has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="userItemContent">\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">组名</div>\n' +
    '                <div class="rgt" ng-if="groupInfo.groupName != \'\' ">{{groupInfo.groupName?groupInfo.groupName:groupInfo.name}}</div>\n' +
    '                <div class="rgt" ng-if="groupInfo.groupName == \'\' ">无</div>\n' +
    '            </div>\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">描述</div>\n' +
    '                <div class="rgt" ng-if="groupInfo.groupDescription != \'\' ">{{groupInfo.groupDescription?groupInfo.groupDescription:groupInfo.desc}}</div>\n' +
    '                <div class="rgt" ng-if="groupInfo.groupDescription == \'\' ">无</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <button class="button button-block button-positive" ng-click="showMembers()">\n' +
    '                群组成员\n' +
    '            </button>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <button class="button button-block button-positive" ng-click="showGroupMember()">\n' +
    '                添加成员\n' +
    '            </button>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/groupInfo/showMembers.tpl.html',
    '<ion-list class="inputPopCSS list">\n' +
    '    <ion-item class="item" ng-repeat="member in members track by $index" ng-click="goMessageDetails(member)">\n' +
    '        <span ng-if="member.nickname != \'\' ">{{member.nickname}}</span>\n' +
    '        <span ng-if="member.nickname == \'\' ">{{member.userName}}</span>\n' +
    '        <ion-option-button class="button-positive" ng-click="deleteMember($index,member.userName)">删除</ion-option-button>\n' +
    '    </ion-item>\n' +
    '    <div class="close" ng-click="closePop()">\n' +
    '        <p class="closeImg"></p>\n' +
    '    </div>\n' +
    '</ion-list>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/messageDetail/messageDetail.tpl.html',
    '<ion-view class="messageDetailCSS">\n' +
    '    <ion-nav-title>\n' +
    '        {{userInfo.nickname?userInfo.nickname:userInfo.userName?userInfo.userName:userInfo.nickname}}\n' +
    '    </ion-nav-title>\n' +
    '    <ion-nav-buttons side="right">\n' +
    '        <button class="button button-icon icon ion-person" ng-click="goOthersInfo()">\n' +
    '        </button>\n' +
    '    </ion-nav-buttons>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false" class="rj-stable-content" delegate-handle="messageDetailsScroll">\n' +
    '        <ion-refresher pulling-text="..." on-refresh="doRefresh()" pulling-icon=""></ion-refresher>\n' +
    '        <!-- Android -->\n' +
    '        <div ng-repeat="item in messageArray track by $index" ng-if="DeviceType == \'Android\'">\n' +
    '            <div ng-if="item.contentType == \'image\' || item.contentType == \'text\'">\n' +
    '                <p class="rj-message-time">{{item.createTimeInMillis | date:\'yyyy-MM-dd HH:mm:ss\'}}</p>\n' +
    '                <div ng-if="item.direct == \'receive\' " class="rj-message-wrap">\n' +
    '                    <div ng-if="item.fromUser.nickname == \'\' " class="rj-head-pic">{{item.fromUser.userName.substring(item.fromUser.userName.length-2)}}</div>\n' +
    '                    <div ng-if="item.fromUser.nickname != \'\' " class="rj-head-pic">{{item.fromUser.nickname.substring(item.fromUser.nickname.length-2)}}</div>\n' +
    '                    <span class="rj-triangle-left"></span>\n' +
    '                    <p ng-if="item.contentType == \'text\'" class="rj-message" ng-bind="item.content.text"></p>\n' +
    '                    <img ng-if="item.contentType == \'image\'" src="{{item.content.localThumbnailPath}}" class="rj-message">\n' +
    '                </div>\n' +
    '                <div ng-if="item.direct == \'send\' " class="rj-message-wrap">\n' +
    '                    <div ng-if="item.fromName == \'\' " class="rj-head-pic-right">{{item.fromID.substring(item.fromID.length-2)}}</div>\n' +
    '                    <div ng-if="item.fromName != \'\' " class="rj-head-pic-right">{{item.fromName.substring(item.fromName.length-2)}}</div>\n' +
    '                    <span class="rj-triangle-right"></span>\n' +
    '                    <p ng-if="item.contentType == \'text\'" class="rj-message-right" ng-bind="item.content.text"></p>\n' +
    '                    <img ng-if="item.contentType == \'image\'" src="{{item.content.localThumbnailPath}}" class="rj-message-right">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <!-- iOS -->\n' +
    '        <div ng-repeat="item in messageArray track by $index" ng-if="DeviceType != \'Android\'">\n' +
    '            <div ng-if="item.msg_type == \'image\' || item.msg_type == \'text\'">\n' +
    '                <p class="rj-message-time">{{item.create_time | date:\'yyyy-MM-dd HH:mm:ss\'}}</p>\n' +
    '                <div ng-if="item.set_from_name == \'1\' " class="rj-message-wrap">\n' +
    '                    <div ng-if="item.from_name == \'\' " class="rj-head-pic">{{item.from_id.substring(item.from_id.length-2)}}</div>\n' +
    '                    <div ng-if="item.from_name != \'\' " class="rj-head-pic">{{item.from_name.substring(item.from_name.length-2)}}</div>\n' +
    '                    <span class="rj-triangle-left"></span>\n' +
    '                    <p ng-if="item.msg_type == \'text\'" class="rj-message" ng-bind="item.msg_body.text"></p>\n' +
    '                    <img ng-if="item.msg_type == \'image\'" src="{{item.resourcePath}}" class="rj-message">\n' +
    '                </div>\n' +
    '                <div ng-if="item.set_from_name == \'0\' " class="rj-message-wrap">\n' +
    '                    <div ng-if="item.from_name == \'\' " class="rj-head-pic-right">{{item.from_id.substring(item.from_id.length-2)}}</div>\n' +
    '                    <div ng-if="item.from_name != \'\' " class="rj-head-pic-right">{{item.from_name.substring(item.from_name.length-2)}}</div>\n' +
    '                    <span class="rj-triangle-right"></span>\n' +
    '                    <p ng-if="item.msg_type == \'text\'" class="rj-message-right" ng-bind="item.msg_body.text"></p>\n' +
    '                    <img ng-if="item.msg_type == \'image\'" src="{{item.resourcePath}}" class="rj-message-right">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '    <ion-footer-bar align-title="left" class="bar-light" resize-foot-bar>\n' +
    '        <div class="rj-footer-btn-wrap">\n' +
    '            <button ng-click="addAttachment()" class="button button-icon icon ion-camera rj-footer-btn-left">\n' +
    '            </button>\n' +
    '        </div>\n' +
    '        <label class="item item-input rj-footer-input">\n' +
    '            <textarea msd-elastic ng-model="send_content"></textarea>\n' +
    '        </label>\n' +
    '        <div class="rj-footer-btn-wrap">\n' +
    '            <button ng-disabled="!send_content || send_content === \'\'" ng-click="sendContent(send_content)" class="rj-send-button">发送</button>\n' +
    '        </div>\n' +
    '    </ion-footer-bar>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/myInfo/addFriend.tpl.html',
    '<div class="inputPopCSS list">\n' +
    '    <form name="addFriendsFormForm">\n' +
    '        <label class="item item-input item-stacked-label">\n' +
    '            <span class="input-label">对方帐号</span>\n' +
    '            <input type="text" ng-model="friendsName" placeholder="对方用户名" required>\n' +
    '        </label>\n' +
    '        <label class="item item-input item-stacked-label">\n' +
    '            <span class="input-label">申请描述</span>\n' +
    '            <input type="text" ng-model="applyDesc" placeholder="申请描述">\n' +
    '        </label>\n' +
    '        <span class="remarks">注：可以直接添加对方为好友，也可以在通讯录发起临时会话</span>\n' +
    '        <div class="buttonStyle">\n' +
    '            <button class="button button-block button-positive addressBook" ng-click="goAddressBook()">\n' +
    '                去通讯录\n' +
    '            </button>\n' +
    '            <button class="button button-block button-positive add " ng-click="addFriends(friendsName,applyDesc)" ng-disabled="!addFriendsFormForm.$valid || addFriendsFormForm.$submitted">\n' +
    '                添加\n' +
    '            </button>\n' +
    '        </div>\n' +
    '    </form>\n' +
    '    <div class="close" ng-click="closePop()">\n' +
    '        <p class="closeImg"></p>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/myInfo/inputCreatGroup.tpl.html',
    '<div class="inputPopCSS list">\n' +
    '    <form name="createGroupForm">\n' +
    '        <label class="item item-input item-stacked-label">\n' +
    '            <span class="input-label">群组名</span>\n' +
    '            <input type="text" ng-model="groupName" placeholder="请输入群组名" required>\n' +
    '        </label>\n' +
    '        <label class="item item-input item-stacked-label">\n' +
    '            <span class="input-label">群组描述</span>\n' +
    '            <input type="text" ng-model="groupDesc" placeholder="请输入群组描述">\n' +
    '        </label>\n' +
    '        <button class="button button-block button-positive" ng-click="createGroup(groupName,groupDesc)" ng-disabled="!createGroupForm.$valid || createGroupForm.$submitted">\n' +
    '            创建\n' +
    '        </button>\n' +
    '    </form>\n' +
    '    <div class="close" ng-click="closePop()">\n' +
    '        <p class="closeImg"></p>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/myInfo/myInfo.tpl.html',
    '<ion-view class="userConfigCSS">\n' +
    '    <ion-nav-title>我的资料</ion-nav-title>\n' +
    '    <ion-content class="userConfigContent" has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="userItemContent">\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">真实姓名</div>\n' +
    '                <div class="rgt" ng-if="myInfo.userName != \'\' ">{{myInfo.userName?myInfo.userName:myInfo.username}}</div>\n' +
    '                <div class="rgt" ng-if="myInfo.userName == \'\' ">无</div>\n' +
    '            </div>\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">昵称</div>\n' +
    '                <div class="rgt" ng-if="myInfo.nickname != \'\' ">{{myInfo.nickname}}</div>\n' +
    '                <div class="rgt" ng-if="myInfo.nickname == \'\' ">无</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '            <button class="button button-block button-positive" ng-click="showAddFriends()">\n' +
    '                添加好友\n' +
    '            </button>\n' +
    '        </div>\n' +
    '        <div ng-if="DeviceType == \'Android\'">\n' +
    '            <button class="button button-block button-positive" ng-click="showCreateGroupPop()">\n' +
    '                创建群组\n' +
    '            </button>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/message/othersInfo/othersInfo.tpl.html',
    '<ion-view class="userConfigCSS">\n' +
    '    <ion-nav-title>\n' +
    '        <p ng-if="userInfo.nickname == \'\' ">{{userInfo.userName}}资料</p>\n' +
    '        <p ng-if="userInfo.nickname != \'\' ">{{userInfo.nickname}}资料</p>\n' +
    '    </ion-nav-title>\n' +
    '    <ion-content class="userConfigContent" has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="userItemContent">\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">真实姓名</div>\n' +
    '                <div class="rgt" ng-if="userInfo.userName != \'\' ">{{userInfo.userName?userInfo.userName:userInfo.username}}</div>\n' +
    '                <div class="rgt" ng-if="userInfo.userName == \'\' ">无</div>\n' +
    '            </div>\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">昵称</div>\n' +
    '                <div class="rgt" ng-if="userInfo.nickname != \'\' ">{{userInfo.nickname}}</div>\n' +
    '                <div class="rgt" ng-if="userInfo.nickname == \'\' ">无</div>\n' +
    '            </div>\n' +
    '            <div class="items clearfix">\n' +
    '                <div class="lft">与我关系</div>\n' +
    '                <div class="rgt" ng-if="userInfo.isFriend == \'0\' ">不是好友</div>\n' +
    '                <div class="rgt" ng-if="userInfo.isFriend == \'1\' ">好友</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/mine/APPfeedback/APPfeedback.tpl.html',
    '<ion-view class="APPfeedbackCSS">\n' +
    '    <ion-nav-title>APP反馈</ion-nav-title>\n' +
    '    <ion-content class="appFeedbackContent" has-bouncing="false" scrollbar-y="false">\n' +
    '        <form name="appFeedback">\n' +
    '            <div class="feedbackTitle">意见或建议</div>\n' +
    '            <textarea class="feedbackContent" cols="30" rows="10" ng-model="opinion" placeholder="请输入您对APP的意见或建议(限200字)" maxlength="200" required></textarea>\n' +
    '            <div class="feedbackTitle">联系电话</div>\n' +
    '            <input type="tel" maxlength="11" class="phoneNumber" ng-model="phone" placeholder="请输入您的联系方式，便于我们与您联系" required/>\n' +
    '            <div class="button appSbmtBtn" type="submit" ng-click="appFeedback2(opinion,phone)" ng-disabled="!appFeedback.$valid || appFeedback.$submitted">完成</div>\n' +
    '        </form>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/mine/ListOfBluetooth/ListOfBluetooth.tpl.html',
    '<ion-view class="ListOfBluetoothCSS">\n' +
    '	<ion-nav-title>蓝牙列表</ion-nav-title>\n' +
    '	<ion-content class="ListOfBluetoothController" has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="operation">\n' +
    '            <div class="button" ng-click="bluetooth();" ng-bind-html="bottonText"></div>\n' +
    '        </div>\n' +
    '        <div class="list">\n' +
    '            <div class="card" ng-repeat="item in known">\n' +
    '                <div>{{item.ADDRESS}}</div>\n' +
    '                <div>({{item.device.id}}) - ({{item.device.distance}}米)</div>\n' +
    '            </div>\n' +
    '            <div class="card" ng-repeat="item in unknown" ng-click="toEdit({device: item});">\n' +
    '                <div>{{item.id}}</div>\n' +
    '                <div>({{item.distance}}米)</div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '	</ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/mine/netWork/netWork.tpl.html',
    '<ion-view class="">\n' +
    '    <ion-nav-title>内外网设置</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <ion-list>\n' +
    '            <ion-radio ng-model="choice" ng-value="\'A\'" ng-click="seleteNet(choice)">内网</ion-radio>\n' +
    '            <ion-radio ng-model="choice" ng-value="\'B\'" ng-click="seleteNet(choice)">外网</ion-radio>\n' +
    '        </ion-list>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('Agents/AgentsList/agentsView/Flow/flowDetail.tpl.html',
    '<ion-view  class="flowCss">\n' +
    '    <ion-nav-title>流程详情</ion-nav-title>\n' +
    '    <ion-content class="padding">\n' +
    '      <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()"></ion-refresher>\n' +
    '         <div class="everyFlow" ng-repeat="item in items">\n' +
    '            <div class="allFlowCss">\n' +
    '               <div>已审批人：<span class="flowCont">{{item.APP_SIGN==""?"无":item.APP_SIGN}}</span></div>\n' +
    '               <div>审批时间：<span class="flowCont">{{item.APP_DATE | date : "MM月dd日HH时mm分"}}</span></div>\n' +
    '             </div>\n' +
    '               <div class="personsCss">可审批人：<span class="flowCont">{{item.PERSON_ID}}</span></div>\n' +
    '              <div class="allFlowCss">\n' +
    '               <div>审批状态：<span class="flowCont">{{item.APPROVAL_STATUS}}</span></div>\n' +
    '                <div>审批顺序：<span class="flowCont flowNum">{{item.STEP_NO}}</span></div>\n' +
    '             </div>\n' +
    '              <div class="approvalCss">审批意见：<div class="flowCont">{{item.APP_INFO=="null"?"无":item.APP_INFO}}</div ></div>\n' +
    '         </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('Agents/AgentsList/operatingHistory/historyDetails/historyDetail.tpl.html',
    '<ion-view  class="agentsView">\n' +
    '    <ion-nav-title>已审批详情</ion-nav-title>\n' +
    '    <ion-content class="padding">\n' +
    '      <ion-refresher pulling-text="下拉刷新" on-refresh="doRefresh()"></ion-refresher>\n' +
    '          <div class="beizhu">\n' +
    '            <div class="riseCss">标题:</div>\n' +
    '            <div class="explainCss">{{item.TITLE}}</div>\n' +
    '           </div>\n' +
    '           <div class="allCss lastDate">\n' +
    '            <div class=myCss >流程最终处理时间:</div>\n' +
    '            <div  class=myCss>{{item.CREATED_DATE | date : "MM月dd日HH时mm分"}}</div>\n' +
    '           </div>\n' +
    '           <div class="allCss" ng-if="item.FORM_INFO==\'\'?false:true">\n' +
    '              <div class="riseCss"  >附加信息:</div>\n' +
    '              <div class="addInformation explainCss">\n' +
    '                <div class="addMessage" ng-repeat="MSG in item.FORM_INFO">\n' +
    '                  <div class="fromIn">\n' +
    '                        <!-- <div>{{key+\'\':\'\'}}</div> -->\n' +
    '                        <div>{{MSG}}</div>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '           </div>\n' +
    '           <div class="accessoryCss" ng-show="disFile" ng-click="accessoryCont()">附件</div>\n' +
    '           <div ng-show="displayFile" class="explainCss" ng-repeat="i in item.ATTACHMENT">\n' +
    '             <a  ng-click="openUrl(i.URL)">{{i.TITLE}}</a>\n' +
    '           </div>\n' +
    '           <!-- <div class="lineCss"></div> -->\n' +
    '           <div  class="beizhu">\n' +
    '              <div class="riseCss">备注:</div>\n' +
    '              <div class="explainCss">{{item.ITEM_MESSAGE}}</div>\n' +
    '           </div>\n' +
    '           <div class="allCssDate">\n' +
    '             <div class=myCss>\n' +
    '              <div class="riseCss">提交人姓名:</div>\n' +
    '              <div class="explainCss">{{item.SUBMIT_PERSON_NAME==""?item.SUBMIT_PERSON:item.SUBMIT_PERSON_NAME}}</div>\n' +
    '           </div>\n' +
    '           <div class=myCss>\n' +
    '              <div class="riseCss">完成这条代码的人：</div>\n' +
    '              <div class="explainCss">{{item.COMPLETED_BY}}</div>\n' +
    '           </div>\n' +
    '           </div>\n' +
    '           \n' +
    '            <div class="allCssDate">\n' +
    '             <div class=myCss>\n' +
    '              <div class="riseCss">当前审批人姓名:</div>\n' +
    '              <div class="explainCss">{{item.PERSON_NAME==""?item.IDENTITY:item.PERSON_NAME}}</div>\n' +
    '            </div>\n' +
    '             <div class=myCss>\n' +
    '              <div class="riseCss">完成人名字：</div>\n' +
    '              <div class="explainCss">{{item.COMPLETE_NAME}}</div>\n' +
    '            </div>\n' +
    '            </div>\n' +
    '          \n' +
    '\n' +
    '            <div  class="allCssDate">\n' +
    '            <div class=myCss>\n' +
    '              <div class="riseCss">流程发起时间:</div>\n' +
    '              <div class="explainCss">{{item.SUBMIT_DATE | date : "MM月dd日HH时mm分"}}</div>\n' +
    '            </div>\n' +
    '            <div class=myCss>\n' +
    '               <div class="riseCss">完成时间:</div>\n' +
    '              <div class="explainCss">{{item.COMPLETED_DATE | date : "MM月dd日HH时mm分"}}</div>\n' +
    '            </div>\n' +
    '            </div>\n' +
    '             <div class="accessoryCss" ng-show="disFile" ng-click="accessoryCont()">附件</div>\n' +
    '           <div ng-show="displayFile" class="explainCss" ng-repeat="i in item.ATTACHMENT">\n' +
    '             <a  ng-click="openUrl(i.URL)">{{i.TITLE}}</a>\n' +
    '           </div>\n' +
    '            \n' +
    '            <div class="allCss">\n' +
    '              <div class="riseCss">对应表单现在状态:</div>\n' +
    '              <div class="explainCss">{{item.APPROVAL_STATE}}</div>\n' +
    '            </div>\n' +
    '           <div class="allCss">\n' +
    '              <div class="riseCss">审批意见：</div>\n' +
    '              <div class="explainCss">{{item.APP_INFO}}</div>\n' +
    '            </div>\n' +
    '           \n' +
    '           \n' +
    '    </ion-content>\n' +
    '</ion-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/companyAddressBook/employeeAddress/addressDetail/addFriendaddressDetail.tpl.html',
    '<div class="inputPopCSS list">\n' +
    '    <form name="addFriendsFormForm">\n' +
    '        <label class="item item-input item-stacked-label">\n' +
    '            <span class="input-label">对方帐号</span>\n' +
    '            <input type="text" ng-model="friendsName1" placeholder="对方用户名" required>\n' +
    '        </label>\n' +
    '        <label class="item item-input item-stacked-label">\n' +
    '            <span class="input-label">申请描述</span>\n' +
    '            <input type="text" ng-model="applyDesc1" placeholder="申请描述">\n' +
    '        </label>\n' +
    '        <div class="buttonStyle">\n' +
    '            <button class="button button-block button-positive add " style="width: 45%;" ng-click="addFriends1(friendsName1,applyDesc1)" ng-disabled="!addFriendsFormForm.$valid || addFriendsFormForm.$submitted">\n' +
    '                添加\n' +
    '            </button>\n' +
    '            <button ng-click="closePop1()" class="button button-block" style="background-color: #c00;width: 45%;margin-left: 10%;color: white;">\n' +
    '                取消\n' +
    '            </button>\n' +
    '        </div>\n' +
    '    </form>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/companyAddressBook/employeeAddress/addressDetail/addressDetail.tpl.html',
    '<ion-view class="addressDetailCSS">\n' +
    '    <ion-nav-title>{{user.INTERNAL_DISPLAY_NAME}}</ion-nav-title>\n' +
    '    <ion-content has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="iranImg" >\n' +
    '            <!-- <img class="headImg" src="{{user.pictureId}}}" > -->\n' +
    '            <span class="headImg" ng-click="showAddFriends1()"></span>\n' +
    '            <span class="chatImg" ng-click="goMessageDetail()"></span>\n' +
    '        </div>\n' +
    '        <ul class="phoneMes">\n' +
    '            <li>\n' +
    '                <a href="tel:{{user.MOBILE}}">{{user.MOBILE==\'null\'?\'  \':user.MOBILE}}\n' +
    '                  <a  class="phoneImg" href="tel:{{user.MOBILE}}"></a>\n' +
    '                <a class="smsImg" href="sms:{{user.MOBILE}}"></a>\n' +
    '                </a>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '        <div class="phonePar">\n' +
    '            <div class="phoneOp">\n' +
    '                <div class="phoneStyle">email:</div>\n' +
    '                <div class="phoneAlo">\n' +
    '                    <a href="mailto:{{user.EMAIL}}">\n' +
    '                            {{user.EMAIL==\'null\'?\' \':user.EMAIL}}\n' +
    '                        </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="phoneOp">\n' +
    '                <div class="phoneStyle">状态:</div>\n' +
    '                <div class="phoneAlo">{{user.EMPLOYEE_STATUS}}</div>\n' +
    '            </div>\n' +
    '            <div class="phoneOp">\n' +
    '                <div class="phoneStyle">职位:</div>\n' +
    '                <div class="phoneAlo">{{user.POSITION_TITLE}}</div>\n' +
    '            </div>\n' +
    '            <div class="phoneOp">\n' +
    '                <div class="phoneStyle">部门:</div>\n' +
    '                <div class="phoneAlo">{{user.ORG_NAME}}\n' +
    '                </div>\n' +
    '            </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('BaiYin.templates');
} catch (e) {
  module = angular.module('BaiYin.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tabs/mine/ListOfBluetooth/editBluetooth/editBluetooth.tpl.html',
    '<ion-view class="EditBluetoothCSS">\n' +
    '	<ion-nav-title>录入蓝牙信息</ion-nav-title>\n' +
    '	<ion-content class="EditBluetoothController" has-bouncing="false" scrollbar-y="false">\n' +
    '        <div class="card">\n' +
    '            <textarea ng-model="device.bluetooth_desc" rows="5" placeholder="请输入蓝牙描述..."></textarea>\n' +
    '        </div>\n' +
    '        <div class="card">\n' +
    '            <textarea ng-model="device.address" rows="5" placeholder="请输入蓝牙地址..."></textarea>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '    <ion-footer-bar>\n' +
    '        <span ng-click="save();">保存</span>\n' +
    '        <span ng-click="back();">取消</span>\n' +
    '    </ion-footer-bar>\n' +
    '</ion-view>');
}]);
})();

//# sourceMappingURL=../maps/BaiYin.templates.js.map
